<template>
  <div>
    <!--section toutes les publications-->
    <div v-for="pub in this.Publications" :key="pub.id">
      <v-card
        :loading="loading"
        class="mx-auto mt-4"
        v-if="
        multimedia == true && text == false ? pub.attachment: false||
        text == true && multimedia == false ? !pub.attachment :false||
        multimedia == true && text == true ? pub: false
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
</template>
<script>
import LikeService from "../../service/like";
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

@media (max-width: 576px) {
  .mx-auto {
    max-width: 99%;
  }
}
</style>
