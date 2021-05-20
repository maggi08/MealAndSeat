<template>
  <div class="">
    <h1 class="mt-16 text-center">ПОПУЛЯРНЫЕ РЕСТОРАНЫ В АЛМАТЫ</h1>
    <v-row
      v-if="restaurants"
      class="mt-15 rest-content d-flex justify-space-between mx-auto"
    >
      <v-col v-for="(item, index) in topThree" :key="index" class="rest-item">
        <img
          :src="`http://95.179.158.161:8080/image/${item.imageSrc}`"
          alt=""
        />
        <div class="white-shadow"></div>
        <div class="content">
          <nuxt-link
            class="rest-link"
            :to="`/Restaurants/${item.name}?id=${item.id}`"
          >
            <h2>{{ item.name }}</h2>
            <h3>{{ item.address }}</h3>
          </nuxt-link>
        </div>
      </v-col>
    </v-row>

    <nuxt-link to="/Restaurants" class="btn-show my-16 mx-auto">
      ПОКАЗАТЬ ВСЕ РЕСТОРАНЫ ({{ len }})
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data: () => ({
    // num: 45
    // restaurants: [
    //   {
    //     image: require("@/assets/rest.png"),
    //     name: "shafran",
    //     type: "ashanalar zhelisi"
    //   },
    //   {
    //     image: require("@/assets/rest.png"),
    //     name: "shafran",
    //     type: "ashanalar zhelisi"
    //   },
    //   {
    //     image: require("@/assets/rest.png"),
    //     name: "shafran",
    //     type: "ashanalar zhelisi"
    //   }
    // ]
  }),
  props: {
    restaurants: Object
  },
  computed: {
    topThree() {
      let arr = [];
      if (this.restaurants?.restaurantList) {
        if (this.restaurants.restaurantList[0])
          arr.push(this.restaurants.restaurantList[0]);
        if (this.restaurants.restaurantList[1])
          arr.push(this.restaurants.restaurantList[1]);
        if (this.restaurants.restaurantList[2])
          arr.push(this.restaurants.restaurantList[2]);
      }
      console.log(arr);
      return arr;
    },
    len() {
      if (this.restaurants?.restaurantList)
        return this.restaurants.restaurantList.length;
    }
  }
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
}
h3 {
  font-size: 25px;
  line-height: 30px;
}
button {
  font-family: $nun;
  font-size: 20px;
  line-height: 27px;
  color: $theme-color;

  width: 100%;
  max-width: 400px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid $theme-color;
  box-sizing: border-box;
  border-radius: 20px;

  transition: 0.22s ease-in-out;
  &:hover {
    background: $theme-color;
    color: #fff1f1;
  }
}
.rest-content {
  max-width: 1000px;
}
.rest-item {
  width: 300px;
  max-width: 300px;
  height: 220px;
  position: relative;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
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
    border-radius: 15px;
  }

  .content {
    text-align: center;
    z-index: 10;
  }
}
.rest-link {
  text-decoration: none;

  h2,
  h3 {
    &:hover {
      color: $theme-color;
    }
  }
}
.btn-show {
  width: 100%;
  max-width: 400px;
  height: 60px;
  border: 2px solid #7c2c6b;
  box-sizing: border-box;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;
  transition: 0.2s;

  &:hover {
    background: $theme-color;
    color: white;
  }
}
</style>
