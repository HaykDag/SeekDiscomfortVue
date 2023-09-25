<template>
  <a-card hoverable class="card-cnt">
    <template #cover>
      <div class="card-img-cnt">
        <Image :src="item.images[0]" class="card-img" />
      </div>
    </template>

    <a-card-meta :title="item.title" style="max-width: fit-content">
      <template #description>
        <div class="card-meta-info">
          <span class="card-price">{{ item.price }} ֏</span>
          <HeartFilled
            @click="
              basketItemsids.includes(item.id)
                ? authStore.removeFromBasket(item)
                : authStore.addIntoBasket(item)
            "
            :class="`card-heart ${
              basketItemsids.includes(item.id) ? 'includes' : ''
            }`"
          />
        </div>
        <div class="card-details">
          <router-link :to="`./items/${item.id}`" style="color: black"
            >Details ></router-link
          >
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script setup>
import { HeartFilled } from "@ant-design/icons-vue";
import { Image } from "ant-design-vue";
import { useAuthStore } from "@/store/AuthStore";
import { computed } from "vue";

const authStore = useAuthStore();

const props = defineProps({
  item: Object,
});

const basketItemsids = computed(() => {
  return authStore.basketItemsIds;
});
</script>

<style>
.card-cnt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: fit-content;
  padding: 10px;
  height: 330px;
  background-color: #e7e7e7;
  user-select: none;
}
.card-img-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 210px;
  padding: 5px;
  border-radius: 5px;
  background-color: lightgray;
}
.card-img {
  width: auto;
  max-height: 200px;
  border-radius: 5px;
}
.card-meta-info {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}
.card-price {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 1rem;
  color: rgb(255, 89, 0);
  font-weight: 500;
}
.card-heart {
  font-size: 1.2rem;
}
.includes {
  color: red;
}
.card-details {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
