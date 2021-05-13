<template>
  <v-container fluid>
    <v-card class="container">
      <div class="close" title="Fermer">
        <v-btn icon @click="close()"> <v-icon>mdi-close-box</v-icon></v-btn>
      </div>
      <v-row>
        <v-col cols="4">
          <v-subheader>Nom</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="infos.username"
            label="Nom"
            color="#5b25f5"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader>Prénom</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="infos.lastName"
            label="Prénom"
            color="#5b25f5"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader>Email</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="infos.email"
            label="Email address"
            color="#5b25f5"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-subheader>Date naissance</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="infos.date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
          <p>
            Date in ISO format: <strong>{{ infos.date }}</strong>
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-subheader>Avatar</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-file-input
            v-model="infos.avatar"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            color="#5b25f5"
            label="Avatar"
          ></v-file-input>
        </v-col>
        <v-btn @click="updateProfil()" :loading="isLoading"> Validez </v-btn>
      </v-row>
      <hr />
      <v-row>
        <v-banner two-line>
          <v-avatar slot="icon" color="deep-purple accent-4" size="40">
            <v-icon icon="mdi-lock" color="white"> mdi-lock </v-icon>
          </v-avatar>
          <small class="d-block text-secondary"> password: ********* </small>
          <small class="d-block text-secondary">
            Compte : <span class="text-danger">supprimer </span></small
          >
          <template v-slot:actions>
            <v-btn
              @click="passwordModify = passwordModify ? false : true"
              text
              color="deep-purple accent-4"
              >{{
                (modifierBtn = passwordModify
                  ? (modifierBtn = "Annuler")
                  : (modifierBtn = "Modifier"))
              }}</v-btn
            >
            <v-btn
              @click="supprimerCompte = supprimerCompte ? false : true"
              text
              class="text-danger"
              >{{
                (supprimerBtn = supprimerCompte
                  ? (supprimerBtn = "Annuler")
                  : (supprimerBtn = "supprimer"))
              }}</v-btn
            >
          </template>
        </v-banner>
      </v-row>
      <div v-if="passwordModify">
        <v-row>
          <v-card-text class="text-center" style="color: #5b25f5">
            Changer le mot de passe
          </v-card-text>
        </v-row>

        <v-row>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="4">
                <v-subheader>Ancien mot de passe</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  color="#5b25f5"
                  :prepend-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show4 ? 'text' : 'password'"
                  @click:prepend="show4 = !show4"
                  v-model="password"
                  :rules="passwordRules"
                  label="Mot de passe"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>Nouveaux mot de passe</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  color="#5b25f5"
                  :prepend-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show4 ? 'text' : 'password'"
                  @click:prepend="show4 = !show4"
                  v-model="password"
                  :rules="passwordRules"
                  label="Mot de passe"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-btn
              color="green"
              :disabled="!valid"
              class="mr-4 mb-4"
              @click="validate"
            >
              Validez
            </v-btn>
          </v-form>
        </v-row>
        <hr />
      </div>

      <div v-if="supprimerCompte">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="4">
              <small class="text-secondary"
                >Entrée votre mot de passe pour validez</small
              >
            </v-col>
            <v-col cols="8">
              <v-text-field
                color="#5b25f5"
                :prepend-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show4 ? 'text' : 'password'"
                @click:prepend="show4 = !show4"
                v-model="passwordSupprimer"
                :rules="passwordRules"
                label="Mot de passe"
                required
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-btn
            color="error"
            :disabled="!valid"
            class="mr-4 mb-4"
            @click="validate"
          >
            Validez
          </v-btn>
        </v-form>
      </div>
    </v-card>
  </v-container>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("auth/GetOneUser");
    setTimeout(() => {
      this.user();
    }, 10);
  },

  data: (vm) => ({
    date: new Date("2013/12/02").toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date("2013/12/02").toISOString().substr(0, 10)
    ),
    infos: {
      username: "",
      lastName: "",
      avatar: null,
      email: "",
      bio:"",
      isAdmin:false,
      date: "",
    },
    isLoading: false,
    supprimerCompte: false,
    passwordModify: false,
    passwordSupprimer: "",
    menu1: false,
    show4: false,
    modifierBtn: "",
    supprimerBtn: "",
    password: "",
    valid: true,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
    passwordRules: [
      (v) => !!v || "Le mot de passe est requis",
      (v) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
        "doit contenir au moins 8 des caractères dont une majuscule, une minuscule et un chiffre",
    ],
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    username() {
      return this.$store.state.auth.user.username;
    },
    lastName() {
      return this.$store.state.auth.user.lastName;
    },
    email() {
      return this.$store.state.auth.user.email;
    },
    birthday() {
      return this.$store.state.auth.user.birthday;
    },
    bio() {
      return this.$store.state.auth.user.bio;
    },
    avatar() {
      return this.$store.state.auth.user.avatar;
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.infos.date);
    },
  },

  methods: {
    user() {
      this.infos.username = this.username;
      this.infos.email = this.email;
      this.infos.avatar = this.avatar || null;
      this.infos.bio = this.bio || ""
      this.infos.lastName = this.lastName || "";
      this.infos.date = new Date(this.birthday || "01/12/1900")
        .toISOString()
        .substr(0, 10);
    },
    updateProfil() {
      const formData = require('form-data');
      let form = new formData();
      form.append('file', this.infos.avatar);
      form.append('username', this.infos.username);
      form.append('lastName', this.infos.lastName);
      form.append('email', this.infos.email);
      form.append('birthday', this.infos.birthday);
      form.append('bio', this.infos.bio);
      form.append('isAdmin', this.infos.isAdmin);

      this.isLoading = true;
      return this.$store
        .dispatch("auth/UpdateProfil", form)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => (this.messageError = error.response.data.error))
        .finally(() => (this.isLoading = false));
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    validate() {
      this.$refs.form.validate();
    },
    close() {
      return window.history.back();
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
