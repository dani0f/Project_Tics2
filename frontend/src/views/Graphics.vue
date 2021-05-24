
<template >
  <div>
    <template v-if="accessLevel == 1">
     <v-card
    class="mx-auto mt-4"
    min-width="400"
    max-width="900"
    outlined
  >
  <v-form @submit.prevent="generate" id="check-form" ref="form">
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
            label="Date"
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
          :items="suppliers"
          v-model="suplier"
          label="Supplier"
          prepend-icon="fas fa-truck-loading"
        ></v-select>            

                <v-select
          :items="projects"
          label="Project"
          v-model="project"
          prepend-icon="fas fa-building"
        ></v-select>              
           
          </v-col>
          <v-col>
            KPI Performance gauge 
            <vue-gauge 
            :key="kpi"
            :refid="'type-unique-id'"
            :options="{
            hasNeedle: true,
            'needleValue': kpi,//valor a la que apunta la flechita
            'arcDelimiters':[30,70],//separador de rangos
            'needleColor': 'black',//color de la flechita,
            needleUpdateSpeed: 400,
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
        type="submit"
        form="check-form"
        outlined
        rounded
        text
        class="mx-auto"
      >
        Generate
      </v-btn>
    </v-card-actions>
    </v-form>
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
      suplier: "",
      project: "",
      modal: false,
      menu2: false,
      suppliers: null,
      projects: null,
      kpi:0,
      items: [
           "supplier 1","supplier 2"
      ],
      name: null,
      username: null,
      userId:null,
      accessLevel: null,
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
      this.username = data.user.username,
      this.userId = data.user._id,
      this.getSupliers()
    });
  },  
   methods: {
    getUserLogged() {
      return Cookies.get("userLogged");
    },      
    daysAlert(deliverydate){
        var timeStart = new Date();

        var timeEnd = new Date(deliverydate);
        console.log(timeStart,timeEnd,deliverydate,typeof(deliverydate))
        var diff = timeEnd.getTime() - timeStart.getTime();
        console.log(diff,"DIFF")
        var dias_restantes=Math.round(diff / (1000 * 60 * 60 * 24));
        return(dias_restantes-1)
    },
    async getSupliers()  {
      const res = await this.axios.get('http://localhost:3000/api/orders/suppliers', {
        headers: {
                  'Accept' : 'application/json',
                  'Content-type':'application/json',
                  user: this.userId
        }
    })
    this.suppliers = res.data.suppliers
    this.projects = res.data.projects
    console.log(this.suppliers)
    console.log(this.projects)
    console.log(this.items)
    },
    async generate(){
      console.log(this.suplier)
      console.log(this.date)
      console.log(this.project)
      var query={
        suplier: this.suplier,
        date: this.date,
        project: this.project
      }
      var res = await fetch('http://localhost:3000/api/orders/kpi', {
          method: 'POST',
          body: JSON.stringify(query),
          headers:{
            'Accept':'application/json',
            'Content-type':'application/json',
            user: this.userId
          }
        }).then(res => res.json())
      console.log(res)
      var sum = 0
      var totalSum=0
      var alert = 0


      res.forEach(data => {
        alert = this.daysAlert(data.deliverydate) //falta restarle 7 dias
        if(alert < 0){
          sum=0
        }
        if(alert >= 0){
          sum = 100
        }
        console.log(alert)
        console.log(sum)
        totalSum = totalSum + sum
      });
      
      var kpi= totalSum / res.length
      console.log("KPI")
      console.log(kpi)
      this.kpi = kpi
    }
  }
}
</script>

