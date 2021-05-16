<template>
  <div class="container mt-2 mb-4">
    <div class="row">
      <div class="col-md-7 card">
        <div class="bg-dark p-4">
          <img
            class="mx-auto d-block img-fluid"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          />
        </div>
        <v-card-actions class="bg-violet">
          <v-spacer></v-spacer>

          <v-btn icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="white"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
              />
            </svg>
          </v-btn>

          <v-btn icon>
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
          <v-btn icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="white"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
              />
            </svg>
          </v-btn>
        </v-card-actions>
        <div class="card-body">
          <div class="card-text">
            <small>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              officiis eum aperiam consectetur. Voluptate porro veritatis
              molestiae, nostrum nihil sunt aut et magni doloremque? Autem ipsam
              consectetur quidem recusandae maiores!
            </small>
          </div>
        </div>
      </div>
      <div class="col-md-5 card">
        <div>
          <div class="m-2">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              class="avatar"
              alt=""
            />
            <small class="text-secondary ml-2">kaouech Mouheb</small>
            <small class="text-primary d-block">Publié a </small>
          </div>
          <hr />
          <div>
            <v-btn color="#b69efa" dark> Modifier </v-btn>
            <v-btn color="error" class="ml-2" dark> Supprimer </v-btn>
            <v-textarea
              counter
              label="Description"
              :rules="[(v) => v.length <= 70 || 'Max 70 characters']"
              v-model="description"
              color="#5b25f5"
            ></v-textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppUpdatePublication",
  data: () => ({
    description: "",
  }),
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
</style>
