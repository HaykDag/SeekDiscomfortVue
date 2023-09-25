<template>
  <div class="myItemForm-cnt">
    <MyItemForm />
  </div>
</template>

<script setup>
import MyItemForm from "@/components/MyItemForm.vue";
</script>

<style>
.myItemForm-cnt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
