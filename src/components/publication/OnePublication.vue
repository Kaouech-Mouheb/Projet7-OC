<template>
  <div class="container container-pub mt-2 mb-4">
    <div class="close" title="Fermer">
      <v-btn icon @click="close()">
        <v-icon color="error">mdi-close-box</v-icon></v-btn
      >
    </div>
    <div class="row" v-for="pub in Publications" :key="pub.id">
      <div class="col-md-7 card card-height" v-if="pub.id == paramsId">
        <div class="bg-dark p-4" v-if="pub.attachment">
          <img class="mx-auto d-block img-fluid" :src="pub.attachment" />
        </div>

        <div class="card-body">
          <div class="card-text">
            <small>
              {{ pub.content }}
            </small>
          </div>
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
      </div>
      <div class="col-md-5 card" v-if="pub.id == paramsId">
        <div>
          <div class="m-2">
            <img
              :src="
                pub.User.avatar || '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
              "
              class="avatar"
              alt=""
            />
            <small class="text-secondary ml-2 text-capitalize"
              >{{ pub.User.username }} {{ pub.User.lastName }}</small
            >
            <small class="text-primary d-block"
              >Publié a
              {{ new Date(pub.createdAt).toLocaleTimeString() }}</small
            >
          </div>
          <hr />
          <div v-if="pub.UserId == UserId || isAdmin">
            <v-btn
              color="#b69efa"
              dark
              @click="updatePublication = updatePublication ? false : true"
            >
              <span v-if="updatePublication">Annulez</span>
              <span v-else>Modifier</span>
            </v-btn>
            <v-btn
              color="error"
              class="ml-2"
              :loading="isLoadingDelete"
              dark
              @click="deletePublication()"
            >
              Supprimer
            </v-btn>
            <v-textarea
              v-if="updatePublication"
              counter
              label="Description"
              :rules="[(v) => v.length <= 70 || 'Max 70 characters']"
              v-model="description"
              color="#5b25f5"
            ></v-textarea>
            <v-btn
              color="success"
              :loading="isLoading"
              v-if="updatePublication"
              @click="updatePublications()"
            >
              validez
            </v-btn>
            <small v-if="messageSuccess" class="text-success d-block mt-2">
              Publication modifié ..!
            </small>
            <small class="text-danger" v-if="messageError">
              {{ messageError }}
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LikeService from "../../service/like";
import PublicationService from "../../service/publication";
import CommentaireService from "../../service/commentaire";
export default {
  name: "AppUpdatePublication",
  created() {
    this.$store.dispatch("pub/GetPublications");
    this.getId();
  },
  data: () => ({
    description: "",
    paramsId: null,
    updatePublication: false,
    messageError: "",
    messageSuccess: false,
    isLoading: false,
    isLoadingDelete: false,
    messageCommentaire: "",
    commentaireLoading: false,
  }),
  computed: {
    Publications() {
      return this.$store.state.pub.publications;
    },
    UserId() {
      return JSON.parse(localStorage.getItem("user"));
    },
    isAdmin() {
      return this.$store.state.auth.user.isAdmin;
    },
    User() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    close() {
      return window.history.back();
    },
    getId() {
      const url = window.location.pathname;
      const Id = url.split("/publication/")[1];
      console.log(url, Id);
      this.paramsId = Id;
    },
    updatePublications() {
      this.isLoading = true;
      let publication = {
        content: this.description,
      };
      return PublicationService.update(this.paramsId, publication)
        .then(() => {
          this.messageSuccess = true;
        })
        .catch((error) => (this.messageError = error.response.data.error))
        .finally(() => (this.isLoading = false));
    },
    deletePublication() {
      this.isLoadingDelete = true;
      return PublicationService.delete(this.paramsId)
        .then(() => {
          alert("Publication supprimée");
          this.$router.push("/");
        })
        .catch((error) => (this.messageError = error.response.data.error))
        .finally(() => (this.isLoadingDelete = false));
    },
    //ajouter un like sur la publication
    liked(id) {
      let val = {
        like: 1,
      };
      LikeService.addLike(id, val)
        .then(() => {
          this.$nextTick(function () {
            this.$store.dispatch("pub/GetPublications");
          });
        })
        .catch((error) => console.log(error));
    },
    //afficher les likes sur chaque publication
    Likes(val) {
      let like = 0;
      val.map((el) => {
        like = like + el.like;
      });

      console.log(like);
      return like;
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
  },
};
</script>

<style scoped>
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.bg-violet {
  background: #b69efa;
  padding: 1px;
}
.close {
  position: absolute;
  right: 2px;
  top: 15px;
  z-index: 2;
}
.container-pub {
  position: relative;
}
.card-height {
  min-height: 400px;
}
.content-notification {
  border-top: 2px solid rgb(206, 206, 206);
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
  .card-height {
    min-height: auto;
  }
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
