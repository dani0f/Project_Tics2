<template>
    <nav >
        <v-navigation-drawer permanent dark app mini-variant class="red" v-if="accessLevel == 1 || accessLevel == 2" >
            <v-list tile >
                <v-list-item class="mb-8" router to="/">
                    <v-list-item-action>
                        <v-icon>fas fa-home</v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item class="mb-8" router to="/import" v-if="accessLevel == 1">
                    <v-list-item-action>
                        <v-icon>fas fa-file-import</v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item class="mb-8" router to="/orders" v-if="accessLevel == 1">
                    <v-list-item-action>
                        <v-icon>fas fa-database</v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item class="mb-8" router to="/graphics" v-if="accessLevel == 1">
                    <v-list-item-action>
                        <v-icon>fas fa-chart-line</v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item class="mb-8" router to="/users" v-if="accessLevel == 2"> 
                    <v-list-item-action>
                        <v-icon>fas fa-user</v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item class="mb-8">
                    <v-list-item-action >
                        <button @click="logout"><v-icon>fas fa-sign-out-alt</v-icon></button>
                    </v-list-item-action>
                </v-list-item>
                
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import Cookies from "js-cookie";
export default {
    data() {
        return {
            accessLevel: null
        }
    },
    computed: {
        userLogged() {
    return this.getUserLogged();
    },
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
        this.accessLevel = data.user.accessLevel
        });
  },  
  methods: {
    getUserLogged() {
      return Cookies.get("userLogged");
    },
    deleteUserLogged() {
      Cookies.remove('userLogged');
    },
    logout() {
      localStorage.clear();
      this.deleteUserLogged()
      this.$router.push('/login');
    }
  }
}
</script>