
<template>
  <v-card
    class="mx-auto"
    max-width="700"
    color="green darken-2"
    dark
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          Desde excell
        </div>
        <v-list-item-subtitle>Selecciona un archivo excell para importar los datos a la aplicación.</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
        <v-file-input
            show-size
            counter
            multiple
            label="File input"
        ></v-file-input>
    </v-card-actions>   
  </v-card>
</template>

<script>
  export default {}
</script>