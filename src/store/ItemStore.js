import { defineStore } from "pinia";
import axios from "axios";
import { AppUrl, pageSize } from "@/plugins/AppData";
import { uploadImage } from "@/utils/upload";
axios.defaults.withCredentials = true;

const ITEMS_URL = AppUrl.Items;

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    items: [],
    total: 0,
    error: null,
    isLoading: false,
  }),
  getters: {
    getItemById: (state) => {
      return (id) => state.items.find((item) => item.id == id);
    },
    getThumbnail(state) {
      return (id) => {
        const item = state.items.find((item) => item.id == id);
        return item.images[0];
      };
    },
  },
  actions: {
    async fetchItems({ value = "", page = 1, searchTag = "" } = {}) {
      this.isLoading = true;
      try {
        const res = await axios(
          `${ITEMS_URL}?value=${value}&pageSize=${pageSize}&page=${page}&searchTag=${searchTag}`
        );
        this.items = res.data.result;
        this.total = res.data.total;
      } catch (err) {
        this.error = err.response.data.error;
      }
      this.isLoading = false;
    },
    async addItem(item) {
      this.isLoading = true;
      const { title, description, price, tagIds, imgId, imgUrl } = item;
      try {
        const res = await axios.post(
          AppUrl.Items,
          { title, description, price, tagIds, imgUrl, imgId },
          { withCredentials: true }
        );
        this.fetchItems({ value: "", page: 1, searchTag: "" });
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
    async updateItem(item) {
      this.isLoading = true;
      const { id, title, description, price, tagIds, imgId, imgUrl } = item;
      try {
        const res = await axios.put(
          AppUrl.Items + id,
          { title, description, price, tagIds, imgUrl, imgId },
          { withCredentials: true }
        );
        this.fetchItems({ value: "", page: 1, searchTag: "" });
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
    async deleteItem(item_id) {
      this.isLoading = true;
      try {
        await axios.delete(AppUrl.Items + item_id);
        this.items = this.items.filter((item) => item.id !== parseInt(item_id));
        this.total--;
      } catch (err) {
        this.error = err;
      }
      this.isLoading = false;
    },
    async deleteImage(item_id, image_url) {
      this.isLoading = true;
      try {
        const res = await axios.post(AppUrl.Images + "delete", {
          item_id,
          image_url,
        });
        const item = this.items.find((i) => i.id === parseInt(item_id));
        item.images = item?.images.filter((url) => url !== image_url);
      } catch (err) {
        this.error = err;
      }
      this.isLoading = false;
    },
  },
});
