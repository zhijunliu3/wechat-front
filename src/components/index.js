import Vue from 'vue'

const COMPONENTS = [

]

COMPONENTS.forEach(component => {
  Vue.component(component.name, component)
})
