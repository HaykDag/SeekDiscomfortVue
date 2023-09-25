import axios from "axios";
import { defineStore } from "pinia";
import { AppUrl } from "@/plugins/AppData";
axios.defaults.withCredentials = true;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    error: null,
    isLoading: false,
  }),
  getters: {
    basketItemsIds(state) {
      let basketItems = "";
      state.user?.basket.forEach((item) => {
        basketItems += item.id + ",";
      });
      return basketItems;
    },
    orderItemsIds(state) {
      let orderItems = "";
      state.user?.orders.forEach((order) => {
        orderItems += order.id + ",";
      });
      return orderItems;
    },
  },
  actions: {
    async verifyUser() {
      try {
        const res = await axios.get(AppUrl.Users.verifyUser);
        this.user = res.data;
      } catch (err) {
        console.log(err.response.data.error);
      }
    },
    async loginUser({ username, password }) {
      this.error = null;
      this.isLoading = true;
      try {
        const res = await axios.post(AppUrl.Users.loginUser, {
          username,
          password,
        });

        this.user = res.data;
      } catch (err) {
        this.error = err.response.data.error;
      }
      this.isLoading = false;
    },
    async logout() {
      try {
        await axios(AppUrl.Users.logoutUser);
        this.user = null;
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
    async signUser({ username, password, admin = false }) {
      this.error = null;
      this.isLoading = true;
      try {
        const res = await axios.post(AppUrl.Users.signupUser, {
          username,
          password,
          admin,
        });
        this.user = res.data;
      } catch (err) {
        if (err.response.data.error.includes("Duplicate")) {
          this.error = "Username is already in use";
        } else {
          this.error = err.response.data.error;
        }
      }
      this.isLoading = false;
    },
    async addIntoBasket(item) {
      this.error = null;
      this.isLoading = true;

      try {
        const res = await axios.post(AppUrl.Basket, {
          id: item.id,
        });

        this.user.basket.push(item);
      } catch (err) {
        this.error = err.response.data.error;
      }
      this.isLoading = false;
    },
    async removeFromBasket(item) {
      try {
        const res = await axios.delete(AppUrl.Basket + item.id);

        this.user.basket = this.user.basket.filter((i) => i.id !== item.id);
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
  },
});
