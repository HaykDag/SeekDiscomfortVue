<template>
  <div class="header-actions-cnt">
    <div class="user-menu-wrapper">
      <ul class="user-menu-items">
        <li>
          <a href="#">Reward Points</a>
        </li>
        <li>
          <a href="#">Wish List</a>
        </li>
        <li v-if="authStore.user?.isAdmin">
          <router-link :to="{ name: 'dashboard' }"> Dashboard </router-link>
        </li>
        <li v-if="!authStore.user">
          <router-link :to="{ name: 'sign' }"> Sign Up </router-link>
        </li>
        <li v-if="!authStore.user">
          <router-link :to="{ name: 'login' }"> Sign In </router-link>
        </li>
        <li v-if="authStore.user">
          <a-dropdown>
            <span style="cursor: pointer; padding: 6px">
              <UserOutlined />
              {{ authStore.user.username }}
              <DownOutlined style="font-size: 12px"
            /></span>
            <template #overlay>
              <div class="user-dropped-menu" style="background-color: white">
                <router-link to="./account" class="user-dropped-menu-account">
                  Account
                </router-link>
                <span
                  class="user-dropped-menu-signOut"
                  @click="authStore.logout"
                  >Sign Out</span
                >
              </div>
            </template>
          </a-dropdown>
        </li>
      </ul>
    </div>
    <div class="search-cart-cnt">
      <ShoppingCart />
      <div class="search-cnt">
        <a-input-search
          class="header-search"
          placeholder="Search entire store here..."
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { DownOutlined, UserOutlined } from "@ant-design/icons-vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import { useItemStore } from "@/store/ItemStore";
import { useAuthStore } from "@/store/AuthStore";
import { ref } from "vue";

const itemStore = useItemStore();
const authStore = useAuthStore();
</script>

<style>
.header-actions-cnt {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-cart-cnt {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 15px;
}

.search-cnt {
  height: 40px;
}
.header-search {
  width: 250px;
  font-size: 14px;
}
.user-menu-wrapper {
  gap: 25px;
  width: 100%;
}
.user-menu-items {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-menu-items li a {
  text-decoration: none;
  color: black;
  list-style: none;
  font-size: 15px;
  padding: 6px;
}
.user-menu-items li a:hover,
.user-menu-items li span:hover {
  color: white;
  background-color: rgba(0, 0, 0, 0.752);
  transition: 0.4s;
}
.user-dropped-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.user-dropped-menu-account {
  padding: 6px;
  color: black;
}
.user-dropped-menu-account:hover {
  color: white;
  background-color: #f4c300;
}
.user-dropped-menu-signOut {
  cursor: pointer;
  padding: 6px;
  color: red;
}
.user-dropped-menu-signOut:hover {
  background-color: red;
  color: rgb(255, 255, 255);
}
@media screen and (max-width: 1230px) {
  .header-actions-cnt {
    flex-direction: column-reverse;
  }
}
@media screen and (max-width: 840px) {
  .header-actions-cnt {
    display: none;
  }
}
</style>
