import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadScript from 'vue-plugin-load-script'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquare, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
library.add(faSquare)
library.add(faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(LoadScript)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
