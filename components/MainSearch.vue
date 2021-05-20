<template>
  <v-row
    class="row justify-space-between align-center "
    :class="[$route.path == '/' ? 'mt-9' : 'mt-0']"
  >
    <v-row
      class="col-7 align-start"
      :class="[$route.path == '/' ? '' : 'pb-0']"
    >
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
            class="col-5 my-input1"
            prepend-inner-icon="mdi-calendar"
            readonly
            solo
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
      <v-text-field
        class="col-3 my-input2"
        v-model="time"
        prepend-inner-icon="mdi-clock"
        solo
        v-mask="'##:##'"
        :rules="timeRules"
      ></v-text-field>

      <v-text-field
        class="col-4 my-input3"
        v-model="personCount"
        prepend-inner-icon="mdi-account"
        solo
        type="number"
        min="1"
        :rules="personRules"
      ></v-text-field>
    </v-row>
    <v-col class="col-3 " :class="[$route.path == '/' ? '' : 'pb-0']">
      <v-text-field
        v-model="restaurant"
        prepend-inner-icon="mdi-magnify"
        solo
        placeholder="Локация, ресторан или кафе"
      ></v-text-field>
    </v-col>
    <v-col class="col-2 " :class="[$route.path == '/' ? '' : 'pb-0']">
      <button
        @click="goSearch"
        class="d-flex justify-center align-center btn mb-7"
        :class="[$route.path == '/' ? '' : 'btn-red']"
      >
        Найти место
      </button>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    date: "",
    time: "",
    restaurant: "",
    personCount: 1,
    dateMenu: false,
    timeRules: [
      v => parseInt(v.split(":")[0]) <= 24 || "Неправильное время",
      v => parseInt(v.split(":")[1]) <= 59 || "Неправильное время"
    ],
    personRules: [v => parseInt(v) < 40 || "Максимум"]
  }),
  created() {
    this.time = this.$moment()
      .add("hours", 1)
      .format("HH:mm");
    this.date = this.$moment().format("YYYY-MM-DD");
  },
  methods: {
    async goSearch() {
      let startTime = this.date + " " + this.time + ":00";
      let endTime = this.$moment(startTime)
        .add("hour", 3)
        .format("YYYY-MM-DD HH:mm:ss");
      let filter = {
        startTime: startTime,
        endTime: endTime,
        person: parseInt(this.personCount),
        filter: this.restaurant
      };
      this.$store.commit("setQuery", filter);
      this.$router.push({
        path: `/Restaurants`,
        query: {
          ...filter
        }
      });
      if (this.$route.name == "Restaurants") this.$emit("goSearch");
    }
  }
};
</script>

<style scoped lang="scss">
* {
  font-family: $open;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #000;
  &:placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
}
.btn {
  width: 137px;
  height: 35px;

  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;

  background: $theme-color;
  border: 1px solid $theme-color;
  border-radius: 5px;

  transition: 0.22s;

  &:hover {
    background: white;
    color: $theme-color;
  }
  &-red {
    background: $red-color;
    &:hover {
      background: #fff;
      color: $red-color;
    }
  }
}
.v-input {
  max-width: unset;
}
</style>
