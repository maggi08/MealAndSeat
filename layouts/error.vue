<template>
  <v-container>
    <div
      v-if="error.statusCode === 404"
      class="d-flex w-full justify-space-around mt-90"
    >
      <v-img max-width="500" class="ml-n10" :src="require('~/assets/404.svg')"></v-img>
      <div class="text-center">
        <h1>404</h1>
        <p>Упс... страница не найдена :(</p>
        <v-btn
          nuxt
          to="/"
          color="primary"
          depressed
          width="300"
          class="text-none mt-16"
          >Вернуться на главную</v-btn
        >
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ["error"],
};
</script>

<style scoped>
h1 {
  color: #ff7f51;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ff7f51;
  font-size: 130px;
}
p {
  font-size: 18px;
}
.mt-90 {
  margin-top: 90px;
}
</style>
