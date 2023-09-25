<template>
  <div @click="$emit('toggleMenu')" class="droped-menu-cnt">
    <ul class="droped-menu-list">
      <li v-for="item in MENU_ITEMS" class="droped-list-item">
        <router-link
          :to="`/category/${item}`"
          style="color: inherit; text-decoration: none"
        >
          {{ item }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const MENU_ITEMS = [
  "NEW ARRIVALS",
  "SOFAS",
  "MATRASSES",
  "ACCESSORIES",
  "FURNITURE",
  "HOMEAPPLIANCE",
  "CLEARANCE",
];
</script>

<style>
.droped-menu-cnt {
  display: flex;
  margin: 5px auto;
  width: 80%;
  justify-content: start;
  background-color: #f5f5f5;
  margin-top: -1px;
}
.droped-menu-list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  margin-left: 10px;
  gap: 15px;
  list-style: none;
  justify-content: start;
  align-items: start;
}
.droped-list-item {
  padding: 15px;
  cursor: pointer;
  color: black;
  user-select: none;
  border-radius: 2px;
}
.droped-list-item:hover {
  background-color: #f4c300;
  color: white;
  transition: 0.4s;
}
@media screen and (min-width: 991px) {
  .droped-menu-cnt {
    display: none;
  }
}
</style>
