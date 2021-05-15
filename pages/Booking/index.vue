<template>
  <v-container class="content d-flex justify-space-between mt-11">
    <div class="rest-box mb-16">
      <div class="pochti">Вы почти забронировали!</div>
      <div class="d-flex mt-5 box">
        <img class="image mr-9" src="@/assets/default.svg" alt="" />
        <div
          class="d-flex flex-column justify-space-between align-space-between"
        >
          <h1>OZYURT - ЕСЕНТАЙ</h1>

          <div class="d-flex">
            <div class=" align-center">
              <v-icon>mdi-calendar</v-icon>
              Апрель 15, 2021
            </div>
            <div class="ml-4 align-center">
              <v-icon>mdi-clock-outline</v-icon>
              18:00
            </div>
            <div class="ml-4 align-center">
              <v-icon>mdi-account-outline</v-icon>
              3 человека(Летник)
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 not-auth">
        Вы все равно можете попытаться завершить бронирование, но этот стол
        может быть недоступен.
      </div>
      <div class="">
        <h2 class="mt-10">Детали ужина</h2>
        <p class="mt-6">
          <span>Войдите </span> или <span> зарегистрируйтесь </span> , чтобы
          набирать баллы за это бронирование
        </p>
      </div>

      <v-form ref="form" @submit.prevent="book">
        <v-row class="d-flex mt-6 ">
          <v-col class="mt-2 col-12 col-md-6">
            <v-text-field
              class=""
              v-model="last_name"
              :rules="nameRules"
              placeholder="Фамилия"
              solo
              required
            ></v-text-field>
          </v-col>
          <v-col class="mt-2 col-12 col-md-6">
            <v-text-field
              class=""
              v-model="first_name"
              :rules="nameRules"
              placeholder="Имя"
              solo
              required
            ></v-text-field>
          </v-col>
          <v-col class="mt-2 col-12 col-md-6">
            <v-text-field
              class=""
              v-model="tel"
              :rules="telRules"
              placeholder="+7 (7__) ___ __ __"
              v-mask="'+7 (###) ###-##-##'"
              solo
              required
            ></v-text-field>
          </v-col>
          <v-col class="mt-2 col-12 col-md-6">
            <v-text-field
              class=""
              v-model="email"
              :rules="emailRules"
              placeholder="seat@meal.com"
              solo
              required
            ></v-text-field>
          </v-col>
          <v-col class="mt-2 col-12 col-md-6">
            <v-select
              class=""
              v-model="event"
              :items="events"
              placeholder="Выберите событие"
              solo
            ></v-select>
          </v-col>
          <v-col class="mt-2 col-12 col-md-6">
            <v-text-field
              class=""
              v-model="whish"
              :rules="whishRules"
              placeholder="Желания"
              counter="20"
              solo
            ></v-text-field>
          </v-col>
        </v-row>

        <v-col>
          <v-checkbox
            v-model="checkbox"
            value="1"
            :label="
              'Подпишитесь, чтобы получать предложения по питанию этого ресторана по электронной почте.'
            "
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            value="2"
            :label="
              'Подпишитесь на меня, чтобы получать предложения по питанию Reserve по электронной почте.'
            "
          ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            value="3"
            :label="
              'Да, я хочу получать текстовые сообщения и напоминания о моих бронированиях.'
            "
          ></v-checkbox>
        </v-col>

        <v-btn
          class="mt-6"
          type="submit"
          block
          color="secondary"
          elevation="2"
          large
        >
          Завершить бронирование
        </v-btn>
      </v-form>
    </div>

    <div class="box-comment">
      <h2 class="mt-">Что нужно знать перед посещением</h2>

      <p class="mt-9">От ресторана</p>

      <p class="mt-5">
        Благодарим вас за интерес к ресторану Verde - Four Seasons Resort Dubai
        на пляже Джумейра. Обратите внимание, что кухня закрывается в 23:30 с
        воскресенья по вторник и в 12:30 со среды по субботу. Сообщаем вам, что
        у нас действует политика сидения в течение 2 часов. В случае опоздания
        более чем на 15 минут мы должны аннулировать бронирование. С уважением,
        и мы будем рады приветствовать вас в Verde Dubai.
      </p>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    last_name: "",
    first_name: "",
    tel: "",
    email: "",
    whish: "",
    event: "",
    checkbox: [],
    events: ["BirthDay", "Wedding", "Other"],
    nameRules: [v => !!v || "Обязательное поле"],
    emailRules: [
      v => !!v || "Обязательное поле",
      v => /.+@.+/.test(v) || "E-mail не валидный"
    ],
    telRules: [v => !!v || "Обязательное поле"],
    whishRules: [v => v.length <= 40 || "Длинное поле"]
  }),
  methods: {
    book() {
      if (!this.$refs.form.validate()) return;
    }
  },
  created() {}
};
</script>

<style scoped lang="scss">
* {
  font-family: $open;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
}
.v-messages__message {
  color: $red-color;
}
.pochti {
  font-family: $nun;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 29px;
  color: #489424;
}
h1 {
  font-size: 40px;
  line-height: 47px;
}
h2 {
  font-weight: 600;
  font-size: 21px;
  line-height: 29px;
}
h3 {
  font-size: 12px;
  line-height: 16px;
}
.content {
  gap: 40px;
  flex-wrap: wrap;
}
p {
  span {
    color: $red-color;
    cursor: pointer;
  }
}
.rest-box {
  width: 100%;
  max-width: 700px;
}
.not-auth {
  width: 100%;
  // max-width: 700px;
  padding: 15px 32px;
  background: rgba(245, 101, 70, 0.2);
  border-radius: 2px;
}

.box {
  .image {
    width: 100%;
    max-width: 150px;
    height: 140px;
    border-radius: 5px;
  }
}
.box-comment {
  width: 100%;
  max-width: 350px;
}
</style>
