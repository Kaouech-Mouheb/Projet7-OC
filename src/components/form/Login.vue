<template>
  <div class="img">
    <v-container>
      <div class="title-small-screen">
        <h2 class="text-center">Groupomania</h2>
      </div>
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="6" class="card">
          <div class="text-center">
            <h2 class="connexion">Connexion</h2>
          </div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              color="#5b25f5"
              label="E-mail"
              prepend-icon="mdi-gmail"
              required
            ></v-text-field>

            <div class="d-flex">
              <v-text-field
                :prepend-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                color="#5b25f5"
                :type="show4 ? 'text' : 'password'"
                @click:prepend="show4 = !show4"
                v-model="password"
                :rules="passwordRules"
                label="Mot de passe"
                required
              >
              </v-text-field>
            </div>
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Connexion
            </v-btn>
            <small
              class="text-danger text-center d-block"
              v-show="messageError"
            >
              {{ messageError }}</small
            >
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "AppConnexion",
  created() {},
  data: () => ({
    loading: false,
    valid: true,
    messageError: "",
    show4: false,
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
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      setTimeout(() => {
        if (this.valid) {
          this.loading = true;
          let user = {
            email: this.email,
            password: this.password,
          };
          this.$store
            .dispatch("auth/Login", user)
            .then(() => {
              this.$router.push("/");
            })
            .catch((error) => {
              this.messageError = error.response.data.error;
            });
        }
      }, 10);
    },
  },
};
</script>
<style scoped>
.connexion {
  color: #5b25f5;
}
.title-small-screen {
  display: none;
}
@media (max-width: 899px) {
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
