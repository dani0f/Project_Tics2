<template>
  <div>
    <v-container>  
      <v-card class="p-2"
      >
         <v-parallax
    dark
    height="300"
    src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    >
    <v-card-title>
    <h1>Home</h1>  
    </v-card-title>
    <v-card-text >
      <h2 >Welcome {{ name }}!</h2>
    </v-card-text>
         </v-parallax>
    </v-card>  
    </v-container> 
    </div>
</template>
<script>

import Cookies from "js-cookie";
export default {
    data() {
      return {
        name: null,
        username: null,
        accessLevel: null
        }
    },
    computed: {
      userLogged() {
        return this.getUserLogged();
        },
      Home() {
        return this.$route.name === 'Home'
  }
    }
    ,
    created() {
      //user is not authorized
      console.log(this.userLogged)
      if (typeof this.userLogged === 'undefined') {
        this.$router.push('/login');
      }
    },
    async mounted(){
      await fetch('http://52.87.232.237:3000/api/users/user', {
        method: 'GET',
         headers: {
            'Accept' : 'application/json',
            'Content-type':'application/json',
            token : this.getUserLogged()
            }
      })
      .then(res => res.json())
      .then(data => {
      this.name = data.user.name;
      this.username = data.user.username
      this.accessLevel = data.user.accessLevel
      });
    }
    ,
  methods:{
    getUserLogged() {
      return Cookies.get("userLogged");
    },
  }
};
</script>