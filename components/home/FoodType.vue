<template>
  <div class="bg-img">
    <img src="@/assets/foodtype.png" alt="" />
    <v-container class="">
      <h1>ЗАКАЖИ СВОЕ ЛЮБИМОЕ БЛЮДО</h1>

      <v-row class="types justify-center align-center">
        <h2
          class="item mx-5 my-3"
          v-for="(item, index) in categoryList.slice(0, 10)"
          :key="index"
        >
          #{{ item.name }}
        </h2>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    type: ["asian", "european", "Chinease"]
  }),
  props: {
    categories: Object
  },
  computed: {
    categoryList() {
      if (this.categories?.categoryList) return this.categories.categoryList;
    }
  }
};
</script>

<style scoped lang="scss">
* {
  font-family: $open;
  font-weight: bold;
  font-size: 40px;
  line-height: 47px;
  text-align: center;
  color: #ffffff;
}

h1 {
  margin-top: 103px;
}
h2 {
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  color: #000000;
}

img {
  width: 100%;
  height: 100%;
}
.bg-img {
  position: relative;
  width: 100%;
  height: 557px;
  img {
    width: 100%;
    height: 100%;
  }
  .container {
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    position: absolute;
  }
  // background: url("@/assets/foodtype.png") no-repeat center center;
}
.types {
  margin-top: 50px;
  margin-bottom: 158px;

  .item {
    padding: 4px 42px;
    background: #ffffff;
    border-radius: 30px;
  }
}
</style>
