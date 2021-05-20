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
        <div class="col-12 pa-0 ">
          <h2>Время</h2>
          <v-text-field
            class="mt-0 pt-0"
            v-model="time"
            v-mask="'##:##'"
            :rules="timeRules"
          ></v-text-field>
        </div>
        <div class="col-12 pa-0 ">
          <h2>Дата</h2>
          <v-menu
            ref="datemenu"
            v-model="dateMenu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                class="col-12 pa-0 my-input1"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
              :min="$moment().format('YYYY-MM-DD')"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dateMenu = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.datemenu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <!-- <v-text-field
              class="mt-0 pt-0"
              v-model="time"
              v-mask="'##:##'"
              :rules="timeRules"
            ></v-text-field> -->
        </div>
        <button @click="book" class="btn-book ">Бронировать</button>
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
    dateMenu: false,
    personCount: 1,
    time: "",
    date: "",
    coords: [43.236823, 76.914914],
    zoom: 15,
    personRules: [v => parseInt(v) < 40 || "Максимум"],
    timeRules: [
      v => parseInt(v.split(":")[0]) <= 24 || "Неправильное время",
      v => parseInt(v.split(":")[1]) <= 59 || "Неправильное время"
    ]
  }),
  methods: {
    async book() {
      let api = `client/order/make-order-not-registered`;
      if (this.$auth.loggedIn) api = `client/order/make-order`;

      let startTime = this.date + " " + this.time + ":00";
      let endTime = this.$moment(startTime)
        .add("hour", 3)
        .format("YYYY-MM-DD HH:mm:ss");

      // console.log(this.$store.state);
      let query = this.$store.state.query;
      let params = {
        ...this.$route.query,
        ...query,
        restaurantId: parseInt(this.$route.query.id),
        startTime: startTime,
        endTime: endTime,
        personCount: this.personCount,
        children: true,
        features: "sa",
        position: "STANDARD"
      };
      // this.$route.query = params;
      await this.$axios
        .$post(`${api}`, null, {
          params: {
            ...params
          }
        })
        .then(response => {
          console.log(response);
          this.$router.push({ path: `/Booking`, params: params });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
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
  padding-top: 300px;
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
