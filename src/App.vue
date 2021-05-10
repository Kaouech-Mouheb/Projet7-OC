<template>
  <v-app id="app">
    <AppNavBar />
    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script>
import AppNavBar from "./components/global/NavBar";
import AppFooter from "./components/global/Footer";
export default {
  name: "App",
  components: {
    AppNavBar,
    AppFooter,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
#app {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  background: 	#F8F8F8;
}
</style>
