<template>
  <div class="container close-publication">
    <div class="close" title="Fermer">
      <v-btn icon @click="close()"> <v-icon>mdi-close-box</v-icon></v-btn>
    </div>

    <div class="row bg-white">
      <h1 class="h5 text-center mt-2">Publication</h1>
      <div class="col"><hr /></div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-textarea
          :rules="[
            (v) => !!v || 'Ce champs est requis',
            (v) => v.length <= 70 || 'Max 70 characters',
          ]"
          label="Description"
          v-model="description"
          color="#5b25f5"
          counter
          required
        ></v-textarea>
        <v-file-input
          label="Avatar"
          placeholder="Ajouter une photo"
          accept="image/png, image/jpeg, image/bmp"
          :rules="[
            (value) =>
              !value ||
              value.size < 2000000 ||
              'Avatar size should be less than 2 MB!',
          ]"
          v-model="image"
          prepend-icon="mdi-camera"
          color="#5b25f5"
          show-size
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="#5b25f5" dark>
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
        <v-btn
          :disabled="!valid"
          :loading="loading"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Publiez
        </v-btn>
      </v-form>

      <small class="text-danger text-center d-block" v-show="messageError">
        {{ messageError }}</small
      >
    </div>
  </div>
</template>
<script>
import PublicationService from "../../service/publication";
export default {
  data: () => ({
    loading: false,
    valid: true,
    image: null,
    messageError: "",
    description: "Hello!",
  }),
  methods: {
    //revenir en arriére
    close() {
      return window.history.back();
    },
    //vider les variables qui stocke les données saisie par l'utilisateur
    clear() {
      this.image = null;
      this.description = "";
    },
    //ajouter la publication
    validate() {
      this.$refs.form.validate();
      //on attend que la validation soit true
      setTimeout(() => {
        // si true
        if (this.valid) {
          this.loading = true;
          // si la publication contient une image 
          if (this.image) {
            const FormData = require("form-data");
            let form = new FormData();
            form.append("file", this.image);
            form.append("content", this.description);
            return PublicationService.createPublication(form)
              .then(() => {
                //vide les variables de stockage
                this.clear();
              })
              .catch((error) => {
                this.messageError = error.response.data.error;
              })
              .finally(() => {
                this.loading = false;
                // revenir a l'acceuil
                this.close();
              });
          } else {
            let publication = {
              content: this.description,
            };
            return PublicationService.createPublicationText(publication)
              .then(() => {
                this.clear();
              })
              .catch((error) => {
                this.messageError = error.response.data.error;
              })
              .finally(() => {
                this.loading = false;
                this.close();
              });
          }
        }
      }, 10);
    },
  },
};
</script>
<style scoped>
h1 {
  color: #5b25f5;
}
.close-publication {
  position: relative;
}
.close {
  position: absolute;
  right: 2px;
  top: 15px;
}
</style>
