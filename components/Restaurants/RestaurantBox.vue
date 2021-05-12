<template>
  <div v-if="item" class="">
    <v-col class="box">
      <div class="image">
        <nuxt-link to="/">
          <img v-if="item.image" :src="item.image" alt="" />
          <img v-else src="@/assets/default.svg" alt="" />
        </nuxt-link>
      </div>
      <div class="">
        <nuxt-link to="/">
          <h1 class="ml-2">{{ item.name }} - {{ item.place }}</h1>
        </nuxt-link>

        <v-rating
          class=""
          length="5"
          readonly
          size="15"
          :value="item.rating"
          background-color="#F35757 lighten-1"
          color="#F35757"
        >
        </v-rating>

        <h2 class="ml-2">
          {{ avgPrice(item.avg_price) }} &bull; {{ item.type }} &bull;
          {{ item.address.city }}
        </h2>

        <div v-if="item.times.length > 0" class="d-flex row ml-2 mt-3">
          <div class="times" v-for="(i, index) in item.times" :key="index">
            {{ i }}
          </div>
        </div>
        <h2 v-else class="ml-2 mt-4">
          {{ item.text }}
        </h2>
      </div>
    </v-col>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    item: Object
  },
  created() {
    console.log(this.item);
  },
  methods: {
    avgPrice(price) {
      return price;
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  font-family: $open;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 14px;

  color: rgba(0, 0, 0, 0.65);
}
h1 {
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #3e8ea9;

  &:hover {
    color: $theme-color;
  }
}
h2 {
  color: rgba(0, 0, 0, 0.8);
}
.box {
  padding-top: 33px;
  padding-bottom: 33px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);

  gap: 20px;

  display: flex;
}
a {
  text-decoration: none;
}

.image {
  width: 100%;
  max-width: 210px;
  height: 140px;
  background: #ccc;
  border-radius: 5px;

  cursor: pointer;
  img {
    width: 100%;
    max-width: 210px;
    height: 140px;
    border-radius: 5px;
  }
}

.times {
  width: 50px;
  height: 20px;

  margin-right: 14px;
  margin-top: 14px;

  border: 1px solid rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  border-radius: 2px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
