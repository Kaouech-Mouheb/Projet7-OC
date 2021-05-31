<template>
  <v-container fluid>
    <v-card>
      <v-img
        height="180px"
        src="../../assets/groupomania.jpg"
        gradient="to top right, rgba(100,115,201,.70),#5b25f5"
      >
        <v-card-title class="white--text mt-8">
          <v-col cols="4">
            <v-img
              :src="
                User.avatar || '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
              "
              lazy-src="https://picsum.photos/10/6?image"
              aspect-ratio="1"
              class="lighten-2 image-viewer-violet d-block"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <p class="ml-3 text-capitalize">
            {{ User.username }} {{ User.lastName }}
          </p>
        </v-card-title>
      </v-img>

      <v-card-text>
        <div class="font-weight-bold ml-8 mb-2">Infos</div>

        <v-timeline align-top dense>
          <v-timeline-item color="deep-purple lighten-1">
            <div>
              <div class="font-weight-normal">
                <strong class="text-capitalize"
                  >{{ User.username }} {{ User.lastName }}</strong
                >
              </div>
              <div v-if="User.birthday">{{ User.birthday }}</div>
              <div>{{ User.email }}</div>
              <div v-if="User.bio">
                <strong class="text-primary">A propos</strong>
                <small class="d-block">
                  {{ User.bio }}
                </small>
                <hr />
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
    <div class="row" v-if="isAdmin">
      <div class="col-md-2">
        <v-btn color="error" @click="supprimerCompte = true"> Supprimer </v-btn>
      </div>
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
    <v-row>
      <v-card>
        <v-card-text> Mes Publications </v-card-text>
      </v-card>
    </v-row>

    <div v-for="pub in this.Publications" :key="pub.id">
      <v-card class="mx-auto mt-4" v-if="pub.UserId == paramsId">
        <v-card-text class="card">
          <div class="row">
            <div class="col-md-2">
              <img
                :src="
                  pub.User.avatar ||
                  '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                "
                class="avatar"
                alt="Cinque Terre"
              />
            </div>
            <div class="col">
              <small class="text-capitalize"
                >{{ pub.User.username }} {{ pub.User.lastName }}</small
              >
              <small class="text-primary d-block"
                >Publié a
                {{ new Date(pub.createdAt).toLocaleTimeString() }}</small
              >
            </div>
          </div>
          <div
            @click="$router.push(`/publication/${pub.id}`)"
            class="content-publication"
            title="click"
          >
            <v-card-text>
              {{ pub.content }}
            </v-card-text>
            <v-img
              v-if="pub.attachment"
              height="250"
              :src="pub.attachment"
            ></v-img>
          </div>
          <v-card-actions class="content-notification">
            <div class="commentaire-titre">
              <small class="commentaire-icon">
                {{ pub.Comments.length }} (commentaires)
              </small>
              <v-icon> mdi-message-outline </v-icon>
            </div>
            <div>
              <small> {{ Likes(pub.Likes) }} (Likes) </small>
              <v-btn icon @click="liked(pub.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#646464"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                  />
                </svg>
              </v-btn>
            </div>
          </v-card-actions>
          <div class="commentaire">
            <small class="d-block">Toutes les commentaires ..</small>
            <div v-for="commentaire in pub.Comments" :key="commentaire.id">
              <div class="list-commentaire">
                <div>
                  <img
                    :src="
                      commentaire.avatar ||
                      '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                    "
                    alt=""
                    class="img-fluid avatar-commentaire"
                  />
                  <small class="username">{{ commentaire.username }}</small>
                </div>

                <div class="champs-commentaire">
                  <small class="">{{ commentaire.comment }}</small>
                  <v-btn
                    v-if="commentaire.UserId == UserId || isAdmin"
                    @click="
                      deleteCommit(commentaire.PublicationId, commentaire.id)
                    "
                    class="supprimer"
                    icon
                  >
                    <v-icon>mdi-trash-can-outline</v-icon></v-btn
                  >
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div class="row">
            <div class="text-center col-md-2">
              <img
                :src="
                  User.avatar || '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                "
                alt=""
                class="img-fluid avatar-commentaire"
              />
              <small class="text-capitalize d-block"
                >{{ User.username }} {{ User.lastName }}</small
              >
            </div>
            <div class="col">
              <v-text-field
                color="#5b25f5"
                append-outer-icon="mdi-send"
                @click:append-outer="
                  sendCommentaire(
                    pub.id,
                    User.avatar,
                    User.lastName,
                    User.username
                  )
                "
                :loading="commentaireLoading"
                counter="70"
                hint="Veuillez ne pas dépasser 70 characters"
                label="Ajouter un commentaire ..!"
                clearable
                :id="`commentaire${pub.id}`"
                maxlength="70"
                autocomplete="off"
              ></v-text-field>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import LikeService from "../../service/like";
