<template>
  <div class="">
    <v-row class="justify-space-between align-center">
      <h1>Столики</h1>
      <v-btn @click="(addRest = true), (apitype = 'post')">
        Добавить Столики
        <v-icon class="ml-3" color="primary">
          mdi-plus-circle
        </v-icon>
      </v-btn>
    </v-row>
    <v-row v-if="table" class="flex-column">
      <div class="rest align-center" style="background: transparent">
        <div class="rest-item image"></div>
        <div class="rest-item">ID</div>
        <div class="rest-item">Название столика</div>
        <div class="rest-item d-flex">Макс. людей</div>
        <div class="rest-item d-flex">Дети</div>
        <div class="">Позиция</div>
        <div class="">Цена брони</div>
      </div>
      <v-col v-for="(item, index) in table.tableList" :key="index" class="pa-0">
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
          <div class="rest-item d-flex">{{ item.personCount }} людей</div>
          <div v-if="item.forChildren" class="rest-item d-flex">+</div>
          <div v-else class="rest-item d-flex">-</div>
          <div class="rest-item d-flex">{{ item.position }}</div>
          <div class="rest-item d-flex">{{ item.reservePrice }}</div>

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
                  <p class="label">Название</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="table.name"
                    height="30"
                    :rules="nameRules"
                    placeholder="Название"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col class="col-12 pa-0">
                  <p class="label">Количество людей</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="table.personCount"
                    height="30"
                    type="number"
                    min="1"
                    :rules="numberRules"
                    placeholder="12"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col class="col-12 pa-0">
                  <p class="label">Цена брони</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="table.reservePrice"
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
                <v-col class="col-12 pa-0">
                  <p class="label">С детьми</p>
                  <v-checkbox
                    class="mt-3 font-weight-small"
                    v-model="table.forChildren"
                    height="30"
                    min="0"
                    :rules="nameRules"
                    solo
                    outlined
                    required
                  ></v-checkbox>
                </v-col>
                <v-col class="col-12 pa-0">
                  <p class="label">Позиция</p>
                  <v-select
                    class="mt-3 font-weight-small"
                    v-model="table.position"
                    :items="positions"
                    height="30"
                    min="0"
                    :rules="nameRules"
                    solo
                    outlined
                    required
                  ></v-select>
                </v-col>
                <v-col class="col-12 pa-0">
                  <v-file-input
                    show-size
                    truncate-length="15"
                    v-model="table.file"
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
    const table = await $axios.$get(`table/`);
    // const parents = await $axios.$get(`category/parents/`);
    return { table };
  },
  layout: "admin",
  data: () => ({
    apitype: "post",
    positions: ["STANDARD", "WINDOW", "DOOR", "TAPCHAN", "OUTSIDE"],
    changeId: 0,
    addRest: false,
    table: {},
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
    async fetchTable() {
      await this.$axios
        .$get(`table/`)
        .then(response => {
          this.table = response;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async changeCategory(item) {
      this.addRest = true;
      this.table = {};
      this.table.position = item.position;
      this.table.personCount = item.personCount;
      this.table.forChildren = item.forChildren;
      this.table.name = item.name;
      this.table.reservePrice = item.reservePrice;
      this.apitype = "put";
      this.changeId = item.id;
    },
    async deleteCategory(id) {
      await this.$axios
        .$delete(`table/${id}`)
        .then(res => {
          this.fetchTable();
          this.showToasted("Удалено", "success");
        })
        .catch(err => {
          this.showToasted("Что то пошло не так", "error");
        });
    },
    async addCategory() {
      if (!this.$refs.formRest.validate()) return;

      const formData = new FormData();
      for (const data in this.table) {
        formData.append(data, this.table[data]);
      }

      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      if (this.apitype == "put") {
        await this.$axios
          .$put(`table/${this.changeId}`, null, {
            params: { ...this.table }
          })
          .then(response => {
            this.showToasted("Изменено успешно", "success");
            this.addRest = false;
            this.fetchTable();
          })
          .catch(err => {
            this.showToasted("Что то пошло не так", "error");
          });
      } else {
        await this.$axios
          .$post(`table/`, formData, config)
          .then(response => {
            this.showToasted("Добавлено успешно", "success");
            this.addRest = false;
            this.fetchTable();
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
  grid-template-columns: 50px 4% 20% 14% 8% 13% 15% 60px;
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
