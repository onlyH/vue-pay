import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import vpay from 'vpay'
//
// Vue.use(vpay)
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
