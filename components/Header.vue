<template>
  <div class="">
    <v-container class="d-flex justify-space-between align-center header">
      <!-- <div class="burger-menu">
        <img src="@/assets/burger-menu.svg" alt="" />
      </div> -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="@/assets/logo.svg" alt="" />
        </nuxt-link>
      </div>
      <div class="login">
        <button>Login</button>
        |
        <button>Sign up</button>
      </div>
    </v-container>
  </div>
</template>

<script>
import MainSearch from "@/components/MainSearch";
export default {
  data: () => ({}),
  components: {
    MainSearch
  }
};
</script>

<style scoped lang="scss">
* {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #f35757;
}

.header {
  height: 96px;
}
</style>
