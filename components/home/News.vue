<template>
  <v-container> 
    <h1 class="mx-auto text-center text-uppercase mt-13">НОВОСТИ</h1>

    <v-row class="news mt-13">
      <div class="news-item mx-auto mt-5" v-for="item,index in 4" :key="index">
        <img :src="news[0].img" alt="">
        <h2 class="mt-2">{{news[0].type}}</h2>
        <p class="mt-2">{{news[0].text}}</p>

      </div>
    </v-row> 

    <h3 class="mt-11 mb-16 text-center">По поводу сотриудничества и вопросов <nuxt-link to="/"> напишите нам! </nuxt-link></h3>
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
  })
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
h3{
  font-size: 20px;
  line-height: 27px;

  a{
    text-decoration: none;
  }
}
.news-item{
  width: 100%;
  max-width: 239px;

  img{
    width: 100%;
    max-width: 239px;
    height: 216px;
  }
}
</style>
