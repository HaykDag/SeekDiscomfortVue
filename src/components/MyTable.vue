<template>
  <div class="myTable-cnt">
    <a-table
      style="user-select: text"
      :columns="props.columns"
      :data-source="props.data"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <slot :column="column" :record="record"></slot>
      </template>
    </a-table>
  </div>
</template>

<script setup>
const props = defineProps(["data", "columns"]);
</script>

<style>
.myTable-cnt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
