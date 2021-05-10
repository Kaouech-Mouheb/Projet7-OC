<template>
  <div class="container close-publication">
      <div class="close" title="Fermer">
        <v-btn icon @click="close()"> <v-icon>mdi-close-box</v-icon></v-btn>
      </div>
    <div class="row bg-white">
      
      <div class="col">
        <v-textarea
          counter
          label="Dites quelque chose .."
          :rules="rules"
          prepend-icon="mdi-pencil-box-multiple-outline"
          :value="value"
          color="#5b25f5"
        ></v-textarea>

        <v-file-input
          :rules="rulesImg"
          show-size
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Ajouter une photo"
          prepend-icon="mdi-camera"
          label="Avatar"
          color="#5b25f5"
        ></v-file-input>
      </div>
      <div class="mb-4">
        <v-btn> Publiez </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    rulesImg: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
    rules: [(v) => v.length <= 25 || "Max 25 characters"],
    value: "Hello!",
  }),
  methods:{
      close(){
          return window.history.back()
      }
  }
};
</script>
<style scoped>
.close-publication {
  position: relative;
}
.close {
  position: absolute;
  right: 2px;
  top: 15px;
}
</style>
