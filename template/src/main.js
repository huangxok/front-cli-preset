import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
Vue.use(ElementUI);

Vue.config.productionTip = false;

import * as filters from "./utils/filters";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

const init = async parms => {
  await store.dispatch("getFrontConfig"); //获取配置
  const HOST_CONFIG = store.state.frontConfig;
  if (process.env.NODE_ENV !== "development") {
    Vue.prototype.HOST = {
      netdiscHost: HOST_CONFIG.netdiscHost ? HOST_CONFIG.netdiscHost : "", // 网盘
      storageHost: HOST_CONFIG.storageHost ? HOST_CONFIG.storageHost : "", //存储
      portalHost: HOST_CONFIG.portalHost ? HOST_CONFIG.portalHost : "", //门户
      homeHost: HOST_CONFIG.homeHost ? HOST_CONFIG.homeHost : "", // cms
      resHost: HOST_CONFIG.resHost ? HOST_CONFIG.resHost : "", // 资源
      spaceHost: HOST_CONFIG.spaceHost ? HOST_CONFIG.spaceHost : "" // 互动空间
    };
  } else {
    Vue.prototype.HOST = {
      netdiscHost: "http://pan.taltest.com",
      storageHost: "http://storage.taltest.com",
      portalHost: "",
      homeHost: "http://home.taltest.com",
      resHost: "http://res.taltest.com",
      spaceHost: "http://space.taltest.com"
    };
  }
  return new Vue(parms).$mount("#app");
};
init({
  router,
  store,
  render: h => h(App)
});
