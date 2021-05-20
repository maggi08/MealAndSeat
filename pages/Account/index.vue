<template>
  <v-container class="mt-10 mb-16">
    <div class="acc-grid ">
      <v-col class="menu  mb-16">
        <div class="avatar">
          <img
            :src="require('@/assets/default-user.svg')"
            alt=""
            class="img ml-8 mt-6"
          />
          <h1 class="mt-6 mb-16" v-if="isSuperAdmin">SuperAdmin</h1>
          <h1 v-else class="mt-6 mb-16">{{ user.name }} {{ user.surname }}</h1>
        </div>

        <div class="line"></div>

        <h2
          class="mt-10 menu-item"
          @click="activeMenu = 0"
          :class="{ 'menu-item-active': activeMenu == 0 }"
        >
          Бронирование
        </h2>
        <h2
          class="mt-7 menu-item"
          @click="activeMenu = 1"
          :class="{ 'menu-item-active': activeMenu == 1 }"
        >
          Профиль
        </h2>
        <h2
          class="mt-7 menu-item"
          @click="activeMenu = 2"
          :class="{ 'menu-item-active': activeMenu == 2 }"
        >
          Оплата
        </h2>
        <h2
          class="mt-7 menu-item"
          @click="activeMenu = 3"
          :class="{ 'menu-item-active': activeMenu == 3 }"
        >
          История
        </h2>
        <h2
          class="mt-7 menu-item"
          @click="logout"
          :class="{ 'menu-item-active': activeMenu == 4 }"
        >
          Выход
        </h2>
      </v-col>
      <v-col v-if="activeMenu == 2" class="px-7 mb-16">
        <h1>Оплата</h1>
        <div class="d-flex justify-space-between mt-15 bb pb-3">
          <h3>Способ оплаты</h3>
          <h3 class="red-color ">
            Добавить <v-icon color="secondary">mdi-plus-circle</v-icon>
          </h3>
        </div>

        <div class="visit-card d-flex align-center mt-8 py-7">
          <img class="card" src="../../assets/mastercard (2) 1.png" alt="" />
          <h4>**** **** **** 1006</h4>
          <h4>Годен до: 06/2021</h4>
        </div>
        <div class="visit-card d-flex align-center mt-8 py-7">
          <img class="card" src="../../assets/visa 1.png" alt="" />
          <h4>**** **** **** 2058</h4>
          <h4>Годен до: 08/2022</h4>
        </div>
      </v-col>
      <v-col v-if="activeMenu == 'addRest'" class="px-7 mb-16">
        <h1>Рестораны</h1>
        <div class="d-flex justify-space-between mt-15 bb pb-3">
          <h3>Способ оплаты</h3>
          <h3 class="red-color ">
            Добавить <v-icon color="secondary">mdi-plus-circle</v-icon>
          </h3>
        </div>

        <div class="visit-card d-flex align-center mt-8 py-7">
          <img class="card" src="../../assets/mastercard (2) 1.png" alt="" />
          <h4>**** **** **** 1006</h4>
          <h4>Годен до: 06/2021</h4>
        </div>
        <div class="visit-card d-flex align-center mt-8 py-7">
          <img class="card" src="../../assets/visa 1.png" alt="" />
          <h4>**** **** **** 2058</h4>
          <h4>Годен до: 08/2022</h4>
        </div>
      </v-col>

      <v-col v-else class="px-7 mb-16">
        <h1>Бронирование</h1>
        <div class="d-flex justify-space-between mt-15 bb pb-3">
          <h3>Май 2021</h3>
        </div>

        <div class="visit-card d-flex align-center mt-8">
          <div class="card d-flex flex-column justify-center align-center py-7">
            Суббота 14
          </div>
          <div class="px-4">
            <h4 class="px-8">OZYURT - ЕСЕНТАЙ</h4>
            <h5 class="px-8">Кол-во людей: 5</h5>
            <h5 class="px-8">Суббота, 14 апреля 19:00</h5>
          </div>

          <div class="px-4 ml-auto">
            <h4 class="red-color">Детали</h4>
          </div>
        </div>
      </v-col>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    activeMenu: 0
  }),
  middleware: "auth",
  computed: {
    user() {
      return this.$auth.user;
    },
    isSuperAdmin() {
      if (this.$auth.loggedIn) {
        let role = this.$auth.user.roles[0];
        if (role == "superAdmin") return true;
        return false;
      }
      return false;
    }
  },
  created() {},
  methods: {
    async logout() {
      this.activeMenu = 0;
      if (this.$auth.loggedIn) {
        this.$auth.logout();
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  font-family: $rob;
  font-style: normal;
  font-weight: 400;
}
h1 {
  font-weight: 500;
  font-size: 32px;
  line-height: 37px;
}
h2 {
  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
}
.menu-item {
  cursor: pointer;
  &:hover,
  &-active {
    color: $red-color;
  }
}

h3 {
  font-weight: 600;
  font-size: 25px;
  line-height: 34px;
  color: rgba(0, 0, 0, 0.5);
}
.bb {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.red-color {
  color: $red-color;
}
.acc-grid {
  display: grid;
  grid-template-columns: 30% 1fr;

  .menu {
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
}

.avatar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  justify-content: center;

  .img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
h5 {
  font-size: 15px;
  line-height: 18px;
}
.visit-card {
  width: 100%;
  background: rgba(196, 196, 196, 0.3);

  .card {
    padding: 10px 35px;
    border-right: 1px solid #fff;
  }
}
</style>
