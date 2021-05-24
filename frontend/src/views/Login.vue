<template>
  <div>
    <v-main>
    <v-card width="500px"
     class="mx-auto m-4 p-3" 
     >
      <v-card-title>
        <h3>Sigdo Kopper</h3>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        Sign in with your username and password
          <v-text-field
            v-model="username"
            counter="25"
            label="username"
          ></v-text-field>
            <v-text-field
            v-model="password"
            counter="25"
            label="password"
            type="password"
          ></v-text-field>
      </v-card-text>
    <v-card-actions>
    <v-btn 
      class="mx-auto"
      color="green accent-3 "
      width="140px"
      @click="login">
      <v-icon left>lock</v-icon>
      Submit</v-btn>
    </v-card-actions>
    <p class="text-center text-danger">{{ error }}  </p>     
    </v-card>
    </v-main>
  </div>
</template>
<script>

import Cookies from "js-cookie";

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  computed: {
    userLogged() {
      return this.getUserLogged();
    },
  },
  async created() {
    if (typeof this.userLogged != 'undefined') {
      this.$router.push('/');
    }
  }, 
  methods: {
    setUserLogged(userLogged) {
      Cookies.set("userLogged", userLogged);
    },
    getUserLogged() {
      return Cookies.get("userLogged");
    },
    login() {
      let user = {
        username: this.username,
        password: this.password
      }
      this.axios.post('http://52.87.232.237:3000/api/users/login', user)
        .then(res => {
          //if successfull
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            const user = res.data.token
            this.setUserLogged(user);
            this.$router.push("/");
          }
        }, err => {
          console.log(err.response);
          this.error = err.response.data.error
        })
    }
  }
}
</script>