// Composables
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Sign from "@/views/Sign.vue";
import ItemDetails from "@/views/ItemDetails.vue";
import NotFound from "@/views/NotFound.vue";
import Dashboard from "@/views/Dashboard.vue";
import Users from "@/views/Users.vue";
import AddItem from "@/views/AddItem.vue";
import Orders from "@/views/Orders.vue";
import AddAdmin from "@/views/AddAdmin.vue";
import UpdateItem from "@/views/UpdateItem.vue";
import Items from "@/views/Items.vue";
import Tags from "@/views/Tags.vue";
import CheckoutCart from "@/views/CheckoutCart.vue";
import SupportChat from "@/views/SupportChat.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/sign",
    component: Sign,
    name: "sign",
  },
  {
    path: "/dashboard",
    component: Dashboard,
    name: "dashboard",
    children: [
      {
        path: "items",
        component: Items,
        name: "items",
      },
      {
        path: "items/:id",
        component: ItemDetails,
        name: "itemDetails",
      },
      {
        path: "users",
        component: Users,
        name: "users",
      },
      {
        path: "orders",
        component: Orders,
        name: "orders",
      },
      {
        path: "addItem",
        component: AddItem,
        name: "addItem",
      },
      {
        path: "updateItem/:id",
        component: UpdateItem,
        name: "updateItem",
      },
      {
        path: "addAdmin",
        component: AddAdmin,
        name: "addAdmin",
      },
      {
        path: "tags",
        component: Tags,
        name: "tags",
      },
      {
        path: "support",
        component: SupportChat,
        name: "support",
      },
    ],
  },
  {
    path: "/items/:id",
    component: ItemDetails,
    name: "itemDetails",
  },
  {
    path: "/checkout",
    component: CheckoutCart,
    name: "checkout",
  },
  { path: "/:pathMatch(.*)*", name: "notFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
