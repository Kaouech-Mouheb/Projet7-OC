<template>
  <v-container fluid>
    <v-card>
      <v-img
        height="180px"
        src=".././assets/groupomania.jpg"
        gradient="to top right, rgba(100,115,201,.70),#5b25f5"
      >
        <v-card-title class="white--text mt-8">
          <v-col cols="4">
            <v-img
              :src="
                utilisateur.avatar ||
                '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
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
            {{ utilisateur.username }} {{ utilisateur.lastName }}
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
                  >{{ utilisateur.username }} {{ utilisateur.lastName }}</strong
                >
              </div>
              <div v-if="utilisateur.birthday">{{ utilisateur.birthday }}</div>
              <div>{{ utilisateur.email }}</div>
              <div v-if="utilisateur.bio">
                <strong class="text-primary">A propos</strong>
                <small class="d-block">
                  {{ utilisateur.bio }}
                </small>
                <hr />
              </div>
              <div>
                <v-btn @click="$router.push('/parametre-compte')"
                  ><v-icon>mdi-cog-off-outline </v-icon>Avancé</v-btn
                >
              </div>
            </div>
            <div
              v-if="
                !utilisateur.birthday ||
                !utilisateur.lastName ||
                !utilisateur.avatar
              "
              class="mt-2"
            >
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
      <hr />
      <v-card-text>
        <p class="display-1 text--primary text-center">Mes Publications</p>
        <AppPublication :profile="false" />
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import AppPublication from "../components/publication/Publication";

export default {
  created() {
    this.$store.dispatch("auth/GetOneUser");
    setTimeout(() => {
      this.user();
    }, 20);
  },
  data: () => ({
    utilisateur: {
      username: "",
      lastName: "",
      email: "",
      birthday: "",
      bio: "",
      avatar: "",
    },
  }),
  computed: {
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
      this.utilisateur.username = this.username;
      this.utilisateur.lastName = this.lastName;
      this.utilisateur.email = this.email;
      this.utilisateur.birthday = this.birthday;
      this.utilisateur.bio = this.bio;
      this.utilisateur.avatar = this.avatar;
    },
  },
  name: "AppProfile",
  components: {
    AppPublication,
  },
};
</script>
<style scoped>
.image-viewer-violet {
  height: 90px;
  width: 72px;
  border-radius: 50%;
  border: 2px solid#ffffff;
}
</style>
