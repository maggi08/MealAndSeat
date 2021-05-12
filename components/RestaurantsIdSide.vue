<template>
  <div class="">
    <div class="side">
      <div class="card">
        <h1>Сделать бронь</h1>
        <h2 class="mt-5">Количество людей</h2>
        <v-text-field
          class="mt-0 pt-0"
          v-model="personCount"
          prepend-inner-icon="mdi-account"
          type="number"
          min="1"
          :rules="personRules"
        ></v-text-field>
        <div class="d-flex">
          <div class="col-6 pa-0 pr-3">
            <h2>Дата</h2>
            <v-text-field
              class="mt-0 pt-0"
              v-model="time"
              v-mask="'##:##'"
              :rules="timeRules"
            ></v-text-field>
          </div>
          <div class="col-6 pa-0 pr-3">
            <h2>Время</h2>
            <v-text-field
              class="mt-0 pt-0"
              v-model="time"
              v-mask="'##:##'"
              :rules="timeRules"
            ></v-text-field>
          </div>
        </div>
        <button class="btn-book ">Бронировать</button>
      </div>

      <div class="map">
        <client-only>
          <yandex-map
            id="map"
            :controls="[
              'geolocationControl',
              'rulerControl',
              'typeSelector',
              'zoomControl'
            ]"
            style="width: 100%; height: 161px;"
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

      <div class="mt-11 ">
        <div class="d-flex align-start mt-5">
          <img src="@/assets/office-building.svg" alt="" />
          <div class="ml-4">
            <h3>Локация</h3>
            <p class="mt-2">Алматы</p>
          </div>
        </div>
        <div class="d-flex align-start mt-5">
          <img src="@/assets/clock.svg" alt="" />
          <div class="ml-4">
            <h3>Время работы</h3>
            <p class="mt-2">
              Завтрак (шведский стол) подается с 6:30 до 10:30. Бизнес-ланч
              (Шведский стол) подается с 12:00. до 15:00 (Понедельник Пятница)
              Ужин по меню: 19:00. - 23:00 Каждый день Воскресный бранч подается
              с 12:30. до 16:00
            </p>
          </div>
        </div>
        <div class="d-flex align-start mt-5">
          <img src="@/assets/fork.svg" alt="" />
          <div class="ml-4">
            <h3>Кухни</h3>
            <p class="mt-2">Международная</p>
          </div>
        </div>

        <div class="d-flex align-start mt-5">
          <img src="@/assets/parking.svg" alt="" />
          <div class="ml-4">
            <h3>Парковочная зона</h3>
            <p class="mt-2">Нет</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    personCount: 1,
    time: "",
    coords: [43.236823, 76.914914],
    zoom: 15,
    personRules: [v => parseInt(v) < 40 || "Максимум"],
    timeRules: [
      v => parseInt(v.split(":")[0]) <= 24 || "Неправильное время",
      v => parseInt(v.split(":")[1]) <= 59 || "Неправильное время"
    ]
  })
};
</script>

<style lang="scss" scoped>
* {
  font-family: $rob;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
.side {
  position: relative;
  .card {
    position: absolute;
    right: 0;
    top: -20px;
    z-index: 100;
    margin-top: -50px;
    width: 232px;
    // height: 220px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    padding: 18px 15px;

    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    h1 {
      font-weight: bold;
      text-align: center;
      font-size: 17px;
      line-height: 20px;
    }

    h2 {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
    }
  }
}
.btn-book {
  width: 150px;
  height: 30px;
  margin: 0 auto;
  margin-top: 20px;
  background: #f35757;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.map {
  padding-top: 220px;
}

h3 {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  color: #000000;
}
</style>
