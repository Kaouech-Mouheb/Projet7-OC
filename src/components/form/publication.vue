<template>
  <div class="container close-publication">
    <div class="close" title="Fermer">
      <v-btn icon @click="close()"> <v-icon>mdi-close-box</v-icon></v-btn>
    </div>
    <div class="row bg-white">
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="col">
          <v-textarea
            :rules="[
              (v) => !!v || 'Ce champs est requis',
              (v) => v.length <= 25 || 'Max 25 characters',
            ]"
            counter
            placeholder="Ajouter une photo"
            label="Description"
            v-model="description"
            color="#5b25f5"
            required
          ></v-textarea>
        </div>

        <div class="col">
          <v-file-input
            :rules="rulesImg"
            v-model="image"
            placeholder="Ajouter une photo"
            label="Avatar"
            color="#5b25f5"
            show-size
            prepend-icon="mdi-camera"
          >
            <template v-slot:selection="{ text }">
              <v-chip small label color="primary">
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
        </div>
        <v-btn
          :disabled="!valid"
          :loading="loading"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Publiez
        </v-btn>

        <small class="text-danger text-center d-block" v-show="messageError">
          {{ messageError }}</small
        >
      </v-form>
    </div>
  </div>
</template>
<script>
import PublicationService from "../../service/publication";
export default {
  data: () => ({
    loading: false,
    valid: true,
    image: "",
    messageError: "",
    description: "Hello!",
    rulesImg: [
      (v) => !!v || "Ce champs est requis",
      (v) => v.size < 2000000 || "Avatar size should be less than 2 MB!",
    ],
  }),
  methods: {
    close() {
      return window.history.back();
    },
    clear() {
      this.image = "";
      this.description = "";
    },
    validate() {
      this.$refs.form.validate();
      setTimeout(() => {
        if (this.valid) {
          this.loading = true;
          const FormData = require("form-data");
          let form = new FormData();
          form.append("file", this.image);
          form.append("content", this.description);
          PublicationService.postPublication(form);
          this.clear();
          this.close();
        }
      }, 10);
    },
  },
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
