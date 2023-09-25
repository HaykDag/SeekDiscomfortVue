import { defineStore } from "pinia";
import axios from "axios";
import { AppUrl, pageSize } from "@/plugins/AppData";
axios.defaults.withCredentials = true;

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    total: 0,
    error: null,
    isLoading: false,
  }),
  getters: {
    getUserById: (state) => {
      return (id) => state.users.find((user) => user.id == id);
    },
  },
  actions: {
    async fetchUsers({ value = "", page = 1 } = {}) {
      this.isLoading = true;
      try {
        const res = await axios(
          `${AppUrl.Users.base}?value=${value}&pageSize=${pageSize}&page=${page}`
        );
        this.users = res.data.result;
        this.total = res.data.total;
      } catch (err) {
        this.error = err.response.data.error;
      }
      this.isLoading = false;
    },
  },
});
