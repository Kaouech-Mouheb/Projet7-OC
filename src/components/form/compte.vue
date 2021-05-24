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
            v-model="menu1"
            :close-on-content-click="false"
            max-width="290"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="computedDateFormattedMomentjs"
                color="#5b25f5"
                clearable
                label="Date de naissance"
                readonly
                v-bind="attrs"
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @change="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-subheader>Biographie</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-textarea
            counter
            label="Bio"
            :rules="[(v) => v.length <= 70 || 'Max 70 characters']"
            v-model="infos.bio"
            color="#5b25f5"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            @click.prevent="updateProfil()"
            :loading="isLoading"
            color="success"
          >
            Validez
          </v-btn>
        </v-col>
      </v-row>
      <hr />
      <v-row>
        <v-col cols="4">
          <v-subheader>Avatar</v-subheader>
        </v-col>
        <v-col cols="8" class="text-center">
          <v-btn
            @click="updateAvatar = true"
            depressed
            color="primary"
            v-if="!updateAvatar"
          >
            Modifier
          </v-btn>
        </v-col>
        <v-col cols="8">
          <v-file-input
            v-if="updateAvatar"
            v-model="infos.avatar"
            @change="onFileChange"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            id="file"
            prepend-icon="mdi-camera"
            color="#5b25f5"
            label="Avatar"
          ></v-file-input>
        </v-col>
        <v-row>
          <v-col cols="4"></v-col>
          <v-col cols="8" class="text-center">
            <v-img
              :src="url || infos.avatar"
              lazy-src="https://picsum.photos/10/6?image"
              aspect-ratio="1"
              class="grey lighten-2 image-viewer mx-auto d-block"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4"></v-col>
          <v-col cols="8" class="text-center">
            <v-btn
              v-if="updateAvatar"
              depressed
              color="primary"
              @click.prevent="updateImage()"
              class="mr-4"
              :loading="isLoadingImage"
            >
              Changer
            </v-btn>
            <v-btn
              v-if="updateAvatar"
              depressed
              color="error"
              @click="updateAvatar = false"
              class="mt-2"
            >
              Annulez
            </v-btn>
          </v-col>
        </v-row>
        <div class="text-center" v-if="messageError">
          <small class="text-danger">{{ messageError }}</small>
        </div>
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
          <small class="d-block text-secondary">
            Admin : <span class="text-danger">Non </span></small
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
                  v-model="ancienPassword"
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
                  v-model="newPassword"
                  :rules="passwordRules"
                  label="Mot de passe"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-btn
              color="success"
              :rules="passwordRules"
              :disabled="!valid"
              :loading="isLoadingPassword"
              class="mr-4 mb-4"
              @click="updatePassword"
            >
              Validez
            </v-btn>
          </v-form>

          <div class="text-center" v-if="passwordMessageError">
            <small class="text-danger">
              {{ passwordMessageError }}
            </small>
          </div>
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
            :rules="passwordRules"
            :disabled="!valid"
            :loading="isLoadingDelete"
            class="mr-4 mb-4"
            @click="deleteAccompte"
          >
            Supprimer
          </v-btn>
        </v-form>
        <div v-if="deleteMessageError">
          <small class="text-danger">
            {{ deleteMessageError }}
          </small>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <small class="text-primary"> Devenir Administrateur </small>
          <v-btn
            @click="administrateur = administrateur ? false : true"
            text
            color="success"
            >{{
              (administrateurBtn = administrateur
                ? (administrateurBtn = "Annuler")
                : (administrateurBtn = "admin"))
            }}</v-btn
          >
          <div v-if="administrateur">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="4">
                  <small class="text-secondary">Entrée votre clé sucrét</small>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    color="#5b25f5"
                    v-model="cleAdministrateur"
                    label="Clé sucrét "
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-btn
                color="primary"
                :rules="passwordRules"
                :disabled="!valid"
                :loading="isLoadingAdministrateur"
                class="mr-4 mb-4"
                @click="addAdmin"
              >
                Validez
              </v-btn>
            </v-form>
            <div v-if="deleteMessageError">
              <small class="text-danger">
                {{ deleteMessageError }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
<script>
import moment from "moment";
import { format, parseISO } from "date-fns";
import AuthService from "../../service/auth";
export default {
  created() {
    this.user();
  },

  data: () => ({
    date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
    infos: {
      username: "",
      lastName: "",
      avatar: null,
      email: "",
      bio: "",
      isAdmin: false,
    },
    url: "",
    updateAvatar: false,
    isLoading: false,
    isLoadingImage: false,
    isLoadingPassword: false,
    isLoadingAdministrateur: false,
    supprimerCompte: false,
    isLoadingDelete: false,
    passwordModify: false,
    messageRedirection: false,
    passwordSupprimer: "",
    passwordMessageError: "",
    deleteMessageError: "",
    cleAdministrateur: "",
    menu1: false,
    show4: false,
    administrateur: false,
    administrateurBtn: "",
    passwordAdministrateur: "",
    modifierBtn: "",
    supprimerBtn: "",
    ancienPassword: "",
    newPassword: "",
    valid: true,
    messageError: false,

    passwordRules: [
      (v) => !!v || "Le mot de passe est requis",
      (v) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
        "doit contenir au moins 8 des caractères dont une majuscule, une minuscule et un chiffre",
    ],
    adminRules:[(v) => !!v || "Veuillez saisir votre clé sucrét"]
  }),

  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
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

  methods: {
    user() {
      this.infos.username = this.username;
      this.infos.email = this.email;
      this.infos.avatar =
        this.avatar || "//ssl.gstatic.com/accounts/ui/avatar_2x.png";
      this.infos.bio = this.bio || "";
      this.infos.lastName = this.lastName || "";
      this.date = this.birthday || "";
    },
    onFileChange() {
      this.url = URL.createObjectURL(this.infos.avatar);
    },
    updateProfil() {
      let infos = {
        username: this.infos.username,
        lastName: this.infos.lastName,
        email: this.infos.email,
        birthday: this.date,
        bio: this.infos.bio,
        isAdmin: this.infos.isAdmin,
      };
      this.isLoading = true;
      return this.$store
        .dispatch("auth/UpdateProfil", infos)
        .catch((error) => (this.messageError = error.response.data.error))
        .finally(() => (this.isLoading = false));
    },
    addAdmin(){
      let admin = {
        isAdmin: true
      }
      return AuthService.addAdmin(admin)
    },
    updateImage() {
      const formData = require("form-data");
      let form = new formData();
      form.append("file", this.infos.avatar);
      this.isLoading = true;
      return AuthService.updateImage(form)
        .catch((error) => (this.messageError = error.response.data.error))
        .finally(() => ((this.isLoading = false), (this.updateAvatar = false)));
    },
    updatePassword() {
      //vérifier les champs
      this.validate();
      //attends 10ms puis exécute ce morceaux de code
      setTimeout(() => {
        //si les champs sont valide exécute ce code
        if (this.valid) {
          this.isLoadingPassword = true;
          let password = {
            password: this.ancienPassword,
            newPassword: this.newPassword,
          };
          return AuthService.updatePassword(password)
            .then(() => {
              this.$store.dispatch("auth/Loggout");
              this.$router.push("/login");
            })
            .catch(
              (error) => (this.passwordMessageError = error.response.data.error)
            )
            .finally(() => (this.isLoadingPassword = false));
        }
      }, 10);
    },
    deleteAccompte() {
      this.validate();
      setTimeout(() => {
        if (this.valid) {
          this.isLoadingDelete = true;
          let password = {
            password: this.passwordSupprimer,
          };
          return AuthService.deleteUser(password)
            .then(() => {
              this.$store.dispatch("auth/Loggout");
              alert("Le compte est supprimé");
              this.$router.push("/login");
            })
            .catch((error) => {
              this.deleteMessageError = error.response.data.error;
            })
            .finally(() => (this.isLoadingDelete = false));
        }
      }, 10);
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
.image-viewer {
  height: 120px;
  width: 120px;
  border-radius: 50%;
  border: 2px solid gray;
  vertical-align: middle;
}
</style>
