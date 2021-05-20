<template>
  <div class="">
    <div class="search">
      <v-container class="pb-0 pt-5">
        <MainSearch @goSearch="fetchRestaurants" />
      </v-container>
    </div>

    <v-container class="mt-16">
      <v-row>
        <v-col class="col-md-3">
          <SideFilter @filterby="filterby" />
        </v-col>

        <v-col class="col-md-9">
          <SortBy :items="length" @sortby="sortBy" />

          <div v-if="restaurants" class="">
            <div class="" v-for="(item, index) in restaurants" :key="index">
              <RestaurantBox :item="item" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SideFilter from "@/components/Restaurants/SideFilter";
import SortBy from "@/components/Restaurants/SortBy";
import RestaurantBox from "@/components/Restaurants/RestaurantBox";
export default {
  async asyncData({ $axios, query }) {
    const restaurants = await $axios.$get(`restaurant/search/`, {
      params: query
    });
    let length = restaurants.length || 0;
    return { restaurants, length };
  },
  data: () => ({
    boxes: [
      {
        image: require("@/assets/smile2 1.png"),
        name: "OZYURT",
        place: "ЕСЕНТАЙ",
        rating: 4.23,
        avg_price: "KZT 1500 - 3500",
        type: "Международная",
        status: "Новый",
        address: {
          city: "Алматы",
          address: "alfarabi 189,"
        },
        times: [
          "12:00",
          "14:00",
          "12:00",
          "23:30",
          "12:00",
          "14:00",
          "22:00",
          "12:00"
        ],
        text:
          "На данный момент онлайн-возможности недоступны в течение 2,5 часов после вашего запроса. У вас есть на уме другое время?"
      },
      {
        image: "",
        name: "OZYURT",
        place: "ЕСЕНТАЙ",
        rating: 4.23,
        avg_price: "KZT 1500 - 3500",
        type: "Международная",
        status: "Новый",
        address: {
          city: "Алматы",
          address: "alfarabi 189,"
        },
        times: [],
        text:
          "На данный момент онлайн-возможности недоступны в течение 2,5 часов после вашего запроса. У вас есть на уме другое время?"
      }
    ]
  }),
  components: {
    RestaurantBox,
    SortBy,
    SideFilter
  },
  mounted() {
    this.$store.commit("setQuery", this.$route.query);
  },
  methods: {
    filterby(value) {
      this.$route.query.maxPrice = value.maxPrice;
      this.$route.query.minPrice = value.minPrice;
      this.$route.query.stars = value.stars;
      this.fetchRestaurants();
    },
    sortBy(value) {
      this.$route.query.sortEnum = value;
      this.fetchRestaurants();
    },
    async fetchRestaurants() {
      this.$store.commit("setQuery", this.$route.query);
      console.log(this.$store.state);
      await this.$axios
        .$get(`restaurant/search/`, {
          params: this.$route.query
        })
        .then(response => {
          this.restaurants = response;
          this.length = this.restaurants.length;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  background: $theme-color;
}
</style>
