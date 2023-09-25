<template>
  <div class="myBody-cnt">
    <a-row :gutter="{ xs: 4, sm: 8, md: 16, lg: 24 }">
      <a-col
        class="gutter-row"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="6"
        v-for="item in itemStore.items"
        :key="item.id"
      >
        <div class="gutter-box">
          <MyCard style="margin-top: 25px; width: 100%" :item="item" />
        </div>
      </a-col>
    </a-row>
    <div class="myBody-footer">
      <span
        v-for="page in Math.ceil(itemStore.total / pageSize)"
        :key="page"
        class="myBody-pagination"
        @click="fetchItems(page)"
      >
        {{ page }}
      </span>
    </div>
  </div>
</template>

<script setup>
import MyCard from "./Mycard.vue";
import { pageSize } from "@/plugins/AppData";
import { useItemStore } from "@/store/ItemStore";

const itemStore = useItemStore();

const fetchItems = (page) => {
  itemStore.fetchItems({
    value: "",
    page: page,
    pageSize,
    searchTag: "",
  });
};
</script>

<style>
.myBody-cnt {
  margin: 50px 30px;
}
.myBody-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 50px;
  margin: 10px;
}
.myBody-pagination {
  background-color: lightgrey;
  padding: 5px 10px;
  margin: 5px;
  font-size: 1rem;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
}
.myBody-pagination:hover {
  background-color: rgb(28, 26, 26);
  color: white;
}
</style>
