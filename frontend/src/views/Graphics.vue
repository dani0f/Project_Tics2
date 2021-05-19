
<template >
  <div>
    <template v-if="accessLevel == 1">USER
     <v-card
    class="mx-auto mt-4"
    min-width="400"
    max-width="900"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
        Graficos y estadisticas
        </div>
        <v-list-item-title class="headline mb-1">
          
          <v-row>
          <v-col>              
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
        <v-select
          :items="items"
          label="Suppliers"
          prepend-icon="fas fa-truck-loading"
        ></v-select>            

                <v-select
          :items="items"
          label="Projects"
          prepend-icon="fas fa-building"
        ></v-select>              
            
          </v-col>
          <v-col>
            KPI Performance gauge 
            <vue-gauge 
            :refid="'type-unique-id'"
            :options="{
            hasNeedle: true,
            'needleValue':75,//valor a la que apunta la flechita
            'arcDelimiters':[30,70],//separador de rangos
            'needleColor': 'black',//color de la flechita,
            needleUpdateSpeed: 500,
            arcColors: ['red','orange','rgb(0,255,0)'],//colores de los rangos
            rangeLabel: ['0', '100'],
            chartWidth: 400,
            }"
            >
            </vue-gauge>               
          </v-col> 
           </v-row>
                 
        </v-list-item-title>
        <v-list-item-subtitle>
        </v-list-item-subtitle>
      </v-list-item-content>




  
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        class="mx-auto"
      >
        Generate
      </v-btn>
    </v-card-actions>
  </v-card>
  </template>
  </div>
  
</template>

<script>
  import VueGauge from 'vue-gauge';
  import Cookies from "js-cookie";
  export default {
    components: { VueGauge },
    data(){
      return {
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      menu2: false,
      items: [
           "supplier 1","supplier 2"
      ],
      name: null,
      username: null,
      accessLevel: null
      }
    },
  computed: {
    userLogged() {
    return this.getUserLogged();
    },
  },
  async created() {
    if (typeof this.userLogged === 'undefined') {
      this.$router.push('/login');
    }
  },
    async mounted(){
    await fetch('http://localhost:3000/api/users/user', {
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
      if(this.accessLevel != 1){
        this.$router.push('/login');
        console.log("fuerita de aqui")
      }
      this.name = data.user.name;
      this.username = data.user.username
      this.excelData.userId = data.user._id
    });
  },  
   methods: {
    getUserLogged() {
      return Cookies.get("userLogged");
    }
  }
}
</script>

