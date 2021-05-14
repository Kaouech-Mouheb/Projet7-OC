<template>
  <v-container fluid>
    <v-card>
      <v-img
        height="200px"
        src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
      >
        <v-card-title class="white--text mt-8">
          <v-avatar size="56">
            <img
              alt="user"
              src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
            />
          </v-avatar>
          <p class="ml-3 text-capitalize">{{ username }} {{lastName}}</p>
        </v-card-title>
      </v-img>

      <v-card-text>
        <div class="font-weight-bold ml-8 mb-2">Infos</div>

        <v-timeline align-top dense>
          <v-timeline-item color="deep-purple lighten-1">
            <div>
              <div class="font-weight-normal">
                <strong class="text-capitalize">{{ username }} {{lastName}}</strong>
              </div>
              <div v-if="birthday">{{ birthday }}</div>
              <div>{{ email }}</div>
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
  name: "AppProfile",
  components: {
    AppPublication,
  },
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
  data: () => ({}),
};
</script>
