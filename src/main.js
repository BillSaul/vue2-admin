import Vue from "vue";
import App from "./App.vue";
// 按需引入
// import { Row, Button } from "element-ui";
// 全局引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import "./api/mock";
import Cookie from "js-cookie";

Vue.config.productionTip = false;
// 按需引入
// Vue.use(Row);
// Vue.use(Button);
Vue.use(ElementUI);

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断 token 是否存在
  const token = Cookie.get("token");
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (token && to.name === "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  created(){
    store.commit("ADD_MENU", router)
  }
}).$mount("#app");
