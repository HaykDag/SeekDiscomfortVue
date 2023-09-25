<template>
  <div class="details-cnt">
    <div v-if="isLoading">Loading...</div>
    <v-carousel
      v-else
      show-arrows="hover"
      hide-delimiter-background
      style="max-width: 1000px"
    >
      <v-carousel-item
        v-for="(image, i) in images"
        :key="i"
        :src="image"
        :lazy-src="image"
        aspect-ratio="1"
      >
      </v-carousel-item>
    </v-carousel>
    <div class="details-meta-cnt">
      <div class="details-meta">
        <h1>{{ item?.title }}</h1>
        <h3>{{ Math.floor(item?.price) }} ֏</h3>
        <p>{{ item?.description }}</p>
      </div>
      <div class="details-actions" v-if="authStore.user">
        <v-btn
          v-if="!orderItemsIds.includes(item?.id)"
          @click="
            orderStore.addOrder({
              item_id: item.id,
              user_id: authStore.user.id,
            })
          "
        >
          <v-icon icon="mdi-shopping" />
          <v-tooltip activator="parent" location="bottom">Order</v-tooltip>
        </v-btn>
        <span v-else> Ordered </span>
        <v-btn
          v-if="!basketItemsIds.includes(item?.id)"
          @click="authStore.addIntoBasket(item)"
        >
          <v-icon icon="mdi-cart" />
          <v-tooltip activator="parent" location="bottom"
            >Add into Cart</v-tooltip
          >
        </v-btn>
        <v-btn v-else @click="authStore.removeFromBasket(item)">
          <v-icon icon="mdi-cart-minus" />
          <v-tooltip activator="parent" location="bottom"
            >Remove From Cart</v-tooltip
          >
        </v-btn>
        <v-btn v-if="authStore.user.isAdmin">
          <v-icon icon="mdi-image-plus" />
          <v-tooltip activator="parent" location="bottom"
            >Upload Image</v-tooltip
          >
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useItemStore } from "@/store/ItemStore";
import { useAuthStore } from "@/store/AuthStore";
import { useOrderStore } from "@/store/OrderStore";
import { AppUrl } from "@/plugins/AppData";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const authStore = useAuthStore();
const itemStore = useItemStore();
const orderStore = useOrderStore();
const route = useRoute();

//get item from items by id from params
const { id } = route.params;

const item = ref(null);
let images = ref([]);
const isLoading = ref(false);

const basketItemsIds = computed(() => {
  return authStore.basketItemsIds;
});

const orderItemsIds = computed(() => {
  return authStore.orderItemsIds;
});

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await axios(AppUrl.Items + id);
    images.value = res.data.images.split(",");
    item.value = res.data;
  } catch (err) {
    console.log(err);
  }
  isLoading.value = false;
});
</script>

<style scoped>
.details-cnt {
  width: 100%;
  height: 100%;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}
.details-meta-cnt {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: teal;
  border-radius: 5%;
  color: white;
  width: 100%;
  padding: 5px;
}
.details-meta {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.details-meta-cnt h1 {
  text-align: center;
  font-size: 2rem;
}
.details-meta-cnt h3 {
  margin-top: 10px;
  color: gold;
  text-align: center;
  font-size: 1.5rem;
}
.details-meta-cnt p {
  margin-top: 25px;
  color: white;
  text-align: center;
  font-size: 1.2rem;
}
.details-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  padding-bottom: 10px;
}
.delete-icon {
  position: absolute;
  top: 10px;
  right: 50%;
  background-color: red;
  padding: 15px;
  color: white;
  border-radius: 50%;
  cursor: pointer;
}
@media (max-width: 800px) {
  .details-cnt {
    flex-direction: column;
  }
}
</style>
