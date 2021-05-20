<template>
  <div class="">
    <div class="hero">
      <img class="main-img" src="../../assets/ozyurt.png" alt="" />
      <v-container class="pa-0">
        <div class="menu">
          <a class="menu-item" href="#">Обзор</a>
          <a class="menu-item" href="#">Фото</a>
          <a class="menu-item" href="#">Меню</a>
          <a class="menu-item" href="#">Отзывы</a>
          <div class="line"></div>
        </div>
      </v-container>
    </div>
    <v-container class="content mb-145">
      <div v-if="restaurant.restaurant" class="">
        <h1 class="mt-6">
          {{ restaurant.restaurant.name }} - {{ restaurant.restaurant.address }}
        </h1>

        <div class="d-flex align-center mt-1">
          <div
            class="rest-type mr-4"
            v-for="(item, index) in rest.type"
            :key="index"
          >
            <h2 class="blue-color text-lowercase">#{{ item }}</h2>
          </div>
        </div>

        <!-- <pre>{{ restaurant.restaurant }}</pre> -->
        <div class="line my-2 "></div>
        <div class="d-flex align-center">
          <div class="d-flex align-center mr-3">
            <v-rating
              class=""
              length="5"
              readonly
              size="20"
              :value="rest.rating"
              background-color="#F35757 lighten-1"
              color="#F35757"
            >
            </v-rating>
            {{ rest.rating }}
          </div>

          <div class="d-flex align-center mr-3">
            <v-icon class="mr-1" color="#000">mdi-comment-outline</v-icon>
            1 отзыв
          </div>

          <div class="d-flex align-center mr-3">
            <img class="mr-1" src="@/assets/money (2).svg" alt="" />
            1500-2500
          </div>
        </div>
        <div class="mt-11">
          <p>
            {{ restaurant.restaurant.description }}
            <!-- 1993 год — открытие ресторана «OZYURT», первый в городе ресторан
            безалкогольного формата. В блюдах ресторана используются
            высококачественные сбалансированные комбинации продуктов стандарта
            «ХАЛАЛ». <br />
            2005 год — дистрибьютор торгового бренда «Karmod» в Казахстане, по
            продаже быстровозводимых модульных кабин, киосков и контейнеров. -->
          </p>
          <div class="d-flex align-center show-more mt-2">
            <v-icon color="#F35757">mdi-plus</v-icon> Читать подробнее
          </div>
        </div>

        <h1 class="mt-13">
          Меры предосторожности
        </h1>
        <div class="line mt-4 mb-3"></div>
        <div class="d-flex row justify-space-between">
          <div class="conds mb-6">
            <h5>Очистка и дезинфекция</h5>
            <h6 class="mt-3">
              <v-icon color="#64c987">mdi-check-circle</v-icon> Обработка
              поверхностей между сиденьями
            </h6>
            <h6 class="mt-3">
              <v-icon color="#64c987">mdi-check-circle</v-icon> Дезинфицирующее
              средство или салфетки для клиентов
            </h6>
          </div>

          <div class="conds mb-6">
            <h5>Защитное снаряжение</h5>
            <h6 class="mt-3">
              <v-icon color="#64c987">mdi-check-circle</v-icon> Официанты носят
              маски
            </h6>
            <h6 class="mt-3">
              <v-icon color="#64c987">mdi-check-circle</v-icon>
              Посетители должны носить маски, если они не едят или не пьют.
            </h6>
          </div>

          <div class="conds mb-6">
            <h5>Физическая дистанция</h5>
            <h6 class="mt-3">
              <v-icon color="#64c987">mdi-check-circle</v-icon> Дистанция
              поддерживается в местах общего пользования
            </h6>
            <h6 class="mt-3">
              <v-icon color="#64c987">mdi-check-circle</v-icon> Дополнительное
              пространство между столами
            </h6>
          </div>
        </div>
        <div class="mt-16">
          <h1>2 фото</h1>
          <div class="line mt-6"></div>
          <div class="photo-catrgory d-flex mt-9 align-center">
            <h2 class="mr-6">Все</h2>
            <h2 class="mr-6">Кухня</h2>
            <h2 class="mr-6">Интерьер</h2>
            <div class="line"></div>
          </div>
          <div class="d-flex mt-10 align-center row justify-space-between">
            <div
              class="rest-images mb-3"
              @mouseover="hover = index + 1"
              @mousleave="hover = 0"
              v-for="(item, index) in images.slice(0, 2)"
              :key="index"
            >
              <img v-if="item" class="" :src="item" alt="" />
              <img v-else class="" src="@/assets/default.svg" alt="" />
              <div v-if="hover == index + 1" class="hover">
                Посмотреть больше
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16">
          <h1>Меню</h1>
          <div class="line mt-6"></div>

          <div class="d-flex row mt-6 food-category">
            <h2
              class="mr-5 mt-2"
              v-for="(item, index) in foodCategories"
              :key="index"
              @click="activeFoodCategory = index + 1"
              :class="{ active: activeFoodCategory == index + 1 }"
            >
              {{ item }}
            </h2>
          </div>

          <div class=" d-flex flex-column align-center">
            <div class="mt-12 d-flex row justify-space-between">
              <div
                class="food mb-5"
                v-for="(item, index) in menu.slice(0, slice)"
                :key="index"
              >
                <div class="d-flex justify-space-between">
                  <p class="title">{{ item.name }}</p>
                  <p>{{ item.price }} KZT</p>
                </div>
                <p class="mt-3">{{ item.description }}</p>
              </div>
            </div>

            <button
              v-if="slice == 4"
              class="more-btn mt-11"
              @click="slice = menu.length"
            >
              Подробнее
            </button>
            <button v-else class="more-btn mt-11" @click="slice = 4">
              Скрыть
            </button>
          </div>
        </div>

        <div class="mt-16">
          <h1>Отзывы</h1>
          <div class="line mt-6"></div>

          <h2 class="mt-4">Общий рейтинг и обзор</h2>
          <div class="">
            <div class="">
              <p class="reviews-p mt-6">
                Отзывы могут оставлять только посетители, которые ужинали в этом
                ресторане.
              </p>

              <div class="d-flex align-center mt-5">
                <v-rating
                  class="mr-1"
                  length="5"
                  readonly
                  size="20"
                  :value="rest.rating"
                  background-color="#F35757 lighten-1"
                  color="#F35757"
                >
                </v-rating>
                {{ rest.rating }} на основе рейтингов за все время
              </div>
            </div>
            <div class=""></div>
          </div>

          <div class="d-flex align-center mt-7">
            <div
              class="d-flex flex-column align-center justify-center px-2 categories-rate "
            >
              <p>4.7</p>
              <p>Цена</p>
            </div>

            <div
              class="d-flex flex-column align-center justify-center px-2 categories-rate "
            >
              <p>4.9</p>
              <p>Кухня</p>
            </div>

            <div
              class="d-flex flex-column align-center justify-center px-2 categories-rate "
            >
              <p>4.0</p>
              <p>Сервис</p>
            </div>

            <div class="d-flex flex-column align-center justify-center px-2">
              <p>5.0</p>
              <p>Атмосфера</p>
            </div>
          </div>

          <div class="d-flex align-center mt-9">
            <v-icon color="#000" class="mr-2">mdi-thumb-up-outline </v-icon>
            <p>
              <span class="bold">100% людей </span> порекомендовали бы это другу
            </p>
          </div>

          <div class="line mt-3"></div>

          <div class="comments mt-13">
            <div class="comment">
              <div class="d-flex flex-column align-center justify-center">
                <img class="avatar" src="@/assets/default-user.svg" alt="" />
                <div class="name mt-4">Ахметов Ерлан</div>
                <div class="reviews mt-2">
                  <v-icon class="mr-1" color="#000">mdi-comment-outline</v-icon>
                  1 отзыв
                </div>
              </div>
              <div class="">
                <div class="d-flex align-center rate">
                  <v-rating
                    class="mr-1"
                    length="5"
                    readonly
                    size="20"
                    :value="rest.rating"
                    background-color="#F35757 lighten-1"
                    color="#F35757"
                  >
                  </v-rating>

                  Посещала 10 октября 2020 года
                </div>
                <div class="rate-categories d-flex align-center">
                  Общий <span class="mr-2">5</span> &bull; Кухня
                  <span class="mr-2">5</span> &bull; Атмосфера
                  <span class="mr-2">5</span> &bull; Сервис
                  <span class="mr-2">5</span>
                </div>

                <div class="comment-content mt-7">
                  1993 год — открытие ресторана «OZYURT», первый в городе
                  ресторан безалкогольного формата. В блюдах ресторана
                  используются высококачественные сбалансированные комбинации
                  продуктов стандарта «ХАЛАЛ».
                  <div class="d-flex align-center show-more mt-2">
                    <v-icon color="#F35757">mdi-plus</v-icon> Читать подробнее
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class=""></div>

      <RestaurantIdSide />
    </v-container>
  </div>
