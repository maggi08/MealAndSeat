<template>
  <div class="container ">
    <div class="content">
      <div class="mt-4 green-box d-flex align-items-center">
        <img class="img" src="@/assets/green-check.svg" alt="" />
        <div class="d-flex flex-column justify-content-center ml-4">
          <h1 class="mt-1">Спасибо, Самат! Ваше бронирование подтверждено.</h1>
          <p class="mt-2">Подтверждение № 13465</p>
        </div>
      </div>
      <div class="boxes">
        <div class="rest-box d-flex align-center">
          <img class="img" :src="require('@/assets/ozyurt.png')" alt="" />
          <div class="ml-4">
            <h1>OZYURT - ЕСЕНТАЙ</h1>
            <p class="mt-2">
              <v-icon class="mr-2">mdi-calendar</v-icon>
              Понедельник, Апрель 26, 2021, 18:00
            </p>
            <p class="mt-2">
              <v-icon class="mr-2">mdi-account</v-icon>
              2 человека (Летник)
            </p>
            <div class="d-flex mt-3">
              <button class="btn mr-3 ml-3">Изменить</button> |
              <button class="btn mr-3 ml-3">Отменить</button>
            </div>
          </div>
        </div>
        <div class="line"></div>

        <div class="d-flex friends align-center">
          <button class="mr-5">
            <v-icon class="mr-2">mdi-account-multiple</v-icon>Пригласить друзей
          </button>
          <button class="ml-5">
            <v-icon class="mr-2">mdi-calendar</v-icon>Добавить в календарь
          </button>
        </div>
      </div>

      <div class="details boxes">
        <div class="d-flex align-center">
          <img src="@/assets/calendar-red.svg" alt="" />
          <h1 class="ml-7">
            Детали бронирования
          </h1>
        </div>
      </div>

      <div
        class="boxes mt-10 mb-10 d-flex location align-center justify-space-between"
      >
        <div class="">
          <h1>OZYURT - ЕСЕНТАЙ</h1>
          <p class="mt-7">
            Ритц-Карлтон, Астана, 3-й этаж, Астана
          </p>
          <p class="blue-color">8 (7172) 73 40 00</p>

          <p class="mt-6 red-color">
            Просмотр часов, транспорта и других сведений >
          </p>
        </div>
        <div class="my-map">
          <client-only>
            <yandex-map
              id="map"
              :controls="[
                'geolocationControl',
                'rulerControl',
                'typeSelector',
                'zoomControl'
              ]"
              style="width: 196px; height: 134px;"
              :coords="coords"
              :zoom="zoom"
            >
              <ymap-marker
                :coords="coords"
                :marker-id="`marker`"
                hint-content=""
              />
            </yandex-map>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    coords: [43.236823, 76.914914],
    zoom: 15
  })
};
</script>

<style lang="scss" scoped>
* {
  font-family: $rob;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 20px;
}
.green-box {
  width: 100%;
  max-width: 700px;
  height: 92px;
  padding: 12px;
  padding-left: 26px;
  background: #55b68d;
  border-radius: 1px;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.9);
  h1 {
    font-size: 23px;
    line-height: 27px;
  }
}

.content {
  width: 100%;
  max-width: 700px;
}
.line {
  width: 100%;
  height: 2px;
  background: rgba(0, 0, 0, 0.2);
}
.rest-box {
  padding: 12px;
  .img {
    width: 127px;
    height: 134px;
    border-radius: 5px;
  }

  .btn {
    color: #3e8ea9;
    background: none;
    border: none;
    transition: 0.22s;
    &:hover {
      color: $red-color;
    }
    &:focus {
      outline: none;
    }
  }

  h1 {
    font-size: 35px;
    line-height: 41px;
  }
}
.boxes {
  box-shadow: 0px 10px 30px rgba(138, 149, 158, 0.1);
}
.friends {
  padding: 24px;
  button {
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    border-radius: 4px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    transition: 0.22s;
    &:hover {
      background: #ccc;
    }
  }
}

.details {
  margin-top: 40px;
  padding: 16px 36px;

  h1 {
    font-family: $open;
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 34px;
  }
}

.location {
  padding: 22px 12px;
  font-family: $open;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 34px;
  h1 {
    font-size: 35px;
    line-height: 41px;
  }
}

.blue-color {
  color: #2b9abf;
}
.red-color {
  color: $red-color;
}
</style>
