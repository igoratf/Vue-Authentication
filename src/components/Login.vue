<template>
  <div class="login">
    <h1>Vue School - Firebase Authentication</h1>
    <div v-if="authUser">
      <h2> Signed in as {{authUser.email}}
        <img v-if="linkedGoogle" src="https://www.gstatic.com/mobilesdk/160512_mobilesdk/auth_service_google.svg">
        <img v-if="linkedPassword" src="https://www.gstatic.com/mobilesdk/160409_mobilesdk/images/auth_service_email.svg">
      </h2>
      <img :src="authUser.photoURL" height="150">
      <p>Eae men {{authUser.displayName}}</p>
      <button @click="signOut">Sign Out</button>
      <button v-if="!linkedGoogle" @click="linkGoogle">Link Google Account</button>
      <button v-else @click="unlinkGoogle">Unlink Google Acoount</button>

      <form @submit.prevent="updateProfile">
        <h2>Update Profile </h2>
        <input v-model="displayName" placeholder="Your name">
        <input v-model="photoURL" placeholder="Your photo url">
        <button>Update</button>
      </form>

        <form @submit.prevent="updateEmail">
          <h2>Update Email </h2>
          <input v-model="email" placeholder="Your email">
          <button>Update</button>
      </form>

      <form @submit.prevent="updatePassword">
          <h2>Update Password </h2>
          <input type="password" v-model="newPassword" placeholder="Your new password">
          <button>Update</button>
      </form>
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

        <div>
          <h2>Sign in with Google</h2>
          <button @click="signInWithGoogle">Sign in</button>
        </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      email: '',
      password: '',
      authUser: null,
      displayName:null,
      photoURL: null,
      newPassword: ''
    }
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
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
      .catch(error => alert(error.message))
      .then(data => console.log(data.user, data.credential.accessToken))
    },
    linkGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      this.authUser.linkWithPopup(provider)
      .catch(error => alert(error.message))
      .then(data => console.log(data.user, data.credential.accessToken))
    },
    updateProfile() {
      this.authUser.updateProfile({
        displayName:this.displayName,
        photoURL: this.photoURL
      })
    },
    updateEmail() {
      this.authUser.updateEmail(this.email)
    },
    updatePassword() {
      this.authUser.updatePassword(this.newPassword)
      .then(() => this.newPassword = null)
      .catch(error => alert(error.message))
    },
    unlinkGoogle() {
      this.authUser.unlink('google.com')
    }
  },

  computed: {
    linkedGoogle() {
      return !!this.authUser.providerData.find(provider => provider.providerId === 'google.com')
    },
    linkedPassword() {
      return !!this.authUser.providerData.find(provider => provider.providerId === 'password')
    }
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.authUser = user
      if (user != null) {
        this.displayName = user.displayName
        this.photoURL = user.photoURL
        this.email = user.email 
      }
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
