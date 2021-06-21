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
    <v-form @submit.prevent="login" 
    id="check-form" 
    ref="form"
    v-model="valid"
    lazy-validation
  >
      <v-card-text>
        Sign in with your username and password
          <v-text-field
            v-model="username"
            counter="25"
            label="Username"
            :rules="rulesUsername"  
          ></v-text-field>
            <v-text-field
            v-model="password"
            label="Password"
            :rules="rulesPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            hint="At least 7 characters"
            counter
            @click:append="show1 = !show1"
            hide-details="auto"
          >
          </v-text-field>
      </v-card-text>
    <v-card-actions>
    <v-btn 
      :disabled="!valid"
      type="submit"
      form="check-form"
      class="mx-auto"
      color="green accent-3 "
      width="140px"
      >
      <v-icon left>lock</v-icon>
      Submit</v-btn>
    </v-card-actions>
    </v-form>
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
      show1:false,
      password: '',
      error: '',
      valid: true,
      rulesUsername:[
          value => !!value || 'Please, enter a Username.',
          value => (value && value.length <26 ) || 'The username need less than 25 characters.',
          value => (value && value.length >=3) || 'The username needs at least 3 characters.'
      ],
      rulesPassword:[
          value => !!value || 'Please, enter a Password.',
          value => (value && value.length >=7) || 'The password needs at least 7 characters.'
      ],
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
      if(this.$refs.form.validate()){
        let user = {
          username: this.username,
          password: this.password,
        }
        this.axios.post('http://23.102.156.40:3000/api/users/login', user)
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
}
</script>
