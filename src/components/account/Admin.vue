<template>
  <div class="container">
    <div class="row bg-white shadow-sm p-3 mb-5 rounded">
      <h1 class="text-primary text-center h3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          fill="#1565C0"
          class="bi bi-speedometer2"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"
          />
          <path
            fill-rule="evenodd"
            d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
          />
        </svg>
        Dashboard
      </h1>
      <hr />
      <div class="col-md-6 col-lg-3">
        <h3 class="h4 text-utilisateur">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#1976D2"
            class="bi bi-people-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
            />
            <path
              fill-rule="evenodd"
              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
            />
            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          </svg>
          Utilisateurs ( {{ users.length }} )
        </h3>
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
              <th scope="col">Admin</th>
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
              <td :class="user.isAdmin ? 'text-success' : ''">
                {{ user.isAdmin }}
              </td>
              <td>
                <v-btn
                  class="supprimer"
                  icon
                  @click="(supprimerCompte = true), (userId = user.id)"
                >
                  <v-icon color="error">mdi-trash-can-outline</v-icon></v-btn
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
        <h2 class="h4 text-publication">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#7b1fa2"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
          Publications ( {{ publications.length }} )
        </h2>
        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Utilisateur</th>
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
                  <v-icon color="error">mdi-trash-can-outline</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h2 class="h4 text-commentaire">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#3949AB"
            class="bi bi-chat-text"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
            />
            <path
              d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          Commentaire
        </h2>

        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Contenu</th>
              <th scope="col" title="publication id">P.Id</th>

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
              <td class="text-secondary">{{ commit.PublicationId }}</td>
              <td>
                <v-btn
                  class="supprimer"
                  icon
                  @click="deleteCommit(commit.PublicationId, commit.id)"
                >
                  <v-icon color="error">mdi-trash-can-outline</v-icon></v-btn
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
    User() {
      return this.$store.state.auth.user;
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
              if (this.User.id == id) {
                this.$router.push("/");
              }
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
.bi-pencil-square {
  background: #7b1fa221;
  padding: 2px;
  border-radius: 0.25rem;
}
.text-publication {
  color: #7b1fa2;
}
.bi-chat-text {
  background: #3948ab15;
  padding: 2px;
  border-radius: 0.25rem;
}
.text-commentaire {
  color: #3949ab;
}
.text-utilisateur {
  color: #1976d2;
}
.bi-people-fill {
  background: #1976d225;
  padding: 2px;
  border-radius: 0.25rem;
}
</style>
