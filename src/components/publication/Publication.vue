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
                  <small class="">{{ commentaire.comment }}</small
                  >S
                  <v-btn
                    @click="deleteCommit(commentaire.PublicationId)"
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
          <div class="container bg-white" v-if="pub.Comments.length > 0">
            <!----commentaire-->
            <div v-for="comment in pub.Comments" :key="comment.id">
              <div v-if="comment.UserId == UserId" class="col">
                <small class="text-success">
                  Vous avez publier un commentaire .. !
                </small>
              </div>

              <div class="row" v-else>
                <div class="text-center col-md-2 col-sm-1">
                  <img
                    :src="
                      pub.User.avatar ||
                      '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                    "
                    alt=""
                    class="img-fluid avatar-commentaire"
                  />
                  <small class="text-capitalize d-block"
                    >{{ pub.User.username }} {{ pub.User.lastName }}</small
                  >
                </div>

                <div class="col-md-9 col-sm-10">
                  <v-text-field
                    color="#5b25f5"
                    append-outer-icon="mdi-send"
                    @click:append-outer="
                      sendCommentaire(
                        pub.id,
                        pub.User.avatar,
                        pub.User.lastName,
                        pub.User.username
                      )
                    "
                    v-model="commentaire"
                    :rules="[(v) => v.length <= 50 || 'Max 50 characters']"
                    :loading="commentaireLoading"
                    counter="50"
                    hint="Veuillez ne pas dépasser 50 characters"
                    label="Ajouter un commentaire ..!"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-else>
            <div class="text-center col-md-2">
              <img
                :src="
                  pub.User.avatar ||
                  '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                "
                alt=""
                class="img-fluid avatar-commentaire"
              />
              <small class="text-capitalize d-block"
                >{{ pub.User.username }} {{ pub.User.lastName }}</small
              >
            </div>
            <div class="col">
              <v-text-field
                color="#5b25f5"
                append-outer-icon="mdi-send"
                @click:append-outer="
                  sendCommentaire(
                    pub.id,
                    pub.User.avatar,
                    pub.User.lastName,
                    pub.User.username
                  )
                "
                v-model="commentaire"
                :rules="[(v) => v.length <= 50 || 'Max 50 characters']"
                :loading="commentaireLoading"
                counter="50"
                hint="Veuillez ne pas dépasser 50 characters"
                label="Ajouter un commentaire ..!"
              ></v-text-field>
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
    console.log(this.Publications);
  },

  data: () => ({
    loading: false,
    selection: 1,
    profile: true,
    messageLike: "",
    messageCommentaire: "",

    commentaire: "",

    commentaireLoading: false,
  }),
  computed: {
    Publications() {
      return this.$store.state.pub.publications;
    },
    UserId() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  methods: {
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

    sendCommentaire(id, avatar, lastName, username) {
      let commentaire = {
        comment: this.commentaire,
        lastName: lastName,
        avatar: avatar,
        username: username,
      };
      this.commentaireLoading = true;
      return CommentaireService.addCommentaire(id, commentaire)
        .then((res) => {
          console.log(res.data);
          this.messageCommentaire = res.data.comment;
          this.$nextTick(function () {
            this.$store.dispatch("pub/GetPublications");
            this.commentaire = "";
          });
        })
        .catch((error) => {
          console.log(error.response.data.error);
        })
        .finally(() => (this.commentaireLoading = false));
    },
    deleteCommit(id) {
      return CommentaireService.delete(id)
        .then((res) => {
          console.log(res.data);
          this.$nextTick(function () {
            this.$store.dispatch("pub/GetPublications");
          });
        })
        .catch((error) => console.log(error.response.data.error));
    },
    Likes(val) {
      let like = 0;
      val.map((el) => {
        like = like + el.like;
      });

      console.log(like);
      return like;
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
