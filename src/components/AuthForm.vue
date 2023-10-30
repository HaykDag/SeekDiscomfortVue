<template>
  <v-sheet width="300" class="mx-auto mt-15">
    <div class="authform-title">{{ page }}</div>
    <v-form
      @submit.prevent="handleSubmit"
      :disabled="authStore.isLoading"
      ref="form"
    >
      <v-text-field
        autofocus
        v-model.trim="username"
        label="Username"
      ></v-text-field>
      <v-text-field
        v-model.trim="password"
        label="password"
        type="password"
      ></v-text-field>
      <v-checkbox
        v-if="page === 'addAdmin'"
        v-model="newAdmin"
        label="Admin"
        type="checkbox"
      ></v-checkbox>
      <v-btn type="submit" block class="mt-2"
        ><span style="margin-right: 10px">Submit</span>
        <v-progress-circular
          indeterminate
          size="25"
          width="3"
          v-if="authStore.isLoading"
        ></v-progress-circular>
      </v-btn>
    </v-form>
    <div class="demo">
      <span>login: demo</span>
      <span>password: demo123</span>
    </div>
    <p v-if="authStore.error" style="color: red; margin-top: 15px">
      {{ authStore.error }}
    </p>
  </v-sheet>
</template>

<script setup>
import { useAuthStore } from "@/store/AuthStore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const page = route.name;
const router = useRouter();

const username = ref("");
const password = ref("");
const newAdmin = ref(false);
const form = ref(null);

const authStore = useAuthStore();

const handleSubmit = async () => {
  if (username.value.length < 3 || password.value.length < 3) {
    authStore.error =
      "Username and Password should be at least 3 characters long";
    return;
  }
  if (page === "login") {
    await authStore.loginUser({
      username: username.value,
      password: password.value,
    });
  } else if (page === "sign") {
    await authStore.signUser({
      username: username.value,
      password: password.value,
    });
  } else if (page === "addAdmin") {
    await authStore.signUser({
      username: username.value,
      password: password.value,
      admin: newAdmin.value,
    });
  }

  if (!authStore.error) {
    username.value = "";
    password.value = "";
    router.push({ name: "home" });
  }
};
</script>

<style>
.authform-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: capitalize;
  user-select: none;
}
.demo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;
  align-items: center;
}
</style>
