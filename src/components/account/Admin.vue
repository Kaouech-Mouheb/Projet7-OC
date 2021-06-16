<template>
  <div class="container">
    <div class="row bg-white shadow-sm p-3 mb-5 rounded">
      <h1 class="text-primary text-center h3">Dashboard</h1>
      <div class="col-md-3">
        <h3 class="h4 text-secondary">Toutes les utlisateurs</h3>
        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th
                scope="col"
                class="text-secondary text-capitalize user"
                @click="getAccount(user.id)"
              >
                Nom d'utilisateur
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="user in users" :key="user.id">
            <tr>
              <th scope="row">{{ user.id }}</th>
              <td
                class="text-secondary text-capitalize user"
                @click="getAccount(user.id)"
              >
                {{ user.username }} {{ user.lastName }}
              </td>

              <td>
                <v-btn
                  class="supprimer"
                  icon
                  @click="(supprimerCompte = true), (userId = user.id)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--supprimer votre compte -->
      <v-row class="supprimer-compte" v-if="supprimerCompte">
        <v-btn icon @click="supprimerCompte = supprimerCompte ? false : true">
          <v-icon color="error">mdi-close-box</v-icon></v-btn
        >
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
            @click="deleteAccompte()"
          >
            Supprimer
          </v-btn>
        </v-form>
      </v-row>
      <div class="col">
        <h2 class="h4 text-secondary">Publication</h2>
        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nom d'utilisateur</th>
              <th scope="col">Contenu</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="pub in publications" :key="pub.id">
            <tr>
              <th scope="row">{{ pub.id }}</th>
              <td
                class="text-secondary text-capitalize user"
                @click="getAccount(pub.User.id)"
              >
                {{ pub.User.username }} {{ pub.User.lastName }}
              </td>
              <td class="text-secondary">{{ pub.content }}</td>
              <td>
                <v-btn
                  class="supprimer"
                  icon
                  @click="deletePublication(pub.id)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
        <h2 class="h4 text-secondary">Commentaire</h2>

        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nom d'utilisateur</th>
              <th scope="col">Contenu</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="pub in publications" :key="pub.id">
            <tr v-for="commit in pub.Comments" :key="commit.id">
              <th scope="row">{{ commit.id }}</th>
              <td
                class="text-secondary text-capitalize user"
                @click="getAccount(commit.UserId)"
              >
                {{ commit.username }} {{ commit.lastName }}
              </td>
              <td class="text-secondary">{{ commit.comment }}</td>
              <td>
                <v-btn
                  class="supprimer"
                  icon
                  @click="deleteCommit(commit.PublicationId, commit.id)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import CommentaireService from "../../service/commentaire";
import PublicationService from "../../service/publication";
import AuthService from "../../service/auth";
export default {
  name: "AppAdmin",
  created() {
    this.getAllUser();
  },
  data: () => ({
    valid: true,
    show4: false,
    passwordSupprimer: "",
    userId: null,
    users: "",
    isLoadingDelete: false,
    supprimerCompte: false,
    passwordRules: [
      (v) => !!v || "Le mot de passe est requis",
      (v) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
        "doit contenir au moins 8 des caractères dont une majuscule, une minuscule et un chiffre",
    ],
  }),
  computed: {
    publications() {
      return this.$store.state.pub.publications;
    },
  },
  methods: {
    //supprimer un commentaire
    deleteCommit(paramsId, id) {
      //identifier le commentaire par son id
      let commentaire = {
        id: id,
      };
      //paramsId = PublicationId
      return CommentaireService.delete(paramsId, commentaire)
        .then(() => {
          // lancer un rappel à la fonction getPublications pour mettre à jour le contenu aprés suppression
          this.$nextTick(function () {
            this.$store.dispatch("pub/GetPublications");
          });
        })
        .catch((error) => console.log(error.response.data.error));
    },
    deletePublication(publicationId) {
      return PublicationService.delete(publicationId)
        .then(() => {
          this.$nextTick(function () {
            this.$store.dispatch("pub/GetPublications");
          });
        })
        .catch((error) => (this.messageError = error.response.data.error))
        .finally(() => (this.isLoadingDelete = false));
    },
    getAccount(id) {
      return this.$store
        .dispatch("auth/GetUserById", id)
        .then(() => this.$router.push(`/userAccount/${id}`))
        .catch((error) => console.log(error));
    },
    getAllUser() {
      //récupérer les données de l 'api
      return AuthService.getUsers()
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => console.log(error));
    },
    //vérifier les champs 'input'
    validate() {
      this.$refs.form.validate();
    },
    //supprimer le compte
    deleteAccompte() {
      this.validate();
      //patientez jusqu'a que la function validate soit remplie
      setTimeout(() => {
        if (this.valid) {
          this.isLoadingDelete = true;
          let password = {
            password: this.passwordSupprimer,
          };
          let id = this.userId;
          //supprimer l'utilisateur
          return AuthService.deleteUserByAdmin(password, id)
            .then(() => {
              this.$nextTick(function () {
                this.$store.dispatch("pub/GetPublications");
                //récupérer les données de l 'api
                return AuthService.getUsers()
                  .then((res) => {
                    this.users = res.data;
                  })
                  .catch((error) => console.log(error));
              });
            })
            .catch((error) => {
              alert(
                `Le compte n'est pas supprimé : ${error.response.data.error}`
              );
            })
            .finally(
              () => (this.isLoadingDelete = false),
              (this.supprimerCompte = false)
            );
        }
      }, 10);
    },
  },
};
</script>
<style>
.user {
  cursor: pointer;
}
.user:hover {
  color: black;
  background: rgb(228, 228, 228);
}
.supprimer-compte {
  position: fixed;
  top: 25%;
  z-index: 110;
  background: white;
  padding: 10%;
  width: 90%;
  box-shadow: -9px 78px 3px 200px rgba(77, 77, 77, 0.75);
  -webkit-box-shadow: -9px 78px 3px 200px rgba(77, 77, 77, 0.75);
  -moz-box-shadow: -9px 78px 3px 200px rgba(77, 77, 77, 0.75);
}
</style>
