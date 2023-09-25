<template>
  <a-form
    layout="horizontal"
    class="myForm"
    :model="formState"
    @finish="onSubmit"
    :disabled="itemStore.isLoading"
  >
    <a-form-item class="myForm-title" label="Title" name="title">
      <a-input placeholder="Title..." v-model:value="formState.title" />
    </a-form-item>
    <a-form-item class="myForm-tags" label="Tags" name="tags">
      <a-select
        placeholder="Select Tags"
        v-model:value="formState.tags"
        mode="multiple"
      >
        <a-select-option
          v-for="tag in tagStore.tags"
          :value="tag.title"
          :key="tag.id"
          >{{ tag.title }}</a-select-option
        >
      </a-select>
    </a-form-item>
    <a-form-item class="myForm-price" label="Price" name="price">
      <a-input-number placeholder="Price" v-model:value="formState.price" />
    </a-form-item>
    <a-form-item class="myForm-description" label="Desc" name="descritpion">
      <a-textarea
        :rows="4"
        placeholder="description"
        v-model:value="formState.description"
      />
    </a-form-item>
    <a-form-item class="myForm-upload" label="Upload" name="images">
      <a-upload
        action="/upload.do"
        list-type="picture-card"
        v-model:fileList="formState.images"
      >
        <div>
          <PlusOutlined />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item class="myForm-btns">
      <a-button class="form-submit-btn" html-type="submit">Submit</a-button>
      <a-button class="form-cancel-btn">Cancel</a-button>
    </a-form-item>
  </a-form>
  <div v-if="page === 'updateItem'" class="uploadedImages">
    <div
      v-for="(image, i) in uploadedImages"
      :key="i"
      style="position: relative"
    >
      <a-image :src="image" style="height: 100px; width: auto" />
      <span class="upadteItem-deleteIcon">
        <DeleteOutlined
          @click="itemStore.deleteImage(id, image)"
          class="updateItem-delIcon"
        />
      </span>
    </div>
  </div>
</template>

<script setup>
import { AppUrl } from "@/plugins/AppData";
import { useItemStore } from "@/store/ItemStore";
import { useTagStore } from "@/store/TagStore";
import { uploadImage } from "@/utils/upload";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue";
import axios from "axios";
import { ref } from "vue";
import { onMounted, reactive } from "vue";

import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const route = useRoute();
const page = route.name;
const { id } = route.params;

const tagStore = useTagStore();
const itemStore = useItemStore();
const uploadedImages = ref([]);
const formState = reactive({
  title: "",
  price: 0,
  description: "",
  tags: [],
  images: [],
});

const onSubmit = async () => {
  let imgId, imgUrl;
  let tagIds = [];
  const imageData = formState.images[0]?.originFileObj;
  if (imageData) {
    const result = await uploadImage(imageData);
    imgId = result.imgId;
    imgUrl = result.imgUrl;
  }

  formState.tags.forEach((tag) => {
    tagStore.tags.forEach((t) => {
      if (tag === t.title) {
        tagIds.push(t.id);
      }
    });
  });
  if (page === "addItem") {
    itemStore.addItem({ ...formState, imgId, imgUrl, tagIds });
  } else if (page === "updateItem") {
    itemStore.updateItem({ ...formState, id, imgId, imgUrl, tagIds });
  }

  if (!itemStore.error) {
    router.push({ name: "items" });
  }
};

onMounted(async () => {
  if (page === "addItem") {
    console.log("yahoo");
  } else if (page === "updateItem") {
    itemStore.isLoading = true;
    try {
      const res = await axios(AppUrl.Items + id);

      uploadedImages.value = res.data.images.split(",");
      formState.tags = res.data.tags?.split(",");
      formState.title = res.data.title;
      formState.price = res.data.price;
      formState.description = res.data.description;
    } catch (err) {
      console.log(err);
    }
    itemStore.isLoading = false;
  }
});
</script>

<style>
.myForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;
  max-width: 600px;
}
.myForm-title {
  margin: 0;
}
.myForm-tags {
  margin: 0;
  min-width: 150px;
  max-width: 350px;
}
.myForm-price {
  margin: 0;
  min-width: 120px;
}
.myForm-description,
.myForm-isAdmin,
.myForm-upload {
  margin: 0;
}

.ant-form-item-control-input-content {
  margin: 0;
  display: flex;
  gap: 20px;
}
.form-submit-btn {
  background-color: teal;
  color: white;
}
.form-submit-btn:hover {
  color: teal;
  background-color: white;
}
.form-cancel-btn {
  background-color: crimson;
  color: white;
}
.form-cancel-btn:hover {
  color: crimson;
  background-color: white;
}
.uploadedImages {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 100px;
}
.upadteItem-deleteIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 100px;
  left: 0px;
  width: 100%;
  cursor: pointer;
}
.updateItem-delIcon {
  color: red;
  font-size: large;
}
.updateItem-delIcon:hover {
  color: rgb(172, 7, 7);
}
</style>
