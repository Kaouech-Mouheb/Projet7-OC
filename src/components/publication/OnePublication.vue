<template>
  <div class="container container-pub mt-2 mb-4">
    <div class="close" title="Fermer">
      <v-btn icon @click="close()">
        <v-icon color="error">mdi-close-box</v-icon></v-btn
      >
    </div>
    <div class="row" v-for="pub in Publications" :key="pub.id">
      <div class="col-md-7 card card-height" v-if="pub.id == paramsId">
        <div class="bg-dark p-4" v-if="pub.attachment">
          <img class="mx-auto d-block img-fluid" :src="pub.attachment" />
        </div>

        <div class="card-body">
          <div class="card-text">
            <small>
              {{ pub.content }}
            </small>
          </div>
        </div>
        <v-card-actions class="bg-violet">
          <v-spacer></v-spacer>
          <div>
            <small class="text-light"> {{ pub.like }} (like) </small>

            <v-btn icon @click="liked(pub.id, pub.like)">
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
      </div>
      <div class="col-md-5 card" v-if="pub.id == paramsId">
        <div>
          <div class="m-2">
            <img
              :src="
                pub.User.avatar || '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
              "
              class="avatar"
              alt=""
            />
            <small class="text-secondary ml-2 text-capitalize"
              >{{ pub.User.username }} {{ pub.User.lastName }}</small
            >
            <small class="text-primary d-block"
              >Publié a
              {{ new Date(pub.createdAt).toLocaleTimeString() }}</small
            >
          </div>
          <hr />
          <div v-if="pub.UserId == User">
            <v-btn
              color="#b69efa"
              dark
              @click="updatePublication = updatePublication ? false : true"
            >
              <span v-if="updatePublication">Annulez</span>
              <span v-else>Modifier</span>
            </v-btn>
            <v-btn
              color="error"
              class="ml-2"
              :loading="isLoadingDelete"
              dark
              @click="deletePublication()"
            >
              Supprimer
            </v-btn>
            <v-textarea
              v-if="updatePublication"
              counter
              label="Description"
              :rules="[(v) => v.length <= 70 || 'Max 70 characters']"
              v-model="description"
              color="#5b25f5"
            ></v-textarea>
            <v-btn
              color="success"
              :loading="isLoading"
              v-if="updatePublication"
              @click="updatePublications()"
            >
              validez
            </v-btn>
            <small v-if="messageSuccess" class="text-success d-block mt-2">
              Publication modifié ..!
            </small>
            <small class="text-danger" v-if="messageError">
              {{ messageError }}
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PublicationService from "../../service/publication";
export default {
  name: "AppUpdatePublication",
  created() {
    this.$store.dispatch("pub/GetPublications");
    this.getId();
  },
  data: () => ({
    description: "",
    paramsId: null,
    updatePublication: false,
    messageError: "",
    messageSuccess: false,
    isLoading: false,
    isLoadingDelete: false,
  }),
  computed: {
    Publications() {
      return this.$store.state.pub.publications;
    },
    User() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  methods: {
    close() {
      return window.history.back();
    },
    getId() {
      const url = window.location.pathname;
      const Id = url.split("/publication/")[1];
      console.log(url, Id);
      this.paramsId = Id;
    },
    updatePublications() {
      this.isLoading = true;
      let publication = {
        content: this.description,
      };
      return PublicationService.update(this.paramsId, publication)
        .then(() => {
          this.messageSuccess = true;
        })
        .catch((error) => (this.messageError = error.response.data.error))
        .finally(() => (this.isLoading = false));
    },
    deletePublication() {
      this.isLoadingDelete = true;
      return PublicationService.delete(this.paramsId)
        .then(() => {
          alert("Publication supprimée");
          this.$router.push("/");
        })
        .catch((error) => (this.messageError = error.response.data.error))
        .finally(() => (this.isLoadingDelete = false));
    },
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
};
</script>

<style scoped>
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.bg-violet {
  background: #b69efa;
  padding: 1px;
}
.close {
  position: absolute;
  right: 2px;
  top: 15px;
  z-index: 2;
}
.container-pub {
  position: relative;
}
.card-height {
  min-height: 400px;
}
@media (max-width: 576px) {
  .card-height {
    min-height: auto;
  }
}
</style>
