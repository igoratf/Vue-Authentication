import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBBglzT6ZZZh9OD-WSFIwSGOmeD2xTfb5Y",
  authDomain: "vueschool-auth.firebaseapp.com",
  databaseURL: "https://vueschool-auth.firebaseio.com",
  projectId: "vueschool-auth",
  storageBucket: "vueschool-auth.appspot.com",
  messagingSenderId: "877758973636"
};
firebase.initializeApp(config);

new Vue({
  render: h => h(App)
}).$mount('#app')



