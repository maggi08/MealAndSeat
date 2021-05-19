<template>
  <div class="">
    <v-row class="justify-space-between align-center">
      <h1>Категории</h1>
      <v-btn @click="addRest = true">
        Добавить категорию
        <v-icon class="ml-3" color="primary">
          mdi-plus-circle
        </v-icon>
      </v-btn>
    </v-row>

    <v-row class="flex-column" v-if="categories">
      <v-col
        v-for="(item, index) in categories.categoryList"
        :key="index"
        class="pa-0"
      >
        <div
          class="rest align-center"
          :class="{ 'rest-white': index % 2 == 0 }"
        >
          <div class="rest-item">{{ item.id }}</div>
          <div class="rest-item">{{ item.name }}</div>
          <div class="rest-item d-flex">
            <p
              class="mr-3 font-weight-bold"
              v-for="(child, cindex) in item.parentCategory"
              :key="cindex"
            >
              {{ child }}
            </p>
          </div>
          <div class="rest-item d-flex align-center">
            <v-icon @click="changeCategory(item)" class="change" color="success"
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
                  <p class="label">Название категории</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="newcategory.name"
                    height="30"
                    :rules="nameRules"
                    placeholder="Бухар жырау 75/2"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col class="col-12 pa-0">
                  <p class="label">Индекс Категории</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="newcategory.parentCategory"
                    height="30"
                    type="number"
                    min="0"
                    :rules="numberRules"
                    placeholder="12"
                    solo
                    outlined
                    required
                  ></v-text-field>
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
    const categories = await $axios.$get(`category/`);
    // const parents = await $axios.$get(`category/parents/`);
    return { categories };
  },
  layout: "admin",
  data: () => ({
    apitype: "post",
    addRest: false,
    newcategory: {},
    nameRules: [v => !!v || "Поле обязательно"],
    numberRules: [v => !!v || "Поле обязательно"],
    emailRules: [
      v => !!v || "E-mail обязательно",
      v => /.+@.+/.test(v) || "E-mail не валидный"
    ],
    telRules: [v => !!v || "Поле обязательно"]
  }),
  mixins: [toastedMixin],
  created() {
    this.fetchcategory();
  },
  methods: {
    async fetchcategory() {
      await this.$axios
        .$get(`category/`)
        .then(response => {
          this.categories = response;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async changeCategory(item) {
      this.addRest = true;
      this.newcategory.name = item.name;
      this.newcategory.parentCategory = item.id;
      this.apitype = "put";
    },
    async deleteCategory(id) {
      await this.$axios
        .$delete(`category/${id}`)
        .then(res => {
          this.fetchcategory();
          this.showToasted("Удалено", "success");
        })
        .catch(err => {
          this.showToasted("Что то пошло не так", "error");
        });
    },
    async addCategory() {
      if (!this.$refs.formRest.validate()) return;

      if (this.apitype == "put") {
        await this.$axios
          .$put(`category/${item.id}`, null, {
            params: { ...this.newcategory }
          })
          .then(response => {
            this.showToasted("Изменено успешно", "success");
            this.addRest = false;
            this.fetchcategory();
          })
          .catch(err => {
            this.showToasted("Что то пошло не так", "error");
          });
      } else {
        await this.$axios
          .$post(`category/`, null, { params: { ...this.newcategory } })
          .then(response => {
            this.showToasted("Добавлено успешно", "success");
            this.addRest = false;
            this.fetchcategory();
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
  grid-template-columns: 50px 20% 1fr 50px;
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
