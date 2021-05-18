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

      <div v-for="publication in this.Publications" :key="publication.id">
        <v-card
          :loading="loading"
          class="mx-auto mt-4"
          @click="$router.push(`/publication/${publication.id}`)"
          v-if="publication.UserId === UserId"
        >
          <v-card-text>
            <div class="row">
              <div class="col-md-2">
                <img
                  :src="publication.User.avatar || '//ssl.gstatic.com/accounts/ui/avatar_2x.png'"
                  class="rounded-circle-user"
                  alt="Cinque Terre"
                />
              </div>
              <div class="col">
                <small class="text-capitalize"
                  >{{ publication.User.username }}
                  {{ publication.User.lastName }}</small
                >
                <small class="text-primary d-block"
                  >Publié a
                  {{
                    new Date(publication.createdAt).toLocaleTimeString()
                  }}</small
                >
              </div>
            </div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            {{ publication.content }}
          </v-card-text>
          <v-img
            v-if="publication.attachment"
            height="250"
            :src="publication.attachment"
          ></v-img>
          <v-card-actions class="bg-violet">
            <v-spacer></v-spacer>

            <div>
              <small class="text-light"> {{ publication.like }} (like) </small>

              <v-btn icon @click="liked(publication.id, publication.like)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="white"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                  />
                </svg>
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-container>
</template>
<script>
import PublicationService from "../service/publication";
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
    liked(id, like) {
      let val = {
        like: like + 1,
      };
      PublicationService.update(id, val)
        .then(() => {
          console.log("liked");
        })
        .catch((error) => console.log(error));
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
.rounded-circle-user {
  border-radius: 50%;
  border: 2px solid grey;
  height: 50px;
  width: 50px;
  vertical-align: middle;
}
.create-pub {
  padding-top: 17px;
  border-radius: 50px;
  background: #f8f8f8;
}
.bg-violet {
  background: #b69efa;
  padding: 1px;
}

@media (max-width: 576px) {
  .mx-auto {
    max-width: 99%;
  }
}
</style>
