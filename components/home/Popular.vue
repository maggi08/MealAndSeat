<template>
  <div class="">
    <h1 class="mt-16">ПОПУЛЯРНЫЕ РЕСТОРАНЫ В АЛМАТЫ</h1>

    <v-row>
      <v-col
        v-for="(item, index) in restaurants"
        :key="index"
        class="col-12 col-sm-4 rest-item"
      >
        <div class="content">
          <h2>{{ item.name }}</h2>
          <h3>{{ item.type }}</h3>
        </div>
        <img :src="item.image" alt="" />
        <div class="white-shadow"></div>
        
        
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    restaurants: [
      {
        image: require("@/assets/rest.png"),
        name: "shafran",
        type: "ashanalar zhelisi"
      },
      {
        image: require("@/assets/rest.png"),
        name: "shafran",
        type: "ashanalar zhelisi"
      },
      {
        image: require("@/assets/rest.png"),
        name: "shafran",
        type: "ashanalar zhelisi"
      },
    ]
  })
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: $nun;
  font-size: 25px;
  line-height: 34px;
  color: #000000;
}
h2,
h3 {
  font-family: $bal;
  font-style: normal;
  font-weight: bold;
  color: #fff1f1;
}
h2 {
  font-size: 30px;
  line-height: 36px;
  border: 1px solid #000000;
}
h3 {
  font-size: 25px;
  line-height: 30px;
}
button {
  font-family: $nun;
  font-size: 20px;
  line-height: 27px;
  color: #f35757;

  border: 2px solid $theme-color;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 18px 40px;

  transition: 0.22s ease-in-out;
  &:hover {
    background: $theme-color;
    color: #fff1f1;
  }
}

.rest-item {
  position: relative;
  border-radius: 15px;
  img {
    width: 100%;
    height: 220px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 15px;
    z-index: 2;
  }
  .white-shadow {
    position: absolute;
    width: 100%;
    height: 220px;
    top: 0;
    left: 0;
    background: rgba(196, 196, 196, 0.5);
    z-index: 5;
  }

  .content{
    z-index: 10;
  }
}
</style>
