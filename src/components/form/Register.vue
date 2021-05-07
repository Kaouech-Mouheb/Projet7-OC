<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Nom"
            prepend-icon="mdi-account"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            prepend-icon="mdi-gmail"
            required
          ></v-text-field>

          <div class="d-flex">
            <a
              @click.prevent="
                inputType = inputType == 'password' ? 'text' : 'password'
              "
            >
              <v-icon class="mr-2 mt-4">mdi-eye-outline</v-icon>
            </a>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Mot de passe"
              :type="inputType"
              required
            >
            </v-text-field>
          </div>

          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'Vous devez accepter pour continuer!']"
            label="Êtes-vous d'accord?"
            required
          ></v-checkbox>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Inscription
          </v-btn>
          
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "AppConnexion",
  data: () => ({
    valid: true,
    inputType: "password",
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
    }
  },
};
</script>
