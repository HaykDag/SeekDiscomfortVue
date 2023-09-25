<template>
  <div class="userTable-cnt">
    <div class="userTable-operations">
      <a-input-search
        v-model:value="searchText"
        @search="handleSearch"
      ></a-input-search>
      <button v-if="searchText !== ''" class="reset-btn" @click="reset">
        RESET
      </button>
    </div>
    <MyTable :data="userStore.users" :columns="columns">
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
        <template v-else-if="column.key === 'admin'">
          <v-icon v-if="record.isAdmin" icon="mdi-check-outline"></v-icon>
          <v-icon v-else icon="mdi-alpha-x"></v-icon>
        </template>
      </template>
    </MyTable>
    <a-pagination
      v-model:current="currentPage"
      v-model:pageSize="pageSize"
      :total="userStore.total"
      @change="handleSearch"
    />
  </div>
</template>

<script setup>
import MyTable from "@/components/MyTable.vue";
import { useUserStore } from "@/store/UserStore";
import { onMounted, ref } from "vue";
import { pageSize } from "@/plugins/AppData";

const userStore = useUserStore();

const searchText = ref("");
const currentPage = ref(1);

const handleSearch = () => {
  userStore.fetchUsers({
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
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Admin",
    dataIndex: "isAdmin",
    key: "admin",
  },
  {
    title: "Shopping Cart",
    dataIndex: "basket",
    key: "basket",
  },
  {
    title: "Orders",
    dataIndex: "orders",
    key: "orders",
  },
];

onMounted(() => {
  userStore.fetchUsers();
});
</script>

<style>
.userTable-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-inline: auto;
  background-color: white;
  margin-top: 30px;
  user-select: none;
}
.userTable-operations {
  user-select: text;
}
@media screen and (max-width: 1300px) {
  .userTable-cnt {
    width: 80%;
  }
}
</style>
