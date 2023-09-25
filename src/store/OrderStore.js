import axios from "axios";
import { defineStore } from "pinia";
import { AppUrl, pageSize } from "@/plugins/AppData";

axios.defaults.withCredentials = true;

export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    orders: [],
    total: 0,
    error: null,
    isLoading: false,
  }),
  getters: {
    getOrder: (state) => {
      return (id) => state.orders.find((order) => order.id == id);
    },
  },
  actions: {
    async fetchOrders({ value = "", page = 1 } = {}) {
      this.isLoading = true;
      try {
        const res = await axios.get(
          `${AppUrl.Orders}?value=${value}&pageSize=${pageSize}&page=${page}`
        );
        this.orders = res.data.result;
        this.total = res.data.total;
      } catch (err) {
        this.error = err.response.data;
        console.log(err.response.data);
      }
      this.isLoading = false;
    },
    async addOrder({ item_id, user_id }) {
      this.isLoading = true;
      try {
        const res = await axios.post(AppUrl.Orders, { item_id, user_id });
      } catch (err) {
        this.error = err.response.data.error;
        console.log(err.response.data.error);
      }
      this.isLoading = false;
    },
    async deleteOrder(id) {
      this.isLoading = true;
      try {
        await axios.delete(AppUrl.Orders + id);
        this.orders = this.orders.filter((order) => order.id !== id);
      } catch (err) {
        this.error = err.response.data.error;
        console.log(err.response.data.error);
      }
      this.isLoading = false;
    },
    async updateOrder({ id, payment_status, order_status }) {
      this.isLoading = true;
      try {
        await axios.put(AppUrl.Orders + id, { payment_status, order_status });
        this.orders = this.orders.map((order) =>
          order.id === id ? { ...order, payment_status, order_status } : order
        );
      } catch (err) {
        this.error = err.response.data.error;
        console.log(err.response.data.error);
      }
      this.isLoading = false;
    },
  },
});