</template>

<script>
import RestaurantIdSide from "@/components/RestaurantsIdSide";
export default {
  async asyncData({ $axios, query }) {
    const restaurant = await $axios.$get(`restaurant/${query.id}`);
    return { restaurant };
  },
  components: {
    RestaurantIdSide
  },
  data: () => ({
    hover: 0,
    slice: 4,
    activeFoodCategory: 1,
    foodCategories: ["Завтрак", "Десерты", "Супы", "Салаты"],
    menu: [
      {
        name: "Турецкий завтрак",
        price: "4000",
        description:
          "Основными составляющими турецкого завтрака является колбаса, сыр, нарезка из огурцов и помидоров, яиц, оливок."
      },
      {
        name: "Турецкий завтрак",
        price: "4000",
        description:
          "Основными составляющими турецкого завтрака является колбаса, сыр, нарезка из огурцов и помидоров, яиц, оливок."
      },
      {
        name: "Турецкий завтрак",
        price: "4000",
        description:
          "Основными составляющими турецкого завтрака является колбаса, сыр, нарезка из огурцов и помидоров, яиц, оливок."
      },
      {
        name: "Турецкий завтрак",
        price: "4000",
        description:
          "Основными составляющими турецкого завтрака является колбаса, сыр, нарезка из огурцов и помидоров, яиц, оливок."
      },
      {
        name: "Турецкий завтрак",
        price: "4000",
        description:
          "Основными составляющими турецкого завтрака является колбаса, сыр, нарезка из огурцов и помидоров, яиц, оливок."
      },
      {
        name: "Турецкий завтрак",
        price: "4000",
        description:
          "Основными составляющими турецкого завтрака является колбаса, сыр, нарезка из огурцов и помидоров, яиц, оливок."
      }
    ],
    images: [
      require("@/assets/ozyurt.png"),
      require("@/assets/ozyurt.png"),
      require("@/assets/ozyurt.png"),
      require("@/assets/ozyurt.png"),
      require("@/assets/ozyurt.png")
    ],
    rest: {
      image: require("@/assets/smile2 1.png"),
      name: "OZYURT",
      place: "ЕСЕНТАЙ",
      rating: 4.23,
      avg_price: "KZT 1500 - 3500",
      type: ["Международная", "японская"],
      status: "Новый",
      address: {
        city: "Алматы",
        address: "alfarabi 189,"
      },
      times: [
        "12:00",
        "14:00",
        "12:00",
        "23:30",
        "12:00",
        "14:00",
        "22:00",
        "12:00"
      ],
      text:
        "На данный момент онлайн-возможности недоступны в течение 2,5 часов после вашего запроса. У вас есть на уме другое время?"
    }
  }),
  created() {
    this.time = this.$moment().format("hh:mm");
  }
};
</script>

