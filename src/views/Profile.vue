<template>
  <v-container fluid>
    <div>
      <v-card>
        <v-img
          height="180px"
          src=".././assets/groupomania.jpg"
          gradient="to top right, rgba(100,115,201,.70),#5b25f5"
        >
          <v-card-title class="white--text mt-8">
            <v-col cols="4">
              <v-img
                :src="avatar || '//ssl.gstatic.com/accounts/ui/avatar_2x.png'"
                lazy-src="https://picsum.photos/10/6?image"
                aspect-ratio="1"
                class="lighten-2 image-viewer-violet d-block"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
            <p class="ml-3 text-capitalize">{{ username }} {{ lastName }}</p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">Infos</div>

          <v-timeline align-top dense>
            <v-timeline-item color="deep-purple lighten-1">
              <div>
                <div class="font-weight-normal">
                  <strong class="text-capitalize"
                    >{{ username }} {{ lastName }}</strong
                  >
                </div>
                <div v-if="birthday">{{ birthday }}</div>
                <div>{{ email }}</div>
                <div v-if="bio">
                  <strong class="text-primary">A propos</strong>
                  <small class="d-block">
                    {{ bio }}
                  </small>
                  <hr />
                </div>
                <div>
                  <v-btn @click="$router.push('/parametre-compte')"
                    ><v-icon>mdi-cog-off-outline </v-icon>Avancé</v-btn
                  >
                </div>
              </div>
              <div v-if="!birthday || !lastName || !avatar" class="mt-2">
                <v-btn
                  fab
                  dark
                  small
                  color="primary"
                  @click="$router.push('/parametre-compte')"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <small class="text-primary"> complétez votre profil</small>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
      <v-row>
        <v-card>
          <v-card-text> Mes Publications </v-card-text>
        </v-card>
      </v-row>

      <div v-for="pub in this.Publications" :key="pub.id">
        <v-card
          class="mx-auto mt-4"
          v-if="pub.UserId === UserId"
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
              <v-spacer></v-spacer>

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
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-container>
</template>
<script>
import LikeService from "../service/like";
export default {
  created() {
    this.$store.dispatch("auth/GetOneUser");
    this.$store.dispatch("pub/GetPublications");
  },
  data: () => ({
    loading: false,
    selection: 1,
  }),
  computed: {
    UserId() {
      return JSON.parse(localStorage.getItem("user"));
    },
    Publications() {
      return this.$store.state.pub.publications;
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
    Likes(val) {
      let like = 0;
      val.map((el) => {
        like = like + el.like;
      });

      console.log(like);
      return like;
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
</style>
