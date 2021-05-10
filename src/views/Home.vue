<template>
  <div class="container d-flex flex-column justify-content-center">
    <div class="row d-flex justify-content-center">
      <div class="col-md-2"></div>
      <div class="col-md-7">
        <AppSearchUsers />
      </div>
      <div class="col-md-2">
        <v-container>
          <v-row>
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
          </v-row>
        </v-container>
      </div>
    </div>
   <div class="bloc-publication">
      <div class="row d-flex justify-content-center">
      <div class="col-md-8 d-flex justify-content-center">
        <AppCreatePublication />
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-8">
        <AppPublication />
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import AppPublication from "../components/publication/Publication";
import AppSearchUsers from "../components/utils/SearchUsers";
import AppCreatePublication from "../components/publication/Create";
export default {
  name: "AppHome",
  components: {
    AppPublication,
    AppSearchUsers,
    AppCreatePublication,
  },
  data: () => ({
    switch1: true,
    switch2: true,
  }),
};
</script>
<style scoped>
.text-indigo {
  color: #5b25f5;
}
.bloc-publication{
  margin-top:-50px
}
@media (max-width: 576px) {
  .switch-small {
    display: flex;
  }
  .mt-small-4 {
    margin-top: 17px;
  }
  .bloc-publication{
    margin-top: -30px;
  }
}
</style>
