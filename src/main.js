// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import bootstrap from 'bootstrap'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import jquery from 'jquery'
import axios from 'axios'
import Moment from 'moment'

Vue.prototype.moment = Moment;
Vue.prototype.$http = axios;
Vue.use(jquery);
Vue.use(element);
Vue.use(bootstrap);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
