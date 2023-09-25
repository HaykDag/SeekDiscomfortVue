import axios from "axios";
import { defineStore } from "pinia";
import { AppUrl } from "@/plugins/AppData";
axios.defaults.withCredentials = true;

export const useTagStore = defineStore("categories", {
  state: () => ({
    tags: [],
    error: null,
    isLoading: false,
  }),
  getters: {},
  actions: {
    async fetchTags() {
      this.isLoading = true;
      try {
        const res = await axios.get(AppUrl.Categories);
        this.tags = res.data.result;
      } catch (err) {
        this.error = err.response;
        console.log(err.response.data.error);
      }
      this.isLoading = false;
    },
    async addTag(title) {
      this.isLoading = true;
      try {
        const res = await axios.post(AppUrl.Categories, { title });
        this.tags.unshift(res.data);
      } catch (err) {
        this.error = err.response;
        console.log(err.response.data.error);
      }
      this.isLoading = false;
    },
    async deleteTag(id) {
      this.isLoading = true;
      try {
        await axios.delete(AppUrl.Categories + id);
        this.tags = this.tags.filter((tag) => tag.id !== id);
      } catch (err) {
        this.error = err.response;
        console.log(err.response.data.error);
      }
      this.isLoading = false;
    },
    async updateTag(id, category_title) {
      this.isLoading = true;
      try {
        await axios.put(AppUrl.Categories + id, { category_title });
        this.tags = this.tags.map((tag) =>
          tag.id === id ? { ...tag, title: category_title } : tag
        );
      } catch (err) {
        this.error = err.response;
        console.log(err.response.data.error);
      }
      this.isLoading = false;
    },
  },
});
