<template>
  <div class="container">
    <div class="row">
      <div class="col bg-white shadow-sm p-3 mb-5 bg-white rounded">
        <h1 class="text-primary text-center h3">Dashboard</h1>
        <h2 class="h4 text-secondary">Publication</h2>
        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nom d'utilisateur</th>
              <th scope="col">Contenu</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="pub in publications" :key="pub.id">
            <tr>
              <th scope="row">{{ pub.id }}</th>
              <td
                class="text-secondary text-capitalize user"
                @click="getAccount(pub.User.id)"
              >
                {{ pub.User.username }} {{ pub.User.lastName }}
              </td>
              <td class="text-secondary">{{ pub.content }}</td>
              <td>
                <v-btn
                  class="supprimer"
                  icon
                  @click="deletePublication(pub.id)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
        <h2 class="h4 text-secondary">Commentaire</h2>

        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nom d'utilisateur</th>
              <th scope="col">Contenu</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="pub in publications" :key="pub.id">
            <tr v-for="commit in pub.Comments" :key="commit.id">
              <th scope="row">{{ commit.id }}</th>
              <td
                class="text-secondary text-capitalize user"
                @click="getAccount(commit.UserId)"
              >
                {{ commit.username }} {{ commit.lastName }}
              </td>
              <td class="text-secondary">{{ commit.comment }}</td>
              <td>
                <v-btn
                  class="supprimer"
                  icon
                  @click="deleteCommit(commit.PublicationId, commit.id)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import CommentaireService from "../../service/commentaire";
import PublicationService from "../../service/publication";
export default {
  name: "AppAdmin",
  data: () => ({}),
  computed: {
    publications() {
      return this.$store.state.pub.publications;
    },
  },
  methods: {
    //supprimer un commentaire
    deleteCommit(paramsId, id) {
      //identifier le commentaire par son id
      let commentaire = {
        id: id,
      };
      //paramsId = PublicationId
      return CommentaireService.delete(paramsId, commentaire)
        .then(() => {
          // lancer un rappel à la fonction getPublications pour mettre à jour le contenu aprés suppression
          this.$nextTick(function () {
            this.$store.dispatch("pub/GetPublications");
          });
        })
        .catch((error) => console.log(error.response.data.error));
    },
    deletePublication(publicationId) {
      return PublicationService.delete(publicationId)
        .then(() => {
          this.$nextTick(function () {
            this.$store.dispatch("pub/GetPublications");
          });
        })
        .catch((error) => (this.messageError = error.response.data.error))
        .finally(() => (this.isLoadingDelete = false));
    },
    getAccount(id) {
      return this.$store
        .dispatch("auth/GetUserById", id)
        .then(() => this.$router.push(`/userAccount/${id}`))
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style>
.user {
  cursor: pointer;
}
.user:hover {
  color: black;
  background: rgb(228, 228, 228);
}
</style>
