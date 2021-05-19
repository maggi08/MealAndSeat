<template>
  <v-app>
    <!-- Navigation -->
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list nav class="pt-4">
        <template v-for="item in items">
          <v-list-group
            color="#7C2C6B"
            :key="item.to"
            v-if="item.children && item.children.length"
            :value="$route.path.includes(item.to)"
          >
            <template #activator>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon color="#7c2c6b" class="mr-3">{{ item.icon }}</v-icon>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="child in item.children"
              :key="child.to"
              :to="child.to"
              active-class="active_admin"
            >
              <v-list-item-content class="pl-10">
                <v-list-item-title>{{ child.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item
            v-else
            :key="item.to"
            :to="item.to"
            color="#00b1bb"
            :class="{
              'd-none': item.title === 'Сотрудники' && !$auth.user.is_superuser
            }"
            exact-active-class="active_admin"
          >
            <v-list-item-content>
              <v-list-item-title
                ><v-icon color="#7c2c6b" class="mr-4">{{ item.icon }}</v-icon
                >{{ item.title }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- END Navigation -->

    <!-- App bar -->
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/admin">
        <!-- <v-img
          src="../assets/Logo.svg"
          class="ml-4"
          max-width="100"
          height="30"
        ></v-img> -->
      </nuxt-link>
      <v-spacer></v-spacer>
      <v-btn text color="#7c2c6b" class="text-none">
        <nuxt-link
          v-if="role == 'superAdmin'"
          to="/Account"
          style="text-decoration: none"
        >
          <v-icon class="mr-2">mdi-account</v-icon> Super Admin
        </nuxt-link>
        <nuxt-link v-else to="/Account" style="text-decoration: none">
          <v-icon class="mr-2">mdi-account</v-icon> {{ $auth.user.name }}
          {{ $auth.user.surname }}
        </nuxt-link>
      </v-btn>
    </v-app-bar>
    <!-- END App bar -->

    <v-main class="main-admin">
      <v-container class="pt-8">
        <div class="window-admin shadow px-8 py-8">
          <nuxt />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  // middleware: "access-control",
  data() {
    return {
      drawer: true,
      clipped: true,
      group: null,
      role: "",
      items: [
        // {
        //   icon: "mdi-finance",
        //   title: "Рестораны",
        //   children: [
        //     { title: "Все", to: "/admin/Restaurants" },
        //     { title: "Пользователи", to: "/admin/users" },
        //     { title: "Отчеты", to: "/admin/report" },
        //     { title: "Сотрудничество", to: "/admin/questionnaires" }
        //   ]
        // },
        // {
        //   icon: "mdi-message-draw",
        //   title: "Комментарии",
        //   to: "/admin/Comments"
        // children: [
        //   { title: "Контент", to: "/admin/content" },
        //   { title: "Комиссия", to: "/admin/commission" },
        //   { title: "Условия оплаты ", to: "/admin/payment" }
        // ]
        // },
        // {
        //   icon: "mdi-image-plus",
        //   title: "Реклама/баннеры",
        //   to: "/admin/banners"
        // },
        // {
        //   icon: "mdi-account-group",
        //   title: "Сотрудники",
        //   to: "/admin/staff"
        // },
        // {
        //   icon: "mdi-email",
        //   title: "Шаблоны",
        //   to: "/admin/template"
        // }
      ]
    };
  },
  created() {
    this.getUserMenu();
  },
  methods: {
    getUserMenu() {
      if (this.$auth.loggedIn) {
        let role = this.$auth.user.roles[0];
        this.role = role;
        console.log(role);
        if (role == "superAdmin") {
          this.items = [
            {
              icon: "mdi-silverware-fork-knife",
              title: "Рестораны",
              to: "/admin/Restaurants"
            },
            {
              icon: "mdi-shape-outline",
              title: "Категории",
              to: "/admin/Categories"
            }
          ];
        } else {
          this.items = [
            {
              icon: "mdi-table-furniture",
              title: "Столики",
              to: "/admin/Table"
            },
            {
              icon: "mdi-food",
              title: "Блюдо",
              to: "/admin/Meal"
            },
            {
              icon: "mdi-sale",
              title: "Скидки/Новости",
              to: "/admin/Discount"
            }
          ];
        }

        this.items.push({
          icon: "mdi-home",
          title: "Главная",
          to: "/"
        });
      }
    }
  }
};
</script>

<style>
p {
  margin-bottom: 4px !important;
}

.v-expansion-panel:not(:first-child)::after {
  border-top: none;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.2s opacity cubic-bezier(0.4, 0, 0.2, 1);
}

.v-pagination__item {
  background: transparent;
  border-radius: 4px;
  font-size: 1rem;
  height: 34px;
  margin: 0.3rem;
  min-width: 34px;
  padding: 0 5px;
  text-decoration: none;
  transition: 0.3s cubic-bezier(0, 0, 0.2, 1);
  width: auto;
  box-shadow: none;
}

.v-pagination__item--active {
  box-shadow: none;
}

.theme--light.v-pagination .v-pagination__item {
  background: #dcdcdc;
  color: white;
}

.v-pagination__navigation {
  box-shadow: none;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 32px;
  width: 32px;
  margin: 0.3rem 10px;
}

.no-padding button {
  padding: 0 !important;
}

.active_admin {
  background-color: #7c2c6b;
  color: white !important;
}

.active_admin i {
  color: white !important;
}

.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: 0px 5px 10px rgba(138, 149, 158, 0.3);
}

.shadow {
  box-shadow: 0px 5px 10px rgba(138, 149, 158, 0.3);
}

.main-admin {
  background: #f9fafc;
}

.window-admin {
  background: #ffffff;
  min-height: 86vh;
}

.blue-shadow {
  box-shadow: 0px 10px 20px rgba(82, 177, 186, 0.2);
}
#imagePreview {
  width: 80%;
  height: auto;
}
</style>
