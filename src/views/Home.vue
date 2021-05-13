<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 publication-component">
        <AppPublication />
      </div>
      <div class="col-md-1 small-screen"></div>
      <div class="col-md-3">
        <div class="search-input">
          <v-text-field
            v-model="searchQuery"
            label="search user"
            :loading="isLoading"
            :search-input.sync="searchQuery"
            color="#5b25f5"
            prepend-icon="mdi-account-search"
          ></v-text-field>
          <div v-if="searchQuery" class="bg-white">
            <div v-for="item in resultQuery" :key="item.id">
              <small
                class="text-secondary p-2 d-flex justify-content-between shadow-sm p-3 mb-5 bg-white rounded"
              >
                {{ item.username }}
              </small>
            </div>
          </div>

          <small class="d-block text-danger" v-if="messageError">
            {{ messageError }}
          </small>
        </div>
        <v-col class="switch-small">
          <div class="text-indigo mt-small-4">Forum</div>
          <v-switch
            v-model="switch1"
            color="indigo"
            flat
            label="Multimédia"
          ></v-switch>
          <v-switch
            v-model="switch2"
            color="indigo"
            flat
            label="Text"
          ></v-switch>
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
import AppPublication from "../components/publication/Publication";
import AuthService from "../service/auth";
export default {
  name: "AppHome",
  components: {
    AppPublication,
  },
  created() {
    this.$store.dispatch("auth/GetOneUser");
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.users.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.username.toLowerCase().includes(v));
        });
      } else {
        return this.users;
      }
    },
  },
  data: () => ({
    switch1: true,
    switch2: true,
    isLoading: false,
    messageError: "",
    searchQuery: "",
    users: [],
  }),

  methods: {},
  watch: {
    searchQuery() {
      console.log(this.searchQuery.length);
      
      if (this.isLoading) return;
      //quand on supprimer les saisie de recherche initial le tableaux users
      if(this.users.length != 0 && this.searchQuery.length == 1){
        return this.users = []
      }
      //si nous avons saisie quelque chose arrêt ici la fonction
      if (
        this.searchQuery.length > 1 ||
        this.users.length != 0 ||
        this.searchQuery.length == 0
      )
        return;
      //active le barre de loading 
      this.isLoading = true;
      //récupérer les données de l 'api
      return AuthService.getUsers()
        .then((res) => {
          this.users = res.data;
          console.log(this.users);
        })
        .catch((error) => (this.messageError = error.response.data.error))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
<style scoped>
.text-indigo {
  color: #5b25f5;
}

@media (max-width: 576px) {
  .small-screen {
    display: none;
  }
  .switch-small {
    box-shadow: 0px -2px 8px 1px rgba(202, 191, 191, 0.75);
    -webkit-box-shadow: 0px -2px 8px 1px rgba(202, 191, 191, 0.75);
    -moz-box-shadow: 0px -2px 8px 1px rgba(202, 191, 191, 0.75);
    background: white;
    display: flex;
    padding: 1px;
    position: fixed;
    bottom: 0;
    z-index: 100;
    left: 0;

    justify-content: center;
  }
  .mt-small-4 {
    margin-top: 17px;
  }
  .bloc-publication {
    margin-top: -30px;
  }
  .search-input{
    position:absolute;
    top:0px;
  }
   .publication-component{
     margin-top:35px
   }
}
</style>
