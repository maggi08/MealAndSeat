<template>
  <div class="">
    <div class="search">
      <v-container class="pb-0 pt-5">
        <MainSearch />
      </v-container>
    </div>

    <v-container class="mt-16">
      <v-row>
        <v-col class="col-md-3">
          <SideFilter />
        </v-col>

        <v-col class="col-md-9">
          <SortBy :items="2" />
          <div class="" v-for="(item, index) in boxes" :key="index">
            <RestaurantBox :item="item" />
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
          "12:00",
        ],
        text:"На данный момент онлайн-возможности недоступны в течение 2,5 часов после вашего запроса. У вас есть на уме другое время?"
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
        times: [
        ],
        text:"На данный момент онлайн-возможности недоступны в течение 2,5 часов после вашего запроса. У вас есть на уме другое время?"
      }
    ]
  }),
  components: {
    RestaurantBox,
    SortBy,
    SideFilter
  }
};
</script>

<style scoped lang="scss">
.search {
  background: $theme-color;
}
</style>
