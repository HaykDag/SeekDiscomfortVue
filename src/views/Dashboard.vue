<template>
  <div class="dashboard-cnt">
    <nav class="dashboard-nav">
      <router-link v-for="menuItem in navMenu" :to="{ name: menuItem.name }">
        <v-btn class="dashboard-menu-btn">
          <v-icon :icon="menuItem.icon" />
          <v-tooltip activator="parent" location="top">{{
            menuItem.tooltip
          }}</v-tooltip>
        </v-btn>
      </router-link>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";

const navMenu = [
  {
    name: "dashboard",
    icon: "mdi-monitor-dashboard",
    tooltip: "Dashboard",
  },
  {
    name: "items",
    icon: "mdi-store",
    tooltip: "Store",
  },
  {
    name: "users",
    icon: "mdi-account-group",
    tooltip: "Users",
  },
  {
    name: "addItem",
    icon: "mdi-note-plus",
    tooltip: "Add Item",
  },
  {
    name: "orders",
    icon: "mdi-store-clock",
    tooltip: "Orders",
  },
  {
    name: "tags",
    icon: "mdi-tag-outline",
    tooltip: "Categories",
  },
  {
    name: "addAdmin",
    icon: "mdi-account-plus",
    tooltip: "New Admin",
  },
  {
    name: "support",
    icon: "mdi-chat-outline",
    tooltip: "Support Chat",
  },
];

const route = useRoute();
const page = route.name;
</script>

<style>
.dashboard-cnt {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.dashboard-nav {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #d8d4d4;
  position: fixed;
  left: 0;
  top: 0px;
  min-width: 60px;
  gap: 5px;
  border-radius: 5px;
  padding-bottom: 10px;
}
.dashboard-menu-btn {
  font-size: 1rem;
  margin-top: 15px;
  background-color: #d8d4d4;
  color: teal;
}

@media screen and (max-width: 750px) {
  .dashboard-nav {
    gap: 0px;
    padding: 0;
  }
  .dashboard-menu-btn {
    margin: 0;
  }
}
</style>
