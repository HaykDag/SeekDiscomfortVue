<template>
  <div class="tags-cnt">
    <div class="tagsList">
      <div class="addTag-cnt">
        <a-input-group compact>
          <a-input
            v-model:value="newTag"
            style="width: calc(100% - 60px)"
            placeholder="New Tag..."
          />
          <a-button style="background-color: teal" @click="create">
            <PlusCircleOutlined
              style="font-size: 1.4rem; color: rgb(255, 255, 255)"
            />
          </a-button>
        </a-input-group>
      </div>
      <div v-for="tag in tagStore.tags" :key="tag.id" class="tag">
        <template v-if="editId == tag.id">
          <input v-model="editText" class="tag-input" />
          <span class="tag-icons">
            <SaveOutlined class="tag-save-btn" @click="save" />
            <RollbackOutlined class="tag-rollBack-btn" @click="cancel" />
          </span>
        </template>
        <template v-else>
          <span>{{ tag.title }}</span>
          <span class="tag-icons">
            <EditOutlined
              class="tag-edt-btn"
              @click="edit(tag.id, tag.title)"
            />
            <DeleteOutlined
              class="tag-delete-btn"
              @click="tagStore.deleteTag(tag.id)"
            />
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTagStore } from "@/store/TagStore";
import {
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined,
  SaveOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";

const newTag = ref("");
const editId = ref(null);
const editText = ref("");

const tagStore = useTagStore();

const create = () => {
  tagStore.addTag(newTag.value);
  newTag.value = "";
};

const edit = (id, text) => {
  editId.value = id;
  editText.value = text;
};
const save = () => {
  tagStore.updateTag(editId.value, editText.value);
  cancel();
};
const cancel = () => {
  editId.value = null;
  editText.value = "";
};
</script>

<style>
.tags-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 30px auto;
  max-height: 600px;
  overflow-y: hidden;
  user-select: none;
}
.addTag-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
}

.tagsList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: black;
  padding: 6px;
  margin: 0;
  border: 1px solid teal;
  width: 300px;
  border-radius: 6px;
  cursor: pointer;
}
.tag:hover {
  background-color: teal;
  color: white;
}
.tag-input {
  border: none;
  background-color: rgb(7, 169, 169);
  border-radius: 8px;
  height: 100%;
  padding: 2px 10px;
}
.tag-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  gap: 20px;
}
.tag-edt-btn:hover {
  color: blue;
}
.tag-delete-btn:hover,
.tag-rollBack-btn:hover {
  color: red;
}
.tag-save-btn:hover {
  color: gold;
}
</style>
