<template>
  <div class="rooms-wrapper">
    <h2>Shop By Room</h2>
    <div class="category-grid-cnt">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <RoomCards />
      </a-row>
    </div>
  </div>
</template>

<script setup>
import RoomCards from "./components/RoomCards.vue";
</script>

<style>
.rooms-wrapper {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 25px auto;
  justify-content: center;
  align-items: start;
}
</style>
