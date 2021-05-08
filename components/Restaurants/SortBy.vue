<template>
  <div>
    <v-col class="d-flex justify-space-between align-center">
      {{ itemsCount }}
      <div class="sort">
        <v-autocomplete
          style="border-radius: 5px; margin-top: 20px !important;"
          color="#00D1CE"
          class="pl-20 "
          :height="25"
          no-data-text="Ничего не найдено"
          background-color="white"
          v-model="sortby"
          :items="sortOptions"
          dense
          solo
        >
        </v-autocomplete>
      </div>
    </v-col>
  </div>
</template>

<script>
export default {
  data: () => ({
    sortby: "",
    sortOptions:[
      "Новые",
      "Популярности",
      "Уменьшение рейтинга",
      "Увеличение рейтинга",
      "Убыванию цены",
      "Возрастанию цены",
    ]
  }),
  props: {
    items: Number || 1
  },
  computed: {
    itemsCount() {
      if (this.items == 1)
        return this.items + " ресторан доступен в " + this.City;
      else if (
        this.items % 10 == 2 ||
        this.items % 10 == 3 ||
        this.items % 10 == 4
      )
        return this.items + " ресторана доступны в " + this.city;
      else if (this.items == 0) return "Не найдено доступных ресторанов";
      else return this.items + " ресторанов доступны в " + this.сity;
    },
    city() {
      return "Алматы";
    }
  }
};
</script>

<style scoped lang="scss">
.sort{
  width: 158px;

}
</style>
