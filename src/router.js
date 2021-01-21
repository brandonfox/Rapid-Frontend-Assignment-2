import Vue from 'vue'
import Router from 'vue-router'
import Todo from './components/Todo'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:tab?',
      component: Todo,
      props: true
    },
  ]
})
