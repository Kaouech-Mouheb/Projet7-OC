<template>
  <v-card width="374">
    <div class="p-2 d-flex">
      <div class="mr-4">
        <img
          src="https://via.placeholder.com/150"
          class="rounded-circle-user"
          alt="Cinque Terre"
        />
      </div>
      <div class="width-creer col">
        <v-btn icon @click="$router.push('/create-publication')">
          <v-icon color="primary">mdi-pencil-box-multiple-outline</v-icon>
        </v-btn>
        <small class="text-secondary"> Créer une publication ..</small>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
    name:"AppCreatePublication"
}
</script>
<style scoped>
.rounded-circle-user {
  border-radius: 50%;
  border: 2px solid grey;
  height: 46px;
  width: 36px;
  margin: 5px 10px 10px;
}
.width-creer {
  width: 220px !important;
  font-size: 0.9em;
  font-weight: bold;
}
</style>
