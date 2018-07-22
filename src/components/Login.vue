<template>
  <div class="login">
    <h1>Vue School - Firebase Authentication</h1>
    <div v-if="authUser">
      <h2> Signed in as {{authUser.email}}</h2>
      <button @click="signOut">Sign Out</button>
    </div>
    
    <div v-else>
      <form @submit.prevent="register">

        <h2>Register</h2>
        <input type="email" v-model="email" placeholder="Type your email">
        <input type="password" v-model="password" placeholder="Type your password">
        <button>Register</button>

      </form>

        <form @submit.prevent="signIn">

          <h2>Sign In</h2>
          <input type="email" v-model="email" placeholder="Type your email">
          <input type="password" v-model="password" placeholder="Type your password">
          <button>Sign In</button>

        </form>
    </div>


  </div>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: "",
      authUser: null
    };
  },

  methods: {
    register() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .catch(error => alert(error.message))
    },

    signOut() {
      firebase.auth().signOut()
      .catch(error => alert(error.message))
    },

    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .catch(error => alert(error.message))
    }
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.authUser = user;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
