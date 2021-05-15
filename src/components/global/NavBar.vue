<template>
  <div>
    <v-app-bar color="#5b25f5" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <h2>
        <router-link to="/" class="title-groupomania">
          Groupomania
        </router-link>
      </h2>

      <v-spacer> </v-spacer>
      <div v-if="!deconnexion">
        <router-link to="/login">
          <span class="connexion" title="click to login">
            <v-icon>mdi-account-arrow-right-outline</v-icon>
            Connexion
          </span>
        </router-link>

        <router-link to="/register">
          <span class="connexion" title="click to login">
            <v-icon>mdi-circle-edit-outline</v-icon>
            Inscription
          </span>
        </router-link>
      </div>
      <div v-if="deconnexion">
        <span class="connexion" @click.prevent="loggout">
          <v-icon>mdi-power-settings</v-icon>
          Déconnexion
        </span>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title @click="$router.push('/')" class="nav-item">
                Acceuil
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-cog</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                @click="$router.push('/account')"
                class="nav-item"
              >
                Mon compte
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  created() {
    this.navItem();
    console.log(this.deconnexion);
  },
  name: "AppNav",
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    deconnexion() {
      return this.$store.state.auth.connected;
    },
  },

  methods: {
    loggout() {
      this.$store.dispatch("auth/Loggout");
      this.$router.push("/login");
    },
    navItem() {
      if (
        window.location.pathname == "/login" ||
        window.location.pathname == "/register"
      ) {
        this.$store.commit("auth/LOGGOUT");
      } else {
        this.$store.commit("auth/CONNECTED_SUCCESS");
      }
    },
  },
};
</script>
<style scoped>
a {
  color: white !important;
  text-decoration: none;
}
.title-groupomania {
  margin-left: 60px !important;
}
.connexion {
  font-weight: bold;
  font-size: 0.7em;
  cursor: pointer;
}
.connexion:hover {
  opacity: 0.5;
}
.connexion:first-of-type {
  margin-right: 5px;
}
@media (max-width: 576px) {
  .title-groupomania {
    display: none;
  }
}
</style>
