<template>
  <div class="bg-img">
    <v-container class="">
      <h1>ЗАКАЖИ СВОЕ ЛЮБИМОЕ БЛЮДО</h1>
      <v-row class="types justify-center align-center">
        <h2 class="item mx-auto" v-for="item,index in type" :key="index">#{{item}}</h2>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data:()=>({
    type:["asian", "european", "Chinease"],
  }),
};
</script>

<style scoped lang="scss">
* {
  font-family: $rob;
  font-weight: bold;
  font-size: 40px;
  line-height: 47px;
  text-align: center;
  color: #ffffff;
}

h1{
  margin-top: 103px;

}
h2{
  font-weight: 500;
  font-size: 28px;
  line-height: 41px;
  color: #000000;
}

img{
  width: 100%;
  height: 100%;
}
.bg-img{
  width: 100%;
  height: 100%;
  background: url("@/assets/foodtype.png") no-repeat center center;
}
.types{
  margin-top: 32px;
  margin-bottom: 158px;

  .item{
    padding: 4px 42px;
    background: #FFFFFF;
    border-radius: 30px;
  }
}
</style>
