/**
 * main.js
 *
 * */
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

//pinia
import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);

registerPlugins(app);
app.use(Antd);
app.use(pinia);

app.mount("#app");
