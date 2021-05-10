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
          <p class="ml-3">Kaouech Mouheb</p>
        </v-card-title>
      </v-img>

      <v-card-text>
        <div class="font-weight-bold ml-8 mb-2">Infos</div>

        <v-timeline align-top dense>
          <v-timeline-item :color="messages.color">
            <div>
              <div class="font-weight-normal">
                <strong>{{ messages.name }} {{ messages.lastName }}</strong>
              </div>
              <div>{{ messages.birthday }}</div>
              <div>{{ messages.email }}</div>
              <div><v-btn>Paramétre de compte</v-btn></div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
      <hr />
      <v-card-text>
        <p class="display-1 text--primary text-center">Mes Publications</p>
        <AppPublication />
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
  data: () => ({
    messages: {
      name: "kaouech",
      lastName: "Mouheb",
      birthday: "12/09/1991",
      post: "admin",
      email: "mouhebkaouach@hotmail.fr",
      color: "deep-purple lighten-1",
    },
  }),
};
</script>
