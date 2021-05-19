<template>
  <div class="">
    <v-row class="justify-space-between align-center">
      <h1>Скидки</h1>
      <v-btn @click="(addRest = true), (apitype = 'post')">
        Добавить скидку
        <v-icon class="ml-3" color="primary">
          mdi-plus-circle
        </v-icon>
      </v-btn>
    </v-row>

    <v-row v-if="discounts" class="flex-column">
      <div class="rest align-center" style="background: transparent">
        <div class="rest-item">ID</div>
        <div class="rest-item">Описание</div>
        <div class="rest-item d-flex">Блюдо</div>
        <div class="rest-item d-flex">Скидка</div>
      </div>
      <v-col
        v-for="(item, index) in discounts.discountList"
        :key="index"
        class="pa-0"
      >
        <!-- <pre>{{ item }}</pre> -->

        <div
          class="rest align-center"
          :class="{ 'rest-white': index % 2 == 0 }"
        >
          <div class="rest-item d-flex">{{ item.id }}</div>
          <div class="rest-item d-flex">{{ item.description }}</div>
          <div v-if="item.meal" class="rest-item d-flex">
            {{ item.meal.name }} людей
          </div>
          <div class="rest-item d-flex">{{ item.percentage }}</div>

          <div class="rest-item d-flex align-center">
            <v-icon
              @click="changeCategory(item)"
              class="change mr-3"
              color="success"
              >mdi-file-edit-outline</v-icon
            >
            <v-icon
              @click="deleteCategory(item.id)"
              class="change"
              color="error"
              >mdi-trash-can-outline</v-icon
            >
          </div>
        </div>
      </v-col>
    </v-row>
    <template>
      <div class="text-center modalka ">
        <v-dialog v-model="addRest" width="500">
          <v-card class="py-5 px-12">
            <v-col class="pa-0">
              <v-form
                ref="formRest"
                @submit.prevent="addCategory()"
                class="mt-8"
              >
                <v-col class="col-12 pa-0">
                  <p class="label">Блюдо</p>
                  <v-select
                    v-if="meal.mealList"
                    class="mt-3 font-weight-small"
                    v-model="discount.mealId"
                    :items="meal.mealList"
                    item-text="name"
                    item-value="id"
                    height="30"
                    min="0"
                    :rules="nameRules"
                    solo
                    outlined
                    required
                  >
                    <template v-slot:item="{ item }">
                      {{ item.name }}
                      <div v-if="item.category" class="ml-3">
                        ({{ item.category.name }})
                      </div>
                    </template>
                  </v-select>
                </v-col>

                <v-col class="col-12 pa-0">
                  <p class="label">Процент</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="discount.percentage"
                    height="30"
                    type="number"
                    min="0"
                    max="100"
                    :rules="numberRules"
                    placeholder="10%"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col class="col-12 pa-0">
                  <p class="label">Описание скидки</p>
                  <v-textarea
                    class="mt-3"
                    v-model="discount.description"
                    :rules="nameRules"
                    placeholder="Праздник айт"
                    outlined
                    solo
                    required
                  ></v-textarea>
                </v-col>

                <v-col class="col-12 d-flex justify-center">
                  <v-btn type="submit" class="mx-auto my-btn" color="primary">
                    Создать
                  </v-btn>
                </v-col>
              </v-form>
            </v-col>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import toastedMixin from "@/mixins/toasted.mixin";
export default {
  async asyncData({ $axios }) {
    const discounts = await $axios.$get(`discount/`);
    const meal = await $axios.$get(`meal/`);
    return { discounts, meal };
  },
  layout: "admin",
  data: () => ({
    apitype: "post",
    positions: ["STANDARD", "WINDOW", "DOOR", "TAPCHAN", "OUTSIDE"],
    changeId: 0,
    addRest: false,
    discount: {},
    nameRules: [v => !!v || "Поле обязательно"],
    numberRules: [
      v => !!v || "Поле обязательно",
      v => (v >= 0 && v <= 100) || "от 0 до 100"
    ],
    emailRules: [
      v => !!v || "E-mail обязательно",
      v => /.+@.+/.test(v) || "E-mail не валидный"
    ],
    telRules: [v => !!v || "Поле обязательно"]
  }),
  mixins: [toastedMixin],
  methods: {
    async fetchDiscount() {
      await this.$axios
        .$get(`discount/`)
        .then(response => {
          this.discounts = response;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async changeCategory(item) {
      this.addRest = true;
      this.discount = {};
      this.discount.mealId = item.meal.id;
      this.discount.description = item.description;
      this.discount.percentage = item.percentage;
      this.apitype = "put";
      this.changeId = item.id;
    },
    async deleteCategory(id) {
      await this.$axios
        .$delete(`discount/${id}`)
        .then(res => {
          this.fetchDiscount();
          this.showToasted("Удалено", "success");
        })
        .catch(err => {
          this.showToasted("Что то пошло не так", "error");
        });
    },
    async addCategory() {
      if (!this.$refs.formRest.validate()) return;
      if (this.$auth?.user?.restaurant?.id)
        this.discount.restaurantId = this.$auth.user.restaurant.id;
      if (this.apitype == "put") {
        await this.$axios
          .$put(`discount/${this.changeId}`, null, {
            params: { ...this.discount }
          })
          .then(response => {
            this.showToasted("Изменено успешно", "success");
            this.addRest = false;
            this.fetchDiscount();
          })
          .catch(err => {
            this.showToasted("Что то пошло не так", "error");
          });
      } else {
        await this.$axios
          .$post(`discount/`, null, { params: { ...this.discount } })
          .then(response => {
            this.showToasted("Добавлено успешно", "success");
            this.addRest = false;
            this.fetchDiscount();
          })
          .catch(err => {
            this.showToasted("Что то пошло не так", "error");
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.rest {
  display: grid;
  grid-template-columns: 50px 1fr 25% 8% 60px;
  grid-gap: 10px;
  width: 100%;
  padding: 12px;
  background: rgba(124, 44, 107, 0.3);
  &-item {
    overflow: hidden;
  }
  &-white {
    background: rgba(196, 196, 196, 0.1);
  }
}

.image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

p {
  font-size: 12px;
}
.change {
  cursor: pointer;
}
</style>
