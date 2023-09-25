<template>
  <div class="cart-cnt">
    <a-dropdown placement="bottomRight">
      <a-badge :count="authStore.user?.basket?.length" size="small">
        <ShoppingCartOutlined style="font-size: large" />
      </a-badge>
      <template #overlay>
        <div class="shoppingCart-cnt">
          <div class="shoppingCart-info">
            <div class="shoppingCart-info-top">
              <span style="font-size: 16px">
                <strong>{{ authStore.user?.basket?.length }}</strong> Items in
                Cart</span
              >
              <span style="font-size: 16px; width: 100px; text-align: right">
                Cart Subtotal: ֏ {{ subTotal }}</span
              >
            </div>
            <div class="shoppingCart-info-bottom">
              <button
                class="checkOut-btn"
                style="font-size: 1rem; font-weight: 700"
                @click="checkout"
              >
                GO CHECKOUT >
              </button>
            </div>
          </div>
          <div class="shopping-cart-middle">
            <div
              v-for="item in authStore.user?.basket"
              class="shoppingCart-item"
            >
              <router-link :to="`/items/${item.id}`">
                <img
                  :src="getThumbnail(item.id)"
                  style="width: 100px; height: auto"
                />
              </router-link>
              <span style="max-width: 100px"
                >{{ item.title }} - {{ parseInt(item.price) }}֏</span
              >
              <span style="font-size: large; cursor: pointer">
                <a-tooltip placement="top">
                  <template #title>
                    <span>Move to Wish List</span>
                  </template>
                  <RollbackOutlined />
                </a-tooltip>
                <a-tooltip placement="top">
                  <template #title>
                    <span>Delete</span>
                  </template>
                  <DeleteOutlined
                    @click="authStore.removeFromBasket(item)"
                    class="cart-item-delete-icon"
                  />
                </a-tooltip>
              </span>
            </div>
          </div>
          <div class="shopping-cart-bottom">
            <router-link :to="{ name: 'checkout' }">
              <span style="color: black">View and edit cart</span>
            </router-link>
          </div>
        </div>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  RollbackOutlined,
} from "@ant-design/icons-vue";
import { useItemStore } from "@/store/ItemStore";
import { useAuthStore } from "@/store/AuthStore";
import { computed } from "vue";

import { storeToRefs } from "pinia";

const itemStore = useItemStore();
const authStore = useAuthStore();

const { getThumbnail } = storeToRefs(itemStore);

const subTotal = computed(() => {
  let total = 0;
  authStore.user?.basket?.forEach((item) => (total += parseInt(item.price)));
  return total;
});
</script>

<style>
.cart-cnt {
  cursor: pointer;
}
.shoppingCart-cnt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  background-color: white;
  border: 2px solid gold;
  border-radius: 5px;
  user-select: none;
}
.shoppingCart-info {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 350px;
  height: 150px;
  padding: 10px;
  gap: 15px;
  border-bottom: 1px solid lightgray;
}
.shoppingCart-info-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.shoppingCart-info-bottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.checkOut-btn {
  width: 80%;
  height: 50px;
  background-color: gold;
  color: white;
}
.checkOut-btn:hover {
  background-color: #333;
}
.shopping-cart-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  width: 100%;
}
.shoppingCart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 10px;
  width: 100%;
  height: 150px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
}
.cart-item-delete-icon:hover {
  color: red;
}
.shopping-cart-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  font-size: 1rem;
  font-weight: 700;
}
.shopping-cart-bottom span:hover {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.573);
}
</style>
