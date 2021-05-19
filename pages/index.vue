<template>
  <div>
    <div class="d-flex hero justify-center align-center">
      <img class="hero-img" src="@/assets/hero-img.png" alt="" />
      <img class="arrow" src="@/assets/arrow-down.svg" alt="" />
      <div class="hero-content justify-center align-center text-center">
        <h1 class="mx-auto">
          ЗАКАЗЫВАЙ & БРОНИРУЙ РЕСТОРАНЫ В <span>АЛМАТЫ</span>
          <v-icon color="orange">menu-down</v-icon>
        </h1>
        <MainSearch />
      </div>
    </div>
    <v-container>
      <Popular />
    </v-container>
    <FoodType v-if="categories" :categories="categories" />
    <News />
    <AboutUs />
  </div>
</template>

<script>
import Popular from "@/components/home/Popular";
import FoodType from "@/components/home/FoodType";
import News from "@/components/home/News";
import AboutUs from "@/components/home/AboutUs";
export default {
  async asyncData({ $axios }) {
    const categories = await $axios.$get(`category/`);
    return { categories };
  },
  data: () => ({}),
  components: {
    Popular,
    FoodType,
    News,
    AboutUs
  }
};
</script>

<style lang="scss" scoped>
* {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #f35757;
}
h1 {
  max-width: 770px;
  font-size: 40px;
  line-height: 47px;
  color: #fff1f1;
  span {
    line-height: inherit;
    font-size: inherit;
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
}
.hero {
  position: relative;
  height: 586px;
  width: 100%;
  &-img {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    object-fit: cover;
  }
  &-content {
    z-index: 10;
  }
  @keyframes changewidth {
    to {
      transform: translateY(50%);
    }
  }
  .arrow {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    margin: auto;

    cursor: pointer;
    animation-duration: 0.6s;
    animation-name: changewidth;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
}

.header {
  height: 96px;
}
</style>
