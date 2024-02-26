import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
    { 
      path: '/', 
      component: {
          template: `
          <div>
              <h2>Main page</h2>
              <p>Это главная страница с прямым HTML контентом.</p>
          </div>
          `
      }
    },
    { 
      path: '/about', 
      component: {
          template: `
          <div>
              <h2>About Page</h2>
              <p>Это страница О нас с прямым HTML контентом.</p>
          </div>
          `
      }
    }
  ]

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router
