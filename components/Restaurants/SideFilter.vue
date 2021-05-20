<template>
  <div class="">
    <div @click="openModal" class="map">
      <img class="map-default" src="@/assets/map.svg" alt="" />
    </div>
    <div v-if="false" class="options">
      <div class="">
        <img src="@/assets/chef-hat 1.svg" alt="" />
        Опции
      </div>
      <v-radio-group class="by-name" v-model="option" column>
        <v-radio
          class="ml-3"
          color="#F35757"
          v-for="(item, index) in options"
          :key="index"
          :label="item.name"
          :value="item.id"
        >
        </v-radio>
      </v-radio-group>
    </div>
    <!-- <div class="line"></div> -->
    <div class=" mt-11">
      <div class="">
        <img src="@/assets/money (2).svg" alt="" />
        Средний чек
      </div>
      <v-radio-group class="by-name" v-model="price" column>
        <v-radio
          class="ml-3"
          color="#F35757"
          v-for="(item, index) in prices"
          :key="index"
          :label="item.name"
          :value="item.id"
        >
        </v-radio>
      </v-radio-group>
    </div>
    <div class="line"></div>
    <div class="00">
      <div class="">
        <img src="@/assets/like 1.svg" alt="" />
        Рейтинг
      </div>
      <v-radio-group class="by-name" v-model="rating" column>
        <v-radio
          class="ml-3"
          color="#F35757"
          v-for="(item, index) in ratings"
          :key="index"
          :label="item.rating"
          :value="item.id"
        >
          <template v-slot:label>
            <div class="d-flex align-center">
              <img v-if="item.rating == '5'" src="@/assets/rate5.svg" alt="" />
              <img v-if="item.rating == '4'" src="@/assets/rate4.svg" alt="" />
              <img v-if="item.rating == '3'" src="@/assets/rate3.svg" alt="" />
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </div>

    <div v-if="mapModal" @click="closeModal" class="modalka">
      <div class="close">
        <v-icon>close-circle</v-icon>
      </div>
      <div @click.stop class="map-modal">
        <yandex-map
          id="map"
          :controls="[
            'geolocationControl',
            'rulerControl',
            'typeSelector',
            'zoomControl'
          ]"
          style="width: 100%; height: 500px;"
          :coords="coords"
          :zoom="zoom"
          @actionend="changeCoords"
        >
          <ymap-marker
            v-for="(item, index) in map"
            :key="index"
            :coords="[item.latitude, item.longitude]"
            :marker-id="`marker_${index}`"
            hint-content=""
          />
        </yandex-map>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: {
      stars: null,
      maxPrice: null,
      minPrice: null
    },
    coords: [43.236823, 76.914914],
    zoom: 15,
    map: [
      {
        latitude: 43.236823,
        longitude: 76.914914,
        name: "SmartPoint"
      }
    ],
    mapModal: false,

    option: "",
    price: "",
    rating: "",
    options: [
      {
        name: "all",
        id: 1
      },
      {
        name: "delivery",
        id: 2
      },
      {
        name: "selfdelivery",
        id: 3
      }
    ],
    prices: [
      {
        name: "KZT 1000 - 3000",
        id: 1
      },
      {
        name: "KZT 3000 - 5000",
        id: 2
      },
      {
        name: "KZT 5000 - 7000",
        id: 3
      },
      {
        name: "KZT 7000 - 10000",
        id: 4
      }
    ],
    ratings: [
      {
        rating: "5",
        id: 1
      },
      {
        rating: "4",
        id: 2
      },
      {
        rating: "3",
        id: 3
      }
    ]
  }),
  watch: {
    rating() {
      this.value.stars = parseInt(this.rating);
      console.log(this.value);
      this.$emit("filterby", this.value);
    },
    price() {
      if (parseInt(this.price) == 1) {
        this.value.minPrice = 1000;
        this.value.maxPrice = 3000;
      } else if (parseInt(this.price) == 2) {
        this.value.minPrice = 3000;
        this.value.maxPrice = 5000;
      } else if (parseInt(this.price) == 3) {
        this.value.minPrice = 5000;
        this.value.maxPrice = 7000;
      } else if (parseInt(this.price) == 4) {
        this.value.minPrice = 7000;
        this.value.maxPrice = 10000;
      }
      console.log(this.value);
      this.$emit("filterby", this.value);
    }
  },
  methods: {
    changeCoords(e) {
      console.log(e);
    },
    openModal() {
      this.mapModal = true;
    },
    closeModal() {
      this.mapModal = false;
    }
  }
};
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  max-width: 225px;
  height: 70px;
  background: #eef8fb;

  &-default {
    cursor: pointer;
    width: 100%;
    max-width: 225px;
    height: 100%;
    max-height: 70px;
  }
}
.modalka {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .close {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 24px;
    height: 24px;
    z-index: 10;
    cursor: pointer;
  }
}

.map-modal {
  position: absolute;
  width: 80%;
  height: 100%;
  max-height: 500px;
  background: #eef8fb;
}

.line {
  height: 2px;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  margin-bottom: 19px;
}
</style>
