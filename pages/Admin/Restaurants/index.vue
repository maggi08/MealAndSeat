<template>
  <div class="">
    <v-row class="justify-space-between align-center">
      <h1>Рестораны</h1>
      <v-btn @click="(addRest = true), (restaurant = {}), (apitype = 'post')">
        Добавить ресторан
        <v-icon class="ml-3" color="primary">
          mdi-plus-circle
        </v-icon>
      </v-btn>
    </v-row>

    <v-row class="flex-column" v-if="restaurants">
      <v-col
        v-for="(item, index) in restaurants.restaurantList"
        :key="index"
        class="pa-0"
      >
        <div
          class="rest align-center"
          :class="{ 'rest-white': index % 2 == 0 }"
        >
          <div class="rest-item image">
            <img
              :src="`http://95.179.158.161:8080/image/${item.imageSrc}`"
              width="40px"
              height="40px"
              alt=""
            />
          </div>
          <div class="rest-item">{{ item.name }}</div>
          <div class="rest-item" v-if="item.admin">
            {{ item.admin.name }} {{ item.admin.surname }}
          </div>
          <div class="rest-item" v-if="item.admin">{{ item.admin.email }}</div>
          <div class="rest-item">{{ item.address }}</div>
          <div class="rest-item d-flex align-center">
            <v-icon @click="changeRest(item)" class="change" color="success"
              >mdi-file-edit-outline</v-icon
            >
            <v-icon @click="deleteRest(item.id)" class="change" color="error"
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
                @submit.prevent="addRestaurant"
                class="mt-8"
              >
                <v-col class="col-12 pa-0">
                  <p class="label">Адрес</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="restaurant.address"
                    height="30"
                    :rules="nameRules"
                    placeholder="Бухар жырау 75/2"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-row>
                  <v-col class="col-12 col-sm-6 pa-0 pr-sm-3">
                    <p class="label">Имя админа</p>
                    <v-text-field
                      class="mt-3"
                      v-model="restaurant.adminName"
                      :rules="nameRules"
                      placeholder="Введите ваше имя"
                      outlined
                      solo
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col class="col-12 col-sm-6 pa-0 pl-sm-3">
                    <p class="label">Фамилия админа</p>

                    <v-text-field
                      class="mt-3"
                      v-model="restaurant.adminSurname"
                      :rules="nameRules"
                      placeholder="Введите вашу фамилию"
                      outlined
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="col-12 col-sm-6 pa-0 pr-sm-3">
                    <p class="label">Email админа</p>
                    <v-text-field
                      class="mt-3 font-weight-small"
                      v-model="restaurant.adminEmail"
                      height="30"
                      :rules="emailRules"
                      placeholder="email@test.kz "
                      solo
                      outlined
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col class="col-12 col-sm-6 pa-0 pl-sm-3">
                    <p class="label">Название Ресторана</p>

                    <v-text-field
                      class="mt-3"
                      v-model="restaurant.restaurantName"
                      :rules="nameRules"
                      placeholder="Введите вашу фамилию"
                      outlined
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="col-12 pa-0 ">
                    <p class="label">Номер админа</p>
                    <v-text-field
                      class="mt-3"
                      v-model="restaurant.adminPhone"
                      :rules="telRules"
                      placeholder="+7 7"
                      v-mask="'+7 7## ### ## ##'"
                      solo
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="col-12 pa-0 ">
                    <p class="label">Описание</p>
                    <v-textarea
                      class="mt-3"
                      v-model="restaurant.description"
                      :rules="nameRules"
                      placeholder="Введите ваше имя"
                      outlined
                      solo
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="col-12 pa-0 ">
                    <p class="label">Координаты</p>
                    <v-text-field
                      class="mt-3"
                      v-model="restaurant.mapCoordination"
                      :rules="nameRules"
                      placeholder="43.12121, 45.123213"
                      outlined
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="col-12 col-sm-6 pa-0 pr-sm-3">
                    <p class="label">Макс. цена</p>
                    <v-text-field
                      class="mt-3 font-weight-small"
                      v-model="restaurant.maxPrice"
                      height="30"
                      :rules="numberRules"
                      placeholder="1000"
                      type="number"
                      min="1000"
                      max="100000"
                      solo
                      outlined
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col class="col-12 col-sm-6 pa-0 pl-sm-3">
                    <p class="label">Мин. цена</p>

                    <v-text-field
                      class="mt-3"
                      v-model="restaurant.minPrice"
                      :rules="numberRules"
                      placeholder="10000"
                      type="number"
                      min="1000"
                      max="100000"
                      outlined
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="col-12 pa-0">
                    <v-file-input
                      show-size
                      truncate-length="15"
                      v-model="restaurant.multipartFile"
                      accept="image/png, image/jpeg, image/bmp"
                    ></v-file-input>
                  </v-col>
                </v-row>

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
    const restaurants = await $axios.$get(`restaurant/`);
    return { restaurants };
  },
  layout: "admin",
  data: () => ({
    apitype: "post",
    addRest: false,
    changeId: 0,
    restaurant: {},
    nameRules: [v => !!v || "Поле обязательно"],
    numberRules: [
      v => !!v || "Поле обязательно",
      v => (v >= 1000 && v <= 100000) || "Неправильная цена"
    ],
    emailRules: [
      v => !!v || "E-mail обязательно",
      v => /.+@.+/.test(v) || "E-mail не валидный"
    ],
    telRules: [v => !!v || "Поле обязательно"]
  }),
  mixins: [toastedMixin],
  created() {
    this.fetchRest();
  },
  methods: {
    async fetchRest() {
      await this.$axios
        .$get(`restaurant/`)
        .then(response => {
          this.restaurants = response;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async changeRest(item) {
      this.addRest = true;
      this.restaurant = item;
      this.restaurant.adminEmail = item.admin.email;
      this.restaurant.adminName = item.admin.name;
      this.restaurant.adminSurname = item.admin.surname;
      this.restaurant.restaurantName = item.name;
      this.restaurant.adminPhone = item.admin.phoneNumber;
      this.changeId = item.id;
      this.apitype = "put";
      // const formData = new FormData();
      // for (const data in this.restaurant) {
      //   formData.append(data, this.restaurant[data]);
      // }

      // const config = {
      //   headers: { "content-type": "multipart/form-data" }
      // };

      // await this.$axios
      //   .$put(`restaurant/`, formData, config)
      //   .then(response => {
      //     this.showToasted("aa", "success");
      //     this.addRest = false;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     this.showToasted("aa", "error");
      //   });
    },
    async deleteRest(id) {
      await this.$axios
        .$delete(`restaurant/${id}`)
        .then(res => {
          this.fetchRest();
          this.showToasted("", "success");
        })
        .catch(err => {
          console.log(err);
          this.showToasted("", "error");
        });
    },
    async getImage(name) {
      let image = `@/assets/default.svg`;
      await this.$axios
        .$get(`http://95.179.158.161:8080/image/${name}`)
        .then(res => {
          console.log(res);
          image = `image/${res}`;
        })
        .catch(err => {
          console.log(err);
        });
      console.log(image);
      // return image;
    },
    async addRestaurant() {
      if (!this.$refs.formRest.validate()) return;
      if (this.apitype == "put") {
        this.restaurant.multipartFile = "";
      }
      const formData = new FormData();
      for (const data in this.restaurant) {
        formData.append(data, this.restaurant[data]);
      }

      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      if (this.apitype == "put") {
        await this.$axios
          .$put(`restaurant/${this.changeId}`, { ...this.restaurant })
          .then(response => {
            this.showToasted("Изменено", "success");
            this.addRest = false;
          })
          .catch(err => {
            console.log(err);
            this.showToasted("Что то пошло не так", "error");
          });
      } else {
        await this.$axios
          .$post(`restaurant/`, formData, config)
          .then(response => {
            this.showToasted("Создано", "success");
            this.addRest = false;
            this.fetchRest();
          })
          .catch(err => {
            console.log(err);
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
  grid-template-columns: 50px 20% 20% 20% 20% 50px;
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
