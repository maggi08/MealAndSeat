<template>
  <div class="">
    <v-row class="justify-space-between align-center">
      <h1>Блюда</h1>
      <v-btn @click="(addRest = true), (apitype = 'post')">
        Добавить блюдо
        <v-icon class="ml-3" color="primary">
          mdi-plus-circle
        </v-icon>
      </v-btn>
    </v-row>
    <v-row v-if="meals" class="flex-column">
      <div class="rest align-center" style="background: transparent">
        <div class="rest-item image"></div>
        <div class="rest-item">ID</div>
        <div class="rest-item">Название</div>
        <div class="rest-item d-flex">Категория</div>
        <div class="rest-item d-flex">Цена</div>
        <div class="">Закончено</div>
        <div class="">Особенности</div>
      </div>
      <v-col v-for="(item, index) in meals.mealList" :key="index" class="pa-0">
        <div
          class="rest align-center"
          :class="{ 'rest-white': index % 2 == 0 }"
        >
          <div class="rest-item image">
            <img
              :src="`http://95.179.158.161:8080/image/${item.imageSrc}`"
              width="50px"
              height="50px"
              alt=""
            />
          </div>
          <div class="rest-item">{{ item.id }}</div>
          <div class="rest-item">{{ item.name }}</div>
          <div v-if="item.category" class="rest-item d-flex">
            {{ item.category.name }} ({{ item.category.id }})
          </div>
          <div class="rest-item d-flex">{{ item.price }} KZT</div>
          <div v-if="item.finished" class="rest-item d-flex">+</div>
          <div v-else class="rest-item d-flex">-</div>
          <div class="rest-item d-flex">{{ item.features }}</div>

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
                <v-col class="col-12 pa-0 ">
                  <p class="label">Название</p>
                  <v-text-field
                    class="mt-3"
                    v-model="meal.name"
                    :rules="nameRules"
                    placeholder="Плов"
                    outlined
                    solo
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="col-12 pa-0">
                  <p class="label">Категория</p>
                  <v-select
                    v-if="categories.categoryList"
                    class="mt-3 font-weight-small"
                    v-model="meal.categoryId"
                    height="30"
                    :items="categories.categoryList"
                    :rules="nameRules"
                    item-text="name"
                    item-value="id"
                    placeholder="Восточная"
                    solo
                    outlined
                    required
                  >
                    <template v-slot:item="{ item }">
                      <div v-if="item" class="ml-3">
                        {{ item.name }}
                        <span v-if="item.parentCategory"
                          >({{ item.parentCategory.name }})</span
                        >
                      </div>
                    </template>
                  </v-select>
                </v-col>

                <v-col class="col-12 pa-0">
                  <p class="label">Особенности</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="meal.features"
                    height="30"
                    :rules="nameRules"
                    placeholder="острый"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="col-12 pa-0">
                  <p class="label">Цена</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="meal.price"
                    height="30"
                    type="number"
                    min="0"
                    :rules="numberRules"
                    placeholder="2000"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="col-12 pa-0 ">
                  <p class="label">Описание</p>
                  <v-textarea
                    class="mt-3"
                    v-model="meal.description"
                    :rules="nameRules"
                    placeholder="Описание блюда"
                    outlined
                    solo
                    required
                  ></v-textarea>
                </v-col>
                <v-col class="col-12 pa-0">
                  <p class="label">Закончилось</p>
                  <v-checkbox
                    class="mt-3 font-weight-small"
                    v-model="meal.finished"
                    height="30"
                    solo
                    outlined
                  ></v-checkbox>
                </v-col>
                <v-col class="col-12 pa-0">
                  <p class="label">Время готовки</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="meal.time"
                    height="30"
                    type="number"
                    min="1"
                    :rules="numberRules"
                    placeholder="12 мин"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col class="col-12 pa-0">
                  <v-file-input
                    show-size
                    truncate-length="15"
                    v-model="meal.file"
                    accept="image/png, image/jpeg, image/bmp"
                  ></v-file-input>
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
    const meals = await $axios.$get(`meal/`);
    const categories = await $axios.$get(`category/`);
    return { meals, categories };
  },
  layout: "admin",
  data: () => ({
    apitype: "post",
    changeId: 0,
    addRest: false,
    meal: {},
    nameRules: [v => !!v || "Поле обязательно"],
    numberRules: [v => !!v || "Поле обязательно"],
    emailRules: [
      v => !!v || "E-mail обязательно",
      v => /.+@.+/.test(v) || "E-mail не валидный"
    ],
    telRules: [v => !!v || "Поле обязательно"]
  }),
  mixins: [toastedMixin],
  methods: {
    async fetchMeal() {
      await this.$axios
        .$get(`meal/`)
        .then(response => {
          this.meals = response;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async changeCategory(item) {
      this.addRest = true;
      this.meal = {};
      this.meal.position = item.position;
      this.meal.personCount = item.personCount;
      this.meal.forChildren = item.forChildren;
      this.meal.name = item.name;
      this.meal.reservePrice = item.reservePrice;
      this.meal.name = item.name;
      this.meal.categoryId = item.category.id;
      this.meal.description = item.description;
      this.meal.features = item.features;
      this.meal.price = item.price;
      this.meal.time = item.time;
      this.meal.finished = item.finished;
      this.apitype = "put";
      this.changeId = item.id;
    },
    async deleteCategory(id) {
      await this.$axios
        .$delete(`meal/${id}`)
        .then(res => {
          this.fetchMeal();
          this.showToasted("Удалено", "success");
        })
        .catch(err => {
          this.showToasted("Что то пошло не так", "error");
        });
    },
    async addCategory() {
      if (!this.$refs.formRest.validate()) return;

      const formData = new FormData();
      for (const data in this.meal) {
        formData.append(data, this.meal[data]);
      }

      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      if (this.apitype == "put") {
        await this.$axios
          .$put(`meal/${this.changeId}`, null, {
            params: { ...this.meal }
          })
          .then(response => {
            this.showToasted("Изменено успешно", "success");
            this.addRest = false;
            this.fetchMeal();
          })
          .catch(err => {
            this.showToasted("Что то пошло не так", "error");
          });
      } else {
        await this.$axios
          .$post(`meal/`, formData, config)
          .then(response => {
            this.showToasted("Добавлено успешно", "success");
            this.addRest = false;
            this.fetchMeal();
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
  grid-template-columns: 50px 4% 20% 14% 10% 11% 15% 60px;
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