<style scoped lang="scss">
* {
  font-family: $rob;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}
h1 {
  font-size: 40px;
  line-height: 47px;
}
h2 {
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
}
.blue-color {
  color: #3e8ea9;
}
h3 {
  font-size: 10px;
  line-height: 12px;
  color: #f35757;
}
h4 {
  font-weight: 500;
  font-size: 38px;
  line-height: 45px;
}
h5 {
  font-family: $nun;
  font-weight: bold;
  font-size: 21px;
  line-height: 29px;
}
h6 {
  font-family: $nun;
  font-weight: 300;
  font-size: 15px;
  line-height: 20px;
}
.hero {
  position: relative;

  .menu {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    max-width: 655px;
    background: #fff;

    padding: 10px 22px;
    display: flex;
    align-items: center;

    &-item {
      font-weight: 400;
      font-size: 20px;
      line-height: 31px;
      color: #000000;
      text-decoration: none;
      margin-right: 35px;
      border-bottom: 3px solid transparent;
      &:hover {
        border-bottom: 3px solid #f35757;
      }
    }
    .line {
      position: absolute;
      bottom: 8px;
      width: 100%;
      max-width: 605px;
      height: 2px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
.main-img {
  width: 100%;
  height: 551px;
}
.rest-type {
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  border-radius: 2px;
  padding: 4px 10px;
}
.content {
  display: grid;
  grid-template-columns: 60% 1fr 20%;
}
.line {
  height: 2px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
}
.show-more {
  color: $red-color;
  cursor: pointer;
}
.conds {
  width: 320px;
}
.photo-catrgory {
  position: relative;
  h2 {
    transition: 0.22s;
    line-height: 30px;
    color: #000;
    border-bottom: 1px solid transparent;
    &:hover,
    .active {
      color: $red-color;
      cursor: pointer;
      border-bottom: 1px solid $red-color;
    }
  }
  .line {
    position: absolute;
    bottom: 0;
  }
}
.rest-images {
  position: relative;
  width: 300px;
  height: 200px;
  cursor: pointer;
  .hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.food-category {
  h2 {
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    padding: 9px 30px;
    color: #000;
    transition: 0.22s;
    cursor: pointer;
    &:hover,
    &-active {
      border-color: $red-color;
    }
  }
  .active {
    border-color: $red-color;
  }
}

.food {
  width: 100%;
  max-width: 303px;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;

  .title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
  }
}
.more-btn {
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  padding: 15px 35px;
  font-size: 25px;
  line-height: 29px;
  transition: 0.22s;
  &:hover {
    border-color: $red-color;
  }
}

.reviews-p {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 23px;

  color: #000000;

  max-width: 374px;
}
.categories-rate {
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}
.bold {
  font-weight: 600;
}

.comment {
  width: 100%;
  max-width: 610px;

  display: grid;
  grid-gap: 40px;
  grid-template-columns: 18% 1fr;

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .name {
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
  }
  .reviews {
    font-size: 13px;
    line-height: 15px;
  }
  .rate {
    font-size: 12px;
    line-height: 14px;
  }
  .rate-categories {
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    span {
      margin-left: 8px;
      color: $red-color;
    }
  }
}
.mb-145 {
  margin-bottom: 145px;
}
</style>
