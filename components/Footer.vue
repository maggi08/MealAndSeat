<template>
  <div class="">
    <div class="bg">
      <v-container>
        <v-row class="justify-space-between mt-13 mb-16">
          <v-col class="d-flex flex-column">
            <nuxt-link class="mt-3" to="/">О нас</nuxt-link>
            <nuxt-link class="mt-3" to="/">Контакты</nuxt-link>
            <nuxt-link class="mt-3" to="/">Служба подержки</nuxt-link>
            <nuxt-link class="mt-3" to="/">Помощь</nuxt-link>
            <nuxt-link class="mt-3" to="/">Блог</nuxt-link>
          </v-col>
          <div class="logo">
            <img src="@/assets/footer-logo.svg" alt="" />
          </div>
        </v-row>
      </v-container>
    </div>
    <v-container class="bg-white">
      <v-row class="justify-space-between my-3 align-center">
        <p>
          @2021 ВСЕ ПРАВА ЗАЩИЩЕНЫ
        </p>
        <div class="share d-flex align-center">
          <p class="mr-6 mb-0">ПОДПИСЫВАЙТЕСЬ</p>
          <img class="mr-6" width="24px" height="24px" src="@/assets/instagram 1.svg" alt="" />
          <img class="mr-6" width="24px" height="24px" src="@/assets/twitter 1.svg" alt="" />
          <img class="mr-6" width="24px" height="24px" src="@/assets/facebook 1.svg" alt="" />
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style lang="scss" scoped>
.bg {
  background: url("@/assets/footer.png"), $theme-color;
  background-size: cover;
  background-repeat: no-repeat;
}
* {
  font-family: $rob;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 29px;
  color: #ffffff;
}
a {
  color: #fff;
  text-decoration: none;
  transition: 0.2s;
}
.logo {
  width: 100%;
  max-width: 302px;
  height: 201px;
  img {
    width: 302;
    height: 201px;
    object-fit: cover;
  }
}

p {
  font-size: 15px;
  line-height: 18px;
  color: #6f6f6f;
}
</style>
