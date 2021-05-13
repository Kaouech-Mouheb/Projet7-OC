<template>
  <div class="img">
    <v-container>
      <div class="title-small-screen">
        <h2 class="text-center">Groupomania</h2>
      </div>
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="6" class="card">
          <div class="text-center">
            <h2 class="inscription">Inscription</h2>
          </div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Nom"
              prepend-icon="mdi-account"
              color="#5b25f5"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              prepend-icon="mdi-gmail"
              color="#5b25f5"
              required
            ></v-text-field>

            <div class="d-flex">
              <v-text-field
                :prepend-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show4 ? 'text' : 'password'"
                @click:prepend="show4 = !show4"
                v-model="password"
                :rules="passwordRules"
                label="Mot de passe"
                color="#5b25f5"
                required
              >
              </v-text-field>
            </div>

            <v-checkbox
              color="#5b25f5"
              v-model="checkbox"
              :rules="[(v) => !!v || 'Vous devez accepter pour continuer!']"
              label="Êtes-vous d'accord?"
              required
            ></v-checkbox>

            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Inscription
            </v-btn>
            <small
              class="text-danger text-center d-block"
              v-if="messageError"
              >{{ messageError }}</small
            >
            <div v-if="messageSuccess">
              <small class="text-success text-center">
                votre compte a été créé avec succès
              </small>
              <router-link to="/login">login</router-link>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "AppConnexion",
  data: () => ({
    valid: true,
    loading: false,
    show4: false,

    messageError: "",
    messageSuccess: "",
    name: "",
    nameRules: [
      (v) => !!v || "Le Nom est requis",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    email: "",
    emailRules: [
      (v) => !!v || "L'email est requis",
      (v) => /.+@.+\..+/.test(v) || "L'email doit être valide",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Le mot de passe est requis",
      (v) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
        "doit contenir au moins 8 des caractères dont une majuscule, une minuscule et un chiffre",
    ],

    checkbox: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();

      setTimeout(() => {
        if (this.valid) {
          this.loading = true;
          let user = {
            username: this.name,
            email: this.email,
            password: this.password,
          };
          this.$store
            .dispatch("auth/Register", user)
            .then(() => {
              this.messageSuccess = true;
            })
            .catch((error) => {
               this.loading = false;
              this.messageError = error.response.data.error;
            });
        }
      }, 10);
    },
  },
};
</script>
<style scoped>
.inscription {
  color: #5b25f5;
}
.title-small-screen {
  display: none;
}
@media (max-width: 576px) {
  .img {
    max-width: 98%;
    margin: 15px auto;
  }
  .title-small-screen {
    display: block;
  }
  .title-small-screen h2 {
    color: #5b25f5;
  }
}
@media (min-width: 900px) {
  .img {
    background-image: url("../../assets/groupomania.jpg");
    background-size: 100%;
    min-height: 510px;
  }
}
</style>
