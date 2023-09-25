<template>
  <div class="orderTable-cnt">
    <div class="orderTable-operations">
      <a-input-search
        v-model:value="searchText"
        @search="handleSearch"
      ></a-input-search>
      <button v-if="searchText !== ''" class="reset-btn" @click="reset">
        RESET
      </button>
    </div>
    <MyTable :data="orderStore.orders" :columns="columns">
      <template #default="{ column, record }">
        <template v-if="column.key === 'basket'">
          <span>
            <a-tag
              v-for="item in record.basket"
              :key="item.id"
              :color="item.title.length > 15 ? 'geekblue' : 'green'"
              class="table-basketItem"
            >
              {{ item.title }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'orders'">
          <span>
            <a-tag
              v-for="item in record.orders"
              :key="item.id"
              :color="item.title.length > 15 ? 'geekblue' : 'green'"
              class="table-basketItem"
            >
              {{ item.title }}
            </a-tag>
          </span>
        </template>
      </template>
    </MyTable>
    <a-pagination
      v-model:current="currentPage"
      v-model:pageSize="pageSize"
      :total="orderStore.total"
      @change="handleSearch"
    />
  </div>
</template>

<script setup>
import MyTable from "@/components/MyTable.vue";
import { useOrderStore } from "@/store/OrderStore";
import { onMounted, ref } from "vue";
import { pageSize } from "@/plugins/AppData";

const orderStore = useOrderStore();

const searchText = ref("");
const currentPage = ref(1);

const handleSearch = () => {
  orderStore.fetchOrders({
    value: searchText.value,
    page: currentPage.value,
  });
};

const reset = () => {
  searchText.value = "";
  currentPage.value = 1;

  handleSearch();
};

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "User ID",
    dataIndex: "user_id",
    key: "user_id",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Item ID",
    dataIndex: "item_id",
    key: "item_id",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Order Status",
    dataIndex: "order_status",
    key: "order_status",
  },
  {
    title: "Payment Status",
    dataIndex: "payment_status",
    key: "payment_status",
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
  },
];

onMounted(() => {
  orderStore.fetchOrders({ value: searchText.value, page: currentPage.value });
});
</script>

<style>
.orderTable-cnt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-inline: auto;
  background-color: white;
  margin-top: 30px;
  user-select: none;
}
.orderTable-operations {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
@media screen and (max-width: 1300px) {
  .userTable-cnt {
    width: 80%;
  }
}
</style>
