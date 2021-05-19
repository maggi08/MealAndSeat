<template>
  <div class="">
    <v-container class="d-flex justify-space-between align-center header">
      <!-- <div class="burger-menu">
        <img src="@/assets/burger-menu.svg" alt="" />
      </div> -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="../assets/Logo.svg" alt="" />
        </nuxt-link>
      </div>
      <div v-if="!$auth.loggedIn" class="login">
        <button @click="(login = true), (clicked = 'login')">Login</button>
        |
        <button @click="(login = true), (clicked = 'sign')">
          Sign up
        </button>
      </div>
      <div v-else class="user">
        <div class="d-flex align-center">
          <nuxt-link class="link-acc" to="/Account">
            <img class="avatar mr-2" src="@/assets/default-user.svg" alt="" />
          </nuxt-link>
          <nuxt-link class="link-acc" to="/Account">
            {{ $auth.user.name }} {{ $auth.user.surname }}
          </nuxt-link>
        </div>
      </div>
    </v-container>
    <template>
      <div class="text-center modalka">
        <v-dialog v-model="success" width="500">
          <v-card
            class="pa-15 py-10 d-flex align-center justify-center flex-column text-center "
          >
            <img class="mx-auto" src="@/assets/green-check.svg" alt="" />
            <h1 v-if="message" class="text-norm mt-5">{{ message }}</h1>
            <h2 v-if="message2" class="text-norm mt-3">{{ message2 }}</h2>

            <v-btn @click="success = false" class="mt-10" color="primary">
              Окей
            </v-btn>
          </v-card>
        </v-dialog>
      </div>
    </template>

    <template>
      <div class="text-center modalka">
        <v-dialog v-model="login" width="500">
          <v-card class="py-5 px-12">
            <img
              class="mx-auto d-flex justify-center"
              width="280px"
              src="../assets/Logo.svg"
              alt=""
            />
            <v-col v-if="clicked == 'sign'" class="pa-0">
              <v-form
                ref="formRegister"
                @submit.prevent="submitRegistration"
                class="mt-8"
              >
                <v-col class="col-12 pa-0">
                  <p class="label">Логин</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    v-model="person.email"
                    height="30"
                    :rules="emailRules"
                    placeholder="Введите ваш E-mail"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-row>
                  <v-col class="col-12 col-sm-6 pa-0 pr-sm-3">
                    <p class="label">Ваше имя</p>
                    <v-text-field
                      class="mt-3"
                      v-model="person.name"
                      :rules="nameRules"
                      placeholder="Введите ваше имя"
                      outlined
                      solo
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col class="col-12 col-sm-6 pa-0 pl-sm-3">
                    <p class="label">Ваше фамилия</p>

                    <v-text-field
                      class="mt-3"
                      v-model="person.surname"
                      :rules="nameRules"
                      placeholder="Введите вашу фамилию"
                      outlined
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row v-if="false">
                  <v-col class="col-12 col-sm-6 pa-0 pr-sm-3">
                    <p class="label">Введите пароль</p>
                    <v-text-field
                      class="mt-3"
                      v-model="person.password1"
                      :rules="[
                        v => !!v || 'Поле обязательно',
                        v =>
                          (!!v && v.length >= 6) || 'Нужно больше 8 символов',
                        passwordMatch || 'Пароли не совпадают'
                      ]"
                      type="password"
                      placeholder="Введите ваш пароль"
                      outlined
                      solo
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col class="col-12 col-sm-6 pa-0 pl-sm-3">
                    <p class="label">Подтвердите пароль</p>

                    <v-text-field
                      class="mt-3"
                      v-model="person.password2"
                      type="password"
                      :rules="[
                        v => !!v || 'Поле обязательно',
                        v =>
                          (!!v && v.length >= 6) || 'Нужно больше 8 символов',
                        passwordMatch || 'Пароли не совпадают'
                      ]"
                      placeholder="Подтвердите ваш пароль"
                      outlined
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-col class="col-12 pa-0">
                  <p class="label">Введите номер телефона</p>
                  <v-text-field
                    class="mt-3"
                    v-model="person.phone"
                    :rules="telRules"
                    placeholder="+7 7"
                    v-mask="'+7 7## ### ## ##'"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col class="col-12 pa-0">
                  <v-checkbox
                    v-model="checkbox"
                    :label="
                      `Я согласен со всеми Условиями и Политикой конфиденциальности Meal & Seat`
                    "
                    :rules="policyRules"
                    required
                  ></v-checkbox>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <v-btn type="submit" class="mx-auto my-btn" color="#55B68D">
                    Создать
                  </v-btn>
                </v-col>
              </v-form>
            </v-col>
            <v-col v-if="clicked == 'login'" class="pa-0">
              <v-form
                ref="formLogin"
                @submit.prevent="submitLogin"
                class="mt-8"
              >
                <v-col class="col-12 pa-0">
                  <p class="label">Логин</p>
                  <v-text-field
                    class="mt-3 font-weight-small"
                    ref="email"
                    v-model="person.email"
                    height="30"
                    :rules="emailRules"
                    placeholder="Введите ваш E-mail"
                    solo
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="col-12 pa-0">
                  <p class="label">Введите пароль</p>
                  <v-text-field
                    class="mt-3"
                    v-model="person.password"
                    :rules="passwordRules"
                    type="password"
                    placeholder="Введите ваш пароль"
                    outlined
                    solo
                    required
                  ></v-text-field>
                </v-col>
                <div @click="forgotPassword" class="forgot text-right">
                  Забыли пароль?
                </div>

                <v-col class="col-12 d-flex justify-center">
                  <v-btn type="submit" class="mx-auto my-btn" color="#55B68D">
                    Войти
                  </v-btn>
                </v-col>
                <div class="sozdat text-center mt-4">
                  Нет аккаунта? <span @click="clicked = 'sign'">Создать</span>
                </div>
              </v-form>
            </v-col>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import MainSearch from "@/components/MainSearch";

