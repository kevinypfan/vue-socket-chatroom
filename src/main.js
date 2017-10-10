import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io';
import moment from "moment";
import VueMomentJS from "vue-momentjs";
import router from './router'
import store from './store'

Vue.use(VueSocketio, 'http://localhost:8000', store);
Vue.use(VueMomentJS, moment);

router.beforeEach((to, from, next) => {
  var user = window.localStorage.getItem("user");

   if (to.matched.some(record => record.meta.requiresUser)) {
     if (!user) {
       next('/');
     } else {
       next();
     }
    } else {
      next();
    }
})

new Vue({
  el: '#app',
  store,
  router,
  created () {
    var user = JSON.parse(window.localStorage.getItem('user'))
    if (!user) {
      this.$router.push('/')
    } else {
      this.$socket.emit('join', user, (err) => {
        this.$store.commit('SET_USER',user)
        this.$router.push('/chat')
      })
    }
  },
  render: h => h(App)
})
