<template>
  <v-container>
    <h1 class="mx-auto text-center text-uppercase mt-13">НОВОСТИ</h1>
    <v-row v-if="discounts" class="news mt-13">
      <div
        class="news-item mx-auto mt-5"
        v-for="(item, index) in topFour"
        :key="index"
      >
        <img
          v-if="item.meal && item.meal.imageSrc"
          :src="`http://95.179.158.161:8080/image/${item.meal.imageSrc}`"
          alt=""
        />
        <h2 v-if="item.meal" class="mt-2">
          {{ item.meal.name }}
        </h2>
        <p v-if="item.meal && item.meal.category" class="mt-2">
          {{ item.description }} ( {{ item.meal.category.name }} )
        </p>
      </div>
    </v-row>

    <h3 class="mt-11 mb-16 text-center">
      По поводу сотриудничества и вопросов
      <nuxt-link to="/"> напишите нам! </nuxt-link>
    </h3>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    news: [
      {
        img: require("@/assets/news1.png"),
        type: "Вторые блюда",
        text:
          "У нас появилась акция.  При покупке второго блюда кофе в подарок."
      }
    ]
  }),
  computed: {
    topFour() {
      let arr = [];
      if (this.discounts?.discountList) {
        if (this.discounts.discountList[0])
          arr.push(this.discounts.discountList[0]);
        if (this.discounts.discountList[1])
          arr.push(this.discounts.discountList[1]);
        if (this.discounts.discountList[2])
          arr.push(this.discounts.discountList[2]);
        if (this.discounts.discountList[4])
          arr.push(this.discounts.discountList[4]);
      }
      console.log(arr);
      return arr;
    },
    len() {
      if (this.discounts?.discountList)
        return this.discounts.discountList.length;
    }
  },
  props: {
    discounts: Object
  }
};
</script>

<style scoped lang="scss">
* {
  font-family: $nun;
  font-weight: normal;
  font-size: 25px;
  line-height: 34px;
}
h1 {
  font-size: 30px;
  line-height: 41px;
  color: #000000;
}
h2 {
  font-size: 20px;
  line-height: 27px;
  color: rgba(0, 0, 0, 0.4);
}
h3 {
  font-size: 20px;
  line-height: 27px;

  a {
    text-decoration: none;
  }
}
p {
  font-family: $nun;
  font-weight: normal;
  font-size: 25px;
  line-height: 34px;
  color: #000000;
}
.news-item {
  width: 100%;
  max-width: 239px;

  img {
    width: 100%;
    max-width: 239px;
    height: 216px;
  }
}
</style>
