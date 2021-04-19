<!--  Plantilla de ejemplo de comunicación con la BD-->
<template>
<div>
    <v-card-title>
      
      <v-spacer></v-spacer>

    </v-card-title>

    <v-data-table
    :headers="headers"
    :items="orders"
    :search="search"
    sort-by="sortBy.toLowerCase()"
    class="elevation-1"
  >
    
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Ordenes de compra</v-toolbar-title>
        <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>              
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <form @submit.prevent="addOrder">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.oc"
                       label="OC"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.promisedate"
                      label="Promise Date"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.forecast"
                      label="Forecast"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.estado"
                      label="Status"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.tipodespacho"
                      label="Shipment Type"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.guia"
                      label="Guide"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.comentario"
                      label="Commentary"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon
                color="red darken-4"
                text
                @click="close"
              >
               far fa-window-close
              </v-icon>
              <v-icon
                color="green darken-4"
                text
                @click="save"
              >
                far fa-check-square
              </v-icon>
            </v-card-actions>
            </form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-4" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="green darken-4" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
    <template v-slot:item.actions="{item}">
      <v-icon
        small
        color="green darken-1"
        class="mr-2"
        @click="editItem(item)"
      >
      fas fa-edit
      </v-icon>
      <v-icon
        small
        color="red darken-4"
        @click="deleteItem(item)"
      >
      fas fa-trash-alt
      </v-icon>
    </template>
    <template v-slot:item.alert="{ item }">
      <v-chip
        small       
        :color="getcolor(item.deliverydate)"
      >
        {{ daysAlert(item.deliverydate) }}
      </v-chip>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="getOrders"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  </div>
</template>
<script>
class Order {
  constructor(){
    this.tittle = '';
    this.description = '';    
  }
}
export default {
    data(){
      return{
        dialog: false,
        dialogDelete: false,
        search:'',
              
        headers: [
          { text: 'Actions', value: 'actions', align: 'start', sortable: false },
          {
            text: 'OC',
            value: 'oc',
          },
          { text: 'Position', value: 'position' },
          { text: 'Solped', value: 'solped' },
          { text: 'Project',value: 'proyecto' },
          { text: 'Document Date', value: 'documentdate' },
          { text: 'Supplier ', value: 'proveedor' },
          { text: 'Description',value: 'description' },
          { text: 'Due Date', value: 'deliverydate' },
          { text: 'Promise Date',value: 'promisedate' } ,
          { text: 'Forecast', filterable: false,value: 'forecast' },
          { text: 'Status', filterable: false,value: 'estado' },
          { text: 'Purchaser', filterable: false,value: 'comprador' },
          { text: 'Requested Amount', filterable: false,value: 'cantidadsolicitada' },
          { text: 'Delivered Amount', filterable: false,value: 'cantidadentregada' },
          { text: 'Missing Amount', filterable: false,value: 'cantidadfaltante' },
          { text: 'Alert', value: 'alert'},
          { text: 'Shipment Type', filterable: false,value: 'tipodespacho' },
          { text: 'Guide', filterable: false,value: 'guia' },
          { text: 'Commentary', value: 'comentario' },
        ],
        order: new Order(),
        orders: [],
        editedIndex: -1,
        editedItem: {
          oc: 0,
         position: 0,
          solped: '',
          proyecto: 0,
          documentdate: '',
          proveedor:'',
          description: '',
          deliverydate: '',
          promisedate: '',
          forecast: '',
          estado: '',
          comprador: '',
          cantidadsolicitada: 0,
          cantidadentregada: 0,
          cantidadfaltante: 0,     
          tipodespacho: '',
          guia: 0,
          comentario:'',
          alert: ''
        
        },
        defaultItem: {
          oc: 0,
          position: 0,
          solped: '',
          proyecto: 0,
          documentdate: '',
          proveedor:'',
          description: '',
          deliverydate: '',
          promisedate: '',
          forecast: '',
          estado: '',
          comprador: '',
          cantidadsolicitada: 0,
          cantidadentregada: 0,
          cantidadfaltante: 0,     
          tipodespacho: '',
          guia: 0,
          comentario:'',
          alert:''
        },
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.getOrders();
    },
    methods: {
      daysAlert(deliverydate){
        var timeStart = new Date();
        var timeEnd = new Date(deliverydate);
        var diff = timeEnd.getTime() - timeStart.getTime();
        var dias_restantes=Math.round(diff / (1000 * 60 * 60 * 24));
        return(dias_restantes-1)
      },
      async getOrders(){
        const res = await this.axios.get('http://localhost:3000/api/orders');
        console.log(res.data)
        this.orders = res.data
      },
      addOrder(){
        fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          body: JSON.stringify(this.order),
          headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
          }
        }).then(res => res.json())
        .then(() => {
        this.getOrders();
        })
        this.order = new Order();
      },
      deleteOrder(id){
        fetch('http://localhost:3000/api/orders/' + id, {
          method: 'DELETE',
          headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
          }
        })
        .then(res => res.json)
        .then(() => {
        this.getOrders();
        })
      },
      editOrder(){
        fetch('http://localhost:3000/api/orders/' + this.editedItem._id,{
          method: 'PUT',
          body: JSON.stringify(this.editedItem),
          headers: {
            'Accept':'aplication/json',
            'Content-type':'application/json' 
          }
        })
        .then(res => res.json)
        .then(() => {
          this.getOrders();
        })
      }
      ,
      editItem (item) {
        this.editedIndex = this.orders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.orders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.orders.splice(this.editedIndex, 1)
        this.deleteOrder(this.editedItem._id)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      getcolor (deliverydate){
        var quedandias = this.daysAlert(deliverydate)
        if (quedandias >= 0) return 'green accent-4'
        else if (quedandias < 0 & quedandias >= -7) return 'yellow accent-4'
        else if (quedandias < -7 & quedandias >= -15) return'orange darken-11'
        else if (quedandias < -15 & quedandias >= -30) return 'red lighten-1'
        else return 'red accent-4'

      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.orders[this.editedIndex], this.editedItem)
        } else {
          this.orders.push(this.editedItem)
        }
        this.editOrder()
        this.close()
      },
            

    }
  
  }

</script>