import toastedMixin from "@/mixins/toasted.mixin";
export default {
  data: () => ({
    message: false,
    message2: false,
    login: false,
    success: false,
    person: {},
    checkbox: false,
    clicked: "sign",
    nameRules: [v => !!v || "Поле обязательно"],
    emailRules: [
      v => !!v || "E-mail обязательно",
      v => /.+@.+/.test(v) || "E-mail не валидный"
    ],
    passwordRules: [
      v => !!v || "Поле обязательно",
      v => v?.length >= 3 || "Нужно больше 8 символов"
    ],
    telRules: [v => !!v || "Поле обязательно"],
    policyRules: [v => !!v || ""]
  }),
  components: {
    MainSearch
  },
  mixins: [toastedMixin],
  computed: {
    passwordMatch() {
      if (this.person?.password1 && this.person?.password2) {
        if (this.person.password1 !== this.person.password2) return false;
      }
      return true;
    }
  },
  watch: {
    clicked() {
      this.person = {};
    }
  },

  methods: {
    async forgotPassword() {
      await this.$axios
        .$post(`auth/reset-password`, null, {
          params: { email: this.person.email }
        })
        .then(response => {
          this.login = false;
          this.success = true;
          this.message = "";
          this.message2 = `Мы отправили пароль на ${this.person.email}`;
          console.log(response);
          // this.showToasted("Вы успешно зарегистрировались!", "success");
        })
        .catch(error => {
          console.log(error);
          if (!this.person.email)
            this.showToasted("Пожалуйста заполните полe Email!", "error");
          else this.showToasted("Что то пошло не так!", "error");
        });
      this.person = {};
    },
    async submitRegistration() {
      if (!this.$refs.formRegister.validate()) return;
      await this.$axios
        .$post(`auth/sign-up/`, null, { params: this.person })
        .then(response => {
          this.login = false;
          this.success = true;
          this.message = "Вы успешно зарегистрировались!!!";
          this.message2 = "Мы отправили пароль на вашу почту";
        })
        .catch(error => {
          this.showToasted("Что то пошло не так!", "error");
        });
      this.person = {};
    },
    async submitLogin() {
      if (!this.$refs.formLogin.validate()) return;
      await this.$auth
        .loginWith("local", { params: { ...this.person } })
        .then(response => {
          this.login = false;
          this.showToasted("Вы успешно зашли!", "success");
        })
        .catch(error => {
          this.showToasted("Пароль или логин не правильный!", "error");
        });

      this.person = {};
    }
  }
};
</script>

<style scoped lang="scss">
* {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #f35757;
}

.header {
  height: 96px;
}
.login {
  button {
    &:hover {
      color: #cfcfcf;
    }
  }
}

.label {
  font-family: $rob;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
}
.text-success {
  color: $green-color;
}
.text-norm {
  color: rgba(0, 0, 0, 0.7);
}
.v-text-field {
  font-size: 12px;
  line-height: 14px;
}
.my-btn {
  color: #fff;
  width: 150px;
  height: 30px;

  background: #55b68d;
  border-radius: 10px;
}
.forgot {
  font-size: 14px;
  line-height: 18px;
  color: #3e8ea9;

  cursor: pointer;
}
.sozdat {
  font-size: 14px;
  line-height: 18px;
  color: #000;
  span {
    margin-left: 5px;
    font-size: 14px;
    line-height: 18px;
    color: #3e8ea9;
    cursor: pointer;
  }
}
.user {
  font-family: $open;
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 31px;

  color: rgba(0, 0, 0, 0.9);
  .avatar {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
  }
}
.link-acc {
  color: rgba(0, 0, 0, 0.9);

  text-decoration: none;
  transition: 0.22s;
  &:hover {
    color: $theme-color;
  }
}
</style>
