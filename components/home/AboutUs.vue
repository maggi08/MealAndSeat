<template>
  <div class="bg-color">
    <v-container>
      <h1 class="tex-center mt-16 tex-uppercase">О НАС</h1>
      <v-row class="justify-center align-center mt-16">
        <v-col class="col-12 col-md-4 text-center mt-3">
          <img src="@/assets/aboutus1.svg" alt="" />
          <h2 class="mt-3 mx-auto">
            Это очень удобная платформа где наши клиенты смогуть бронировать
            места в ресторанах и сделать заказ на питание. Всем очень советуем
            это приложение. Делайте репост
          </h2>
        </v-col>
        <v-col class="col-12 col-md-4 text-center mt-3">
          <img src="@/assets/aboutus2.svg" alt="" />
          <h2 class="mt-3 mx-auto">
            Это очень удобная платформа где наши клиенты смогуть бронировать
            места в ресторанах и сделать заказ на питание. Всем очень советуем
            это приложение. Делайте репост
          </h2>
        </v-col>
        <v-col class="col-12 col-md-4 text-center mt-3">
          <img src="@/assets/aboutus3.svg" alt="" />
          <h2 class="mt-3 mx-auto">
            Это очень удобная платформа где наши клиенты смогуть бронировать
            места в ресторанах и сделать заказ на питание. Всем очень советуем
            это приложение. Делайте репост
          </h2>
        </v-col>
      </v-row>

      <button class="mt-16 mb-14 mx-auto">ПОДРОБНЕЕ</button>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
* {
  font-family: $rob;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #000000;
}
h1 {
  font-size: 30px;
  line-height: 35px;
}
h2 {
  max-width: 400px;
}
button {
  font-size: 25px;
  line-height: 29px;
  color: $theme-color;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 400px;
  height: 50px;
  border: 1px solid $theme-color;
  box-sizing: border-box;
  border-radius: 20px;

  transition: 0.22s;

  &:hover{
    background: $theme-color;
    color: #fff;
  }
}
.bg-color{
  background: rgba(196, 196, 196, 0.3);
}
</style>
