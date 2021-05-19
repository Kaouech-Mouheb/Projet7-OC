<template>
  <div class="nav-bar">
    <v-app-bar color="#5b25f5" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <h2>
        <router-link to="/" class="title-groupomania">
          Groupomania
        </router-link>
      </h2>

      <v-spacer> </v-spacer>
      <div v-if="deconnexion">
        <span class="notification" @click="notification = notification ? false: true"
          ><v-icon>mdi-bell</v-icon>
          </span
        >
        <div class="notification-champ" v-if="notification">
          <div class="notification-hover">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt=""
              class="img-fluid avatar"
            />
            <small>Kaouech Mouheb</small>
            <small class="d-block"
              >à publier une publication a 11h 30 minutes</small
            >
            <hr />
          </div>
          <div class="notification-hover">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt=""
              class="img-fluid avatar"
            />
            <small>Kaouech Mouheb</small>
            <small class="d-block"
              >à publier une publication a 11h 30 minutes</small
            >
            <hr />
          </div>
          <div class="notification-hover">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt=""
              class="img-fluid avatar"
            />
            <small>Kaouech Mouheb</small>
            <small class="d-block"
              >à publier une publication a 11h 30 minutes</small
            >
            <hr />
          </div>
          <div class="notification-hover">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt=""
              class="img-fluid avatar"
            />
            <small>Kaouech Mouheb</small>
            <small class="d-block"
              >à publier une publication a 11h 30 minutes</small
            >
            <hr />
          </div>
          <div>
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt=""
              class="img-fluid avatar"
            />
            <small>Kaouech Mouheb</small>
            <small class="d-block"
              >à publier une publication a 11h 30 minutes</small
            >
            <hr />
          </div>
          <div>
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt=""
              class="img-fluid avatar"
            />
            <small>Kaouech Mouheb</small>
            <small class="d-block"
              >à publier une publication a 11h 30 minutes</small
            >
            <hr />
          </div>
          <div>
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt=""
              class="img-fluid avatar"
            />
            <small>Kaouech Mouheb</small>
            <small class="d-block"
              >à publier une publication a 11h 30 minutes</small
            >
            <hr />
          </div>
        </div>
      </div>

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
      notification: false,
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
      this.$store.commit("auth/INITIAL_STATE_AUTH");
      this.$store.commit("pub/INITIAL_STATE_PUB");
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
.notification {
  cursor: pointer;
  margin-right: 10px;
  position: relative;
}
.notification:hover {
  opacity: 0.7;
}
.notification-champ {
  position: absolute;
  padding: 10px;
  top: 50px;
  right: 10px;
  background: #ffffff;
  color: rgb(0, 0, 0);
  width: 250px;
  z-index: 10;
  box-shadow: 0px 5px 12px 8px rgba(187, 187, 187, 0.75);
  -webkit-box-shadow: 0px 5px 12px 8px rgba(187, 187, 187, 0.75);
  -moz-box-shadow: 0px 5px 12px 8px rgba(187, 187, 187, 0.75);
  max-height: 300px;
  overflow: auto;
}
.notification-hover:hover{
  background: rgb(235, 235, 235);
  cursor:pointer
}
.notification-champ small {
  font-size: 0.7em;
  color: rgb(65, 65, 65);
}
.avatar {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
}
.nav-bar {
  z-index: 100;
}
@media (max-width: 576px) {
  .title-groupomania {
    display: none;
  }
}
</style>
