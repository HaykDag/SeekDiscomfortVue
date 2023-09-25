<template>
  <div class="userTable-cnt">
    <div class="userTable-operations">
      <a-input-search
        v-model:value="searchText"
        @search="handleSearch"
      ></a-input-search>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        "
        v-if="searchTag.length > 0"
      >
        <span>Tags:</span>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
          "
        >
          <a-tag
            v-for="(tag, i) in searchTag"
            :key="i"
            class="table-tag"
            :color="tag.length > 5 ? 'geekblue' : 'green'"
            @click="searchTag.splice(i, 1)"
            >{{ tag }}
          </a-tag>
        </div>
      </div>
      <button
        v-if="searchText !== '' || searchTag.length > 0"
        class="reset-btn"
        @click="reset"
      >
        RESET
      </button>
    </div>
    <MyTable :data="itemStore.items" :columns="columns">
      <template #default="{ column, record }">
        <template v-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag.length > 5 ? 'geekblue' : 'green'"
              class="table-tag"
              @click="!searchTag.includes(tag) ? searchTag.push(tag) : ''"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'operation'">
          <div class="action-icons-cnt">
            <router-link :to="`./updateItem/${record.id}`">
              <span>
                <MenuOutlined class="table-details-icon" />
                <v-tooltip activator="parent" location="top">Details</v-tooltip>
              </span>
            </router-link>
            <span>
              <DeleteOutlined
                class="table-delete-icon"
                @click="itemStore.deleteItem(record.id)"
              />
              <v-tooltip activator="parent" location="top">Delete</v-tooltip>
            </span>
          </div>
        </template>
      </template>
    </MyTable>
    <a-pagination
      v-model:current="currentPage"
      v-model:pageSize="pageSize"
      :total="itemStore.total"
      @change="handleSearch"
    />
  </div>
</template>

<script setup>
import { DeleteOutlined, MenuOutlined } from "@ant-design/icons-vue";
import MyTable from "@/components/MyTable.vue";
import { useItemStore } from "@/store/ItemStore";
import { onMounted, ref } from "vue";
import { pageSize } from "@/plugins/AppData";

const itemStore = useItemStore();

const searchText = ref("");
const currentPage = ref(1);
const searchTag = ref([]);

const reset = () => {
  searchText.value = "";
  currentPage.value = 1;
  searchTag.value = [];

  handleSearch();
};

const handleSearch = () => {
  itemStore.fetchItems({
    value: searchText.value,
    page: currentPage.value,
    searchTag: searchTag.value.join(","),
  });
};

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
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
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
  },
  {
    title: "Action",
    key: "operation",
  },
];

onMounted(() => {
  itemStore.fetchItems({
    value: searchText.value,
    page: currentPage.value,
    pageSize,
    searchTag: searchTag.value.join(","),
  });
});
</script>

<style>
.userTable-cnt {
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
.action-icons-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  font-size: large;
}
.userTable-operations {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.table-tag {
  cursor: pointer;
}
.table-tag:hover {
  background-color: transparent;
  color: black;
}
.reset-btn {
  padding: 2px 6px;
  background-color: teal;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  transition: 0.3s;
  margin: 2px;
}
.reset-btn:hover {
  background-color: white;
  color: teal;
}
@media screen and (max-width: 1300px) {
  .userTable-cnt {
    width: 80%;
  }
}
</style>
