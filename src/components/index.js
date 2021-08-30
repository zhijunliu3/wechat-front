import Vue from 'vue'
import VueQr from 'vue-qr'

const COMPONENTS = [
  VueQr
]

COMPONENTS.forEach(component => {
  Vue.component(component.name, component)
})
