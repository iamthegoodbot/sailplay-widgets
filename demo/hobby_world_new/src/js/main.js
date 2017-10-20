import Vue from 'vue'
import App from './components/App'
import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate';
import SAILPLAY from 'sailplay-hub'

Vue.use(VeeValidate)
Vue.use(VueResource)
Vue.use(VueRx, {
  Observable,
  Subscription,
  Subject
})


let auth_hash = null
let data = null

let init = function () {
  new Vue({
    el: '#sailplay-magic',
    template: '<App/>',
    components: {App},
    data: () => {
      return {
        config: data
      }
    }
  })

}

SAILPLAY.on('init.success', function () {
  if (!auth_hash)
    init()
  else
    SAILPLAY.send('login', auth_hash)
})

SAILPLAY.on('login.success', init)

export default class Magic {

  constructor(config) {
    config = config || {}
    config.partner_id = config.partner_id || 1639
    auth_hash = config.auth_hash || null
    SAILPLAY.send('init', config)
    data = config.data
  }

}

window.SpMagic = Magic;