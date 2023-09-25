<template>
  <MyHeader />
  <RouterView />
  <Chat v-if="$route.name === 'home' || $route.name === 'itemDetails'" />
</template>

<script setup>
import { RouterView } from "vue-router";
import MyHeader from "./components/header/MyHeader.vue";
import { pageSize } from "./plugins/AppData";
import { onMounted } from "vue";
import { useItemStore } from "@/store/ItemStore";
import { useAuthStore } from "@/store/AuthStore";
import { useTagStore } from "@/store/TagStore";

import Chat from "./components/Chat.vue";

const itemStore = useItemStore();
const authStore = useAuthStore();
const tagStore = useTagStore();

onMounted(() => {
  itemStore.fetchItems({ value: "", page: 1, pageSize, searchTag: "" });
  authStore.verifyUser();
  tagStore.fetchTags();
});
</script>

<style>
body {
  margin: 0;
  box-sizing: border-box;
}
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
