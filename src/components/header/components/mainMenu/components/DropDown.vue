<template>
  <a-dropdown>
    <div class="link-wrapper">
      <router-link to="/">
        <div class="down-arrow-cnt">
          <span class="dropdown-title">{{ props.title }}</span>
          <DownOutlined style="font-size: 10px" />
        </div>
      </router-link>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <div class="dropped-menu-item">
            <div
              style="width: 500px; height: 100px; background-color: aliceblue"
            ></div>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import { DownOutlined } from "@ant-design/icons-vue";

const props = defineProps(["title"]);
</script>

<style>
.link-wrapper a {
  color: black;
  text-decoration: none;
  list-style: none;
}
.dropped-menu-item {
  max-width: fit-content;
}
.down-arrow-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
  padding: 8px 2px;
}
.down-arrow-cnt:hover {
  background-color: #f4c300;
  color: white;
}
.dropdown-title {
  font-size: 16px;
}
@media screen and (max-width: 1255px) {
  .dropdown-title {
    font-size: 14px;
  }
}
@media screen and (max-width: 1136px) {
  .dropdown-title {
    font-size: 12px;
  }
}
@media screen and (max-width: 1010px) {
  .dropdown-title {
    font-size: 10px;
  }
}
</style>
