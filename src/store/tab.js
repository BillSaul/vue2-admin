import Cookie from "js-cookie";

export default {
  state: {
    isCollapse: false, // 控制侧边栏的展开状态
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ],
    menu: [],
  },
  mutations: {
    // 修改菜单展开收起的方法
    COLLASPE_MENU(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 更新面包屑数据
    SELECT_MENU(state, val) {
      // 判断是否为首页
      if (val.name !== "home") {
        const index = state.tabList.findIndex((item) => item.name === val.name);
        if (index === -1) {
          state.tabList.push(val);
        }
      }
    },
    CLOSE_TAB(state, item) {
      const index = state.tabList.findIndex((val) => val.name === item.name);
      state.tabList.splice(index, 1);
    },
    // 设置 menu 的数据
    SET_MENU(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    // 动态路由
    ADD_MENU(state, router) {
      // 判断缓存中是否有数据
      if (!Cookie.get("menu")) return;
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      // 组装动态路由数据
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
      });
      menuArray.forEach((item) => {
        router.addRoute("Main", item);
      });
    },
  },
};
