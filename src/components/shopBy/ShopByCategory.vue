<template>
  <div class="category-wrapper">
    <h2>Shop By Category</h2>
    <div class="category-grid-cnt">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <CategoryCards />
      </a-row>
    </div>
  </div>
</template>

<script setup>
import CategoryCards from "./components/CategoryCards.vue";
</script>

<style>
.category-wrapper {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 25px auto;
  justify-content: center;
  align-items: start;
}
</style>
