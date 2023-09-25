<template>
  <div class="header-wrapper">
    <div class="header-cnt">
      <ContactInfo class="contactInfo" />
      <div class="header-middle-cnt">
        <div class="header-logo-cnt">
          <router-link to="/">
            <img class="logo-img" :src="logo" />
          </router-link>
        </div>
        <Actions />
      </div>
      <MainMenu @toggle-menu="isMenuOpen = !isMenuOpen" />
    </div>
  </div>
  <DropDownMenu v-if="isMenuOpen" @toggle-menu="isMenuOpen = !isMenuOpen" />
</template>

<script setup>
import MainMenu from "./components/mainMenu/MainMenu.vue";
import logo from "@/assets/logo.png";
import ContactInfo from "./components/ContactInfo.vue";
import Actions from "./components/actions/Actions.vue";
import DropDownMenu from "./components/DropDownMenu.vue";

import { useItemStore } from "@/store/ItemStore";
import { useAuthStore } from "@/store/AuthStore";
import { ref } from "vue";

const itemStore = useItemStore();
const authStore = useAuthStore();

const isMenuOpen = ref(false);
</script>

<style>
.header-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
}
.header-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 90%;
}
.header-middle-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.header-middle-cnt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 40%;
}
.logo-img {
  height: 120px;
  width: auto;
}
.visible {
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 1456px) {
  .header-cnt {
    width: 80%;
  }
}
@media screen and (max-width: 1230px) {
  .header-cnt {
    gap: 5px;
  }
  .header-middle-cnt {
    flex: 50%;
  }
}
@media screen and (max-width: 840px) {
  .header-wrapper {
    height: 160px;
  }
  .contactInfo {
    display: none;
  }
  .header-middle-cnt {
    justify-content: center;
  }
}
</style>