import AuthService from "../../service/auth";
import CommentaireService from "../../service/commentaire";
export default {
  created() {
    this.getId();
  },
  data: () => ({
    valid: true,
    loading: false,
    show4: false,
    selection: 1,
    paramsId: null,
    supprimerCompte: false,
    isLoadingPassword: false,
    passwordSupprimer: "",
    messageCommentaire: "",
    commentaireLoading: false,
    isLoadingDelete: false,
    passwordRules: [
      (v) => !!v || "Le mot de passe est requis",
      (v) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
        "doit contenir au moins 8 des caractères dont une majuscule, une minuscule et un chiffre",
    ],
  }),
  computed: {
    UserId() {
      return JSON.parse(localStorage.getItem("user"));
    },
    User() {
      return this.$store.state.auth.userProfil;
    },
    Publications() {
      return this.$store.state.pub.publications;
    },
    isAdmin() {
      return this.$store.state.auth.user.isAdmin;
    },
  },
  methods: {
    //Ajouter un like
    liked(id) {
      let val = {
        like: 1,
      };
      LikeService.addLike(id, val)
        .then(() => {
          //lancer un rappel pour récupérer les mis à jour
          this.$nextTick(function () {
            this.$store.dispatch("pub/GetPublications");
          });
        })
        .catch((error) => console.log(error));
    },
    //afficher le nombre de likes sur chaque publication
    Likes(val) {
      let like = 0;
      val.map((el) => {
        like = like + el.like;
      });

      console.log(like);
      return like;
    },
    //récupérer l'identifiant utilisateur
    getId() {
      const url = window.location.pathname;
      const Id = url.split("/userAccount/")[1];
      console.log(url, Id);
      this.paramsId = Id;
    },
    //ajouter un commentaire
    sendCommentaire(id, avatar, lastName, username) {
      let commit = document.getElementById(`commentaire${id}`).value;
      let commentaire = {
        comment: commit,
        lastName: lastName,
        avatar: avatar,
        username: username,
      };
      //afficher un spinner sur le bouton d'envoi
      this.commentaireLoading = true;

      return CommentaireService.addCommentaire(id, commentaire)
        .then(() => {
          // lancer un rappel à la fonction getPublications pour mettre à jour le contenu aprés avoir ajouter un commentaire
          this.$nextTick(function () {
            this.$store.dispatch("pub/GetPublications");
          });
        })
        .catch((error) => {
          //afficher un message d'erreur
          this.messageCommentaire = error.response.data.error;
        })
        .finally(() => (this.commentaireLoading = false));
    },
    //supprimer un commentaire
    deleteCommit(paramsId, id) {
      let commentaire = {
        id: id,
      };
      return CommentaireService.delete(paramsId, commentaire)
        .then(() => {
          // lancer un rappel à la fonction getPublications pour mettre à jour le contenu aprés suppression
          this.$nextTick(function () {
            this.$store.dispatch("pub/GetPublications");
          });
        })
        .catch((error) => console.log(error.response.data.error));
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
          //récupérer l'identifiant utilisateur
          let id = this.paramsId;
          //supprimer l'utilisateur
          return AuthService.deleteUserByAdmin(password, id)
            .then(() => {
              alert("Le compte est supprimé");
              this.$router.push("/");
            })
            .catch((error) => {
              this.deleteMessageError = error.response.data.error;
            })
            .finally(() => (this.isLoadingDelete = false));
        }
      }, 10);
    },
    //vérifier les champs 'input'
    validate() {
      this.$refs.form.validate();
    },
  },

  name: "AppProfile",
};
</script>
<style scoped>
.image-viewer-violet {
  height: 72px;
  width: 72px;
  border-radius: 50%;
  vertical-align: middle;
  border: 2px solid#ffffff;
}
a {
  color: grey !important;
  text-decoration: none;
}
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.create-pub {
  padding-top: 17px;
  border-radius: 50px;
  background: #f8f8f8;
}
.content-notification {
  border-top: 2px solid rgb(206, 206, 206);
}
.content-publication {
  cursor: pointer;
  border-top: 2px solid rgb(206, 206, 206);
  margin-top: 7px;
}
.content-publication:hover {
  background: rgb(238, 238, 238, 0.2);
  color: black;
}
.supprimer-compte {
  position: fixed;
  top: 25%;
  z-index: 110;
  background: white;
  left: 25%;
  width: 50%;
  box-shadow: -9px 78px 3px 200px rgba(77, 77, 77, 0.75);
  -webkit-box-shadow: -9px 78px 3px 200px rgba(77, 77, 77, 0.75);
  -moz-box-shadow: -9px 78px 3px 200px rgba(77, 77, 77, 0.75);
}
.avatar-commentaire {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
}
.commentaire {
  max-height: 400px;
  overflow: auto;
}
.commentaire-titre {
  margin-right: 20px;
}
.champs-commentaire {
  height: 62px;
  overflow: auto;
  font-size: 0.9em;
  position: relative;
}
.supprimer {
  position: absolute;
  right: 5px;
  top: 5px;
}
.list-commentaire {
  width: 100%;
  padding: 2% 2% 0;
  display: flex;
  color: black;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 1em;
}
.commentaire {
  width: 100%;
  padding: 0 2%;
}

.champs-commentaire {
  background: rgb(240, 240, 240);
  width: 90%;
  color: rgb(58, 58, 58);
  margin-left: 5px;
  padding: 20px 5px 5px;
  border-radius: 1em;
}
.username {
  position: absolute;
  z-index: 100;
  font-weight: bold;
  left: 82px;
}

@media (max-width: 576px) {
  .mx-auto {
    max-width: 99%;
  }
  .commentaire {
    width: 100%;
    padding: 0 2%;
  }
  .list-commentaire {
    width: 100%;
    padding: 2% 2% 0;
    display: flex;
    position: rela;
  }
  .champs-commentaire {
    background: rgb(240, 240, 240);
    width: 80%;
    color: rgb(58, 58, 58);
    margin-left: 5px;
    padding-top: 20px;
    border-radius: 1em;
  }
  .username {
    position: absolute;
    z-index: 100;
    font-weight: bold;
    left: 72px;
  }
}
@media (min-width: 577px) {
  .list-commentaire {
    position: relative;
  }
  .username {
    position: absolute;
    left: 52px;
    top: 10px;
  }
}
</style>
