import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Vuelidate from 'vuelidate'

import store from './store'
// Bootstrap
import 'popper.js'
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// Animate.CSS
import 'animate.css/animate.min.css'
// SweetAlert
import VueSweetAlert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// Using plugins
Vue.use(Vuelidate)
Vue.use(VueSweetAlert2)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
