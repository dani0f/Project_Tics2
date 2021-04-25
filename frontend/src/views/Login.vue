<template>
  <div>
    username: <input type="text" v-model="username"> <br/>
    password: <input type="password" v-model="password"> <br/>
    <button @click="login">login</button>
    {{ error }}
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
      this.axios.post('http://localhost:3000/api/users/login', user)
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