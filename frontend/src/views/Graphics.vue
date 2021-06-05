
<template >
  <div>
    <template v-if="accessLevel == 1">
      <div>
<v-alert
      v-if="alert == true"
      text
      type="info"
      class="m-2"
      color="info"
      elevation="2"
      transition="scroll-x-transition"
    >
      <h3 class="text-h5">
        No matches found
      </h3>
      <v-row
        align="center"
        no-gutters
      >
        <v-col class="grow">
             We cannot find orders with these parameters or they are incomplete remember to fill in the <strong>shipping date</strong> in the order table
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="shrink">
          <v-btn
            color="info"
            outlined
            @click="alert=false"
          >
            Okay
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
     <v-card
    class="mx-auto mt-4"
    min-width="400"
    max-width="50%"
    outlined
  >
  <v-form @submit.prevent="generate" 
    id="check-form" 
    ref="form"
    v-model="valid"
    lazy-validation
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
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="initialDate"
            label="Initial date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            :rules="dateRules"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="initialDate"
          @input="menu1 = false"
        ></v-date-picker>
      </v-menu>
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
            label="Final date"
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
          :rules="[v => !!v || 'Item is required']"
          required
        ></v-select>            

        <v-select
          :items="projects"
          label="Project"
          v-model="project"
          prepend-icon="fas fa-building"
          :rules="[v => !!v || 'Item is required']"
          required
        ></v-select>              
           
          </v-col>

          <v-col class="text-center">
            KPI Performance gauge <span
            class="display-2 font-weight-black"
            :key="kpi"
            v-text=kpi
          ></span> %
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
        :disabled="!valid"
        type="submit"
        form="check-form"
        outlined
        rounded
        text
        color="info"
        class="mx-auto"
      >
        Generate
      </v-btn>
    </v-card-actions>
    </v-form> 
   <template v-if="boolKpi == 1">
    <v-container fluid>
      <v-divider></v-divider> 
       <div aling="end" class="caption grey--text text-uppercase ">
         Graphic for orders
       </div>
   <div>
  <div>
  </div>
  </div>
    <v-sparkline
      :gradient="selectedGradient"
      :line-width="width"
      :padding="padding"
      :smooth="radius || false"
      :value="array"
      :labels="array"
      :stroke-linecap="lineCap"
      :gradient-direction="top"
      :type="trend"
      auto-draw
    ></v-sparkline>


  
  </v-container>
  </template>

  </v-card>    
 
  </template>

  </div>
  
</template>

<script>
  import VueGauge from 'vue-gauge';
  import Cookies from "js-cookie";
   const gradients = [
    
  ]
  export default {
    components: { VueGauge },
    data(){
      return {
      valid: true,
      dateRules: [
        v => !!v || 'Date is required',
        v => (v < this.date) || 'Inital date must be before final date',
      ],
      fill: false,
      selectedGradient:['#1feaea', '#ffd200','#f72047' ],
      gradients,
      padding: 8,
      radius: 10,
      labels: [100,80,50,100],
      value: [100,80,50,100],
      array: [],
      width: 2,
      date: new Date().toISOString().substr(0, 10),
      initialDate: new Date("2021-01-01").toISOString().substr(0, 10) ,
      suplier: "",
      project: "",
      menu2: false,
      menu1: false,
      counter: "-",
      alert: false,
      suppliers: null,
      projects: null,
      kpi:0,
      boolKpi: 0,
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
    daysAlert(deliverydate,fechadespacho){
        var timeStart = new Date(fechadespacho);
        var timeEnd = new Date(deliverydate);
        var diff = timeEnd.getTime() - timeStart.getTime();
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
    },
    async generate(){
      if(this.$refs.form.validate()){
        var query={
          suplier: this.suplier,
          initialDate: this.initialDate,
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
        var sum = 0
        var totalSum=0
        var alert = 0
        var counter = 0
        this.array = []
        res.forEach(data => {
          if(data.deliverydate != null && data.fechadespacho != null){
            alert = this.daysAlert(data.deliverydate,data.fechadespacho) //falta restarle 7 dias
            counter=counter+1
            if(alert < 0){
              sum=0
            }
            if(alert >= 0){
              sum = 100
            }
            totalSum = totalSum + sum
            this.array.push(Math.round(totalSum/counter))          
          }
        }); //hacer q no cuente los vacios
        if(counter > 0){
          this.kpi= Math.round(totalSum / counter)
          this.boolKpi=1
          this.alert=false
        }
        else{
          this.kpi= 0
          this.boolKpi=0
          this.alert=true
        }
      }
    }
  }
}
//348 393
</script>

