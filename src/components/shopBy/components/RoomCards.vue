<template>
  <a-col
    v-for="(data, i) in categoryData"
    :key="i"
    class="gutter-row"
    :xs="24"
    :sm="24"
    :md="24"
    :lg="12"
    :xl="6"
  >
    <router-link :to="`/category/${data.name}`">
      <img class="roomImage" :src="data.image" />
      <p class="roomShoppingByTitle">{{ data.name }}</p>
    </router-link>
  </a-col>
</template>

<script setup>
import shopByBedroom from "@/assets/shop_by-images/shop_by-bedroom.jpg";
import shopByDiningRoom from "@/assets/shop_by-images/shop_by-dining_room.jpg";
import shopByHomeOffice from "@/assets/shop_by-images/shop_by-home_office.jpg";
import shopByLivingRoom from "@/assets/shop_by-images/shop_by-living_room.jpg";

const categoryData = [
  {
    name: "Bedroom",
    image: shopByBedroom,
  },
  {
    name: "Dining Room",
    image: shopByDiningRoom,
  },
  {
    name: "Home Office",
    image: shopByHomeOffice,
  },
  {
    name: "Living Room",
    image: shopByLivingRoom,
  },
];
</script>

<style>
.roomShoppingByTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 25px;
}
.roomImage {
  width: 310px;
}
.shoppingByTitle:hover {
  color: #f4c300;
}
@media screen and (max-width: 1535px) {
  .roomImage,
  .roomShoppingByTitle {
    width: 300px;
    font-size: 22px;
  }
}
@media screen and (max-width: 1480px) {
  .roomImage,
  .roomShoppingByTitle {
    width: 290px;
    font-size: 20px;
  }
}
@media screen and (max-width: 1430px) {
  .roomImage,
  .roomShoppingByTitle {
    width: 250px;
    font-size: 17px;
  }
}
@media screen and (max-width: 1225px) {
  .roomImage,
  .roomShoppingByTitle {
    width: 230px;
  }
}
@media screen and (max-width: 1196px) {
  .roomImage,
  .roomShoppingByTitle {
    width: 400px;
    font-size: 25px;
  }
}
@media screen and (max-width: 990px) {
  .roomImage,
  .roomShoppingByTitle {
    width: 800px;
    font-size: 30px;
  }
}
@media screen and (max-width: 910px) {
  .roomImage,
  .roomShoppingByTitle {
    width: 700px;
    font-size: 30px;
  }
}
@media screen and (max-width: 803px) {
  .roomImage,
  .roomShoppingByTitle {
    width: 600px;
    font-size: 30px;
  }
}
@media screen and (max-width: 700px) {
  .roomImage,
  .roomShoppingByTitle {
    width: 450px;
    font-size: 23px;
  }
}
@media screen and (max-width: 550px) {
  .roomImage,
  .roomShoppingByTitle {
    width: 400px;
    font-size: 20px;
  }
}
</style>
