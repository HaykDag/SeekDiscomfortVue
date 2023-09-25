<template>
  <div class="header-bottom-cnt">
    <div class="main-menu-cnt-small">
      <div @click="$emit('toggleMenu')" class="main-menu-toggle">
        <MenuOutlined />
        <span>MENU</span>
      </div>
      <div class="main-menu-item-small">
        <SearchOutlined />
        <span>SEARCH</span>
      </div>
      <div class="main-menu-item-small">
        <UserOutlined />
        <span> ACCOUNT </span>
      </div>
      <div class="main-menu-item-small">
        <ShoppingCartOutlined />
        <span>CART</span>
      </div>
    </div>
    <nav class="main-menu">
      <ul class="main-menu-list">
        <li v-for="item in MENU_ITEMS" class="main-menu-list-item">
          <DropDown :title="item" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import {
  ShoppingCartOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import DropDown from "./components/DropDown.vue";

const MENU_ITEMS = [
  "NEW ARRIVALS",
  "SOFAS",
  "MATRASSES",
  "ACCESSORIES",
  "FURNITURE",
  "HOME APPLIANCE",
  "CLEARANCE",
];
</script>

<style>
.header-bottom-cnt {
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #f5f5f5;
  flex: 20%;
  width: 100%;
}
.main-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
}
.main-menu-cnt-small {
  display: none;
}
.main-menu-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 0;
  padding: 0;
}
.main-menu-toggle {
  cursor: pointer;
  user-select: none;
  gap: 2px;
  display: none;
}
.main-menu-item-small {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 2px;
  display: none;
}

.main-menu-list-item {
  text-decoration: none;
  list-style: none;
}

@media screen and (max-width: 1230px) {
  .header-bottom-cnt {
    flex: 25%;
  }
}
@media screen and (max-width: 990px) {
  .main-menu {
    display: none;
  }
  .main-menu-list {
    flex-direction: column;
  }
  .main-menu-cnt-small {
    display: flex;
    justify-content: start;
  }
  .main-menu-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    font-weight: bold;
    font-size: 16px;
  }
}
@media screen and (max-width: 835px) {
  .main-menu-cnt-small {
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
  }

  .main-menu-item-small,
  .main-menu-toggle {
    display: flex;
    font-weight: bold;
    font-size: 16px;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .main-menu-item-small:hover,
  .main-menu-toggle:hover {
    color: white;
    background-color: #f4c300;
  }
}
</style>
