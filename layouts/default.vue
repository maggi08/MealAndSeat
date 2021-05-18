<template>
  <v-app dark>
    <Header />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style lang="scss">
.row {
  margin: 0;
}
p {
  margin-bottom: 0;
}
.v-application p {
  margin-bottom: 0;
}
* {
  font-style: normal;
  font-weight: normal;
}
img {
  object-fit: cover;
}
.my-input1.v-text-field--solo {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.my-input2.v-text-field--solo {
  border-radius: 0px;
}
.my-input1.v-text-field--solo {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.toasted-container .bottom-right {
  font-family: $open;
  font-size: 14px;
  line-height: 18px;
  color: white;
  font-weight: 500;
}
</style>
