<template>
  <div>
    <!--section toutes les publications-->
    <div v-for="pub in this.Publications" :key="pub.id">
      <v-card
        :loading="loading"
        class="mx-auto mt-4"
        v-if="
          multimedia == true && text == false
            ? pub.attachment
            : false || (text == true && multimedia == false)
            ? !pub.attachment
            : false || (multimedia == true && text == true)
            ? pub
            : false
        "
      >
        <v-card-text class="card">
          <div
            class="d-flex"
            @click="getAccount(pub.User.id)"
            style="cursor: pointer"
          >
            <div class="mr-3">
              <img
                :src="
                  pub.User.avatar ||
                  '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                "
                class="avatar"
                alt="Cinque Terre"
              />
            </div>
            <div>
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
            class="content-publication shadow-none p-3 mb-5 bg-light rounded"
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
          <v-card-actions>
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
                  fill="#0000FF"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                  />
                </svg>
              </v-btn>
            </div>
          </v-card-actions>
          <hr>
          <div class="commentaire" v-if="pub.Comments.length >0">
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
            <hr />
          </div>

          <div class="row">
            <div class="col">
              <v-text-field
                color="#5b25f5"
                class="shadow-none p-3 mb-5 bg-light rounded"
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
                append-outer-type="submit"
              >
              </v-text-field>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import LikeService from "../../service/like";
import CommentaireService from "../../service/commentaire";
export default {
  name: "AppPublication",
  props: ["multimedia", "text"],
  created() {
    this.$store.dispatch("pub/GetPublications");
  },

  data: () => ({
    loading: false,
    selection: 1,
    profile: true,
    messageLike: "",
    messageCommentaire: "",
    commentaireLoading: false,
  }),
  computed: {
    Publications() {
      return this.$store.state.pub.publications;
    },
    User() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      return this.$store.state.auth.user.isAdmin;
    },

    UserId() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  methods: {
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
      return like;
    },
    getAccount(id) {
      return this.$store
        .dispatch("auth/GetUserById", id)
        .then(() => this.$router.push(`/userAccount/${id}`))
        .catch((error) => console.log(error));
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
  border: 4px solid blue
}
.create-pub {
  padding-top: 17px;
  border-radius: 50px;
  background: #f8f8f8;
}

.content-publication {
  cursor: pointer;
  margin-top: 7px;
}
.content-publication:hover {
  background: rgb(238, 238, 238, 0.2);
  color: black;
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
  padding: 3% 2% 0;
  display: flex;
  color: black;
  padding: 5px;
  margin-bottom: 5px;
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
