<template>
  <a-col
    v-for="(data, i) in categoryData"
    :key="i"
    class="gutter-row"
    :xs="12"
    :sm="8"
    :md="6"
    :lg="4"
    :xl="4"
  >
    <router-link :to="`/category/${data.name}`">
      <img :src="data.image" />
      <p class="shoppingByTitle">{{ data.name }}</p>
    </router-link>
  </a-col>
</template>

<script setup>
import shopByClearance from "@/assets/shop_by-images/shop_by-clearance.jpg";
import shopByBedding from "@/assets/shop_by-images/shop_by-bedding.jpg";
import shopByBedframes from "@/assets/shop_by-images/shop_by-bedframes.jpg";
import shopByChairs from "@/assets/shop_by-images/shop_by-chairs.jpg";
import shopByCoolingAircare from "@/assets/shop_by-images/shop_by-cooling_aircare.jpg";
import shopByMattresses from "@/assets/shop_by-images/shop_by-mattresses.jpg";
import shopByOutdoor from "@/assets/shop_by-images/shop_by-outdoor.jpg";
import shopBySmallAppliances from "@/assets/shop_by-images/shop_by-small_appliances.jpg";
import shopBySofas from "@/assets/shop_by-images/shop_by-sofas.jpg";
import shopByStorage from "@/assets/shop_by-images/shop_by-storage.jpg";
import shopByTables from "@/assets/shop_by-images/shop_by-tables.jpg";

const categoryData = [
  {
    name: "Clearance",
    image: shopByClearance,
  },
  {
    name: "Bedding",
    image: shopByBedding,
  },
  {
    name: "Bed Frames",
    image: shopByBedframes,
  },
  {
    name: "Chairs",
    image: shopByChairs,
  },
  {
    name: "Cooling & Air Care",
    image: shopByCoolingAircare,
  },
  {
    name: "Mattresses",
    image: shopByMattresses,
  },
  {
    name: "OutDoor",
    image: shopByOutdoor,
  },
  {
    name: "Small Appliances",
    image: shopBySmallAppliances,
  },
  {
    name: "Sofas",
    image: shopBySofas,
  },
  {
    name: "Storage",
    image: shopByStorage,
  },
  {
    name: "Tables",
    image: shopByTables,
  },
];
</script>

<style>
.shoppingByTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: black;
}
.shoppingByTitle:hover {
  color: #f4c300;
}
</style>
