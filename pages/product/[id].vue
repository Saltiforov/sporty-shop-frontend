<template>
  <div class="max-w-[1660px] mx-auto px-4 py-6">
    <div class="header flex flex-col">
      <div class="bread-crumb">
        Головна >> Каталог >> Спортивне харчування >> Бустери
      </div>
      <div class="article self-end mb-2">
        <p>Артикул: 9876678</p>
      </div>
    </div>

    <div class="about-product-content mb-[46px] text-[#999999] flex justify-between items-center">
      <div class="image relative">
        <div class="absolute z-[100] top-2 -right-4">
          <FavoriteButton
              inactive-color="#B3261E"
              :is-favorite="product.isFavorite"
              :toggle-favorite="() => toggleFavorite(product)"
              :icon-size="{ width: 36, height: 32 }"
          />
        </div>

        <div class="max-w-[678px] h-[678px] w-full">
          <SwiperWrapper :items="images" :options="swiperOptions">
            <template #default="{ item }">
              <img
                  :src="selectedImage || item"
                  class="w-full h-[660px] object-cover"
              />
            </template>
          </SwiperWrapper>
        </div>

        <div class="flex gap-[40px] justify-center">
          <img class="max-w-[100px] cursor-pointer rounded-sm shadow-md object-cover h-[100px]"
               v-for="(img, idx) in images"
               @click="handleThumbnailClick(idx)" :src="img" :key="idx" alt="image.png">
        </div>
      </div>

      <div class="about-product-info max-w-[870px] flex flex-col self-start">
        <div class="bg-[#F2F2F7] rounded-[8px] pt-[35px] pr-[55px] pb-[65px] pl-[31px]">
          <h1 class="text-[36px] text-[#24242A] font-600 leading-[34px] mb-4">{{ product.title }}</h1>
          <div class="availability-grade mb-[73px] flex justify-between">
            <div class="availability">
              <p v-if="product.availability" class="text-[#28A745]">Є в наявності!</p>
              <p v-else class="text-[var(--color-primary-red)]">Немає в наявності!</p>
            </div>
            <div class="flex items-center">
              <svg class="mr-2" width="18" height="18" viewBox="0 0 18 17" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.75122 6.75258C1.51628 6.53531 1.6439 6.14254 1.96167 6.10487L6.46436 5.5708C6.59387 5.55544 6.70636 5.47411 6.76099 5.35569L8.66016 1.23835C8.79419 0.947769 9.20728 0.947714 9.34131 1.23829L11.2405 5.3556C11.2951 5.47403 11.4069 5.55558 11.5364 5.57093L16.0393 6.10487C16.3571 6.14254 16.4843 6.53543 16.2494 6.75269L12.9208 9.83143C12.8251 9.91998 12.7824 10.0518 12.8079 10.1797L13.6913 14.627C13.7536 14.9408 13.4196 15.184 13.1404 15.0277L9.18386 12.8125C9.07006 12.7488 8.9318 12.7491 8.818 12.8128L4.86108 15.0271C4.58185 15.1834 4.24721 14.9408 4.30957 14.627L5.19311 10.18C5.21852 10.0521 5.176 9.91995 5.08025 9.8314L1.75122 6.75258Z"
                    stroke="#FFCC00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="product-grade text-[16px] text-[#8E8E93] fw-500">{{ product.grade }}
                <span>({{ product.countOfReviews }})</span></p>
            </div>
          </div>
          <div class="description">
            <p class="fw-500 text-[18px] leading-[34px] text-[var(--color-primary-dark)]">{{ product.description }}</p>
          </div>
          <div class="developer mb-[24px]">
            <p class="text-[20px] fw-400 leading-[34px]">Виробник: {{ product.developer }}</p>
          </div>
          <div class="price mb-10 flex items-center">
            <div class="fw-600 mr-[57px] text-[#000000] text-[36px] leading-[34px]">{{ product.price }} <span>грн</span>
            </div>
            <AmountSelector v-model="product.quantity" :style="{ width: '129px' }"
                            :input-styles="{ width: '53px', height: '60px' }"/>
          </div>
          <div class="action-button text-[#F6F6F6]">
            <button class="bg-[#28A745] rounded-2xl max-w-[456px] w-full h-[59px] flex justify-center items-center">
              <p class="mr-1">Купити</p>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 1H1.26835C1.74213 1 1.97943 1 2.17267 1.08548C2.34304 1.16084 2.48871 1.28218 2.59375 1.43604C2.71269 1.61026 2.75564 1.8429 2.84137 2.30727L5.00004 14L15.4218 14C15.875 14 16.1023 14 16.29 13.9199C16.4559 13.8492 16.5989 13.7346 16.7051 13.5889C16.8252 13.4242 16.8761 13.2037 16.9777 12.7631L16.9785 12.76L18.5477 5.95996L18.5481 5.95854C18.7023 5.29016 18.7796 4.95515 18.6947 4.69238C18.6202 4.46182 18.4635 4.26634 18.2556 4.14192C18.0184 4 17.6758 4 16.9887 4H3.5M16 19C15.4477 19 15 18.5523 15 18C15 17.4477 15.4477 17 16 17C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19ZM6 19C5.44772 19 5 18.5523 5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18C7 18.5523 6.55228 19 6 19Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="tabs-wrapper rounded-md bg-[#F2F2F7] pt-[12px] pl-[55px] pr-[55px] pb-[32px]">
      <TabView>
        <TabPanel header="Header I">
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </TabPanel>
        <TabPanel :header="tabs.characteristics.header">
          <div class="characteristics-list max-w-[1030px] w-full">
            <div
                v-for="characteristic in tabs.characteristics.list"
                :key="characteristic.key"
                class="flex items-center gap-4 py-2"
            >
              <p class="characteristics-list__title whitespace-nowrap">
                {{ characteristic.key }}
              </p>
              <div
                  class="flex-grow h-px bg-[#5856D6]"
                  style="margin-top: 1em;"
              ></div>
              <p class="characteristics-list__value whitespace-nowrap">
                {{ characteristic.value }}
              </p>
            </div>
          </div>


        </TabPanel>
        <TabPanel header="Доставка та оплата">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
            officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
      </TabView>
    </div>

  </div>
</template>

<script setup>
import ProductImage from 'assets/images/product-image.png'

const swiperOptions = {
  effect: 'cards',
  loop: true,
  autoplay: {
    delay: 1000,
  },
}

const selectedImage = ref(null)

const handleThumbnailClick = (index) => {
  selectedImage.value = images.value[index]
}

const images = ref([
  ProductImage,
  ProductImage,
  ProductImage,
])

import AmountSelector from "~/components/UI/AmountSelector/AmountSelector.vue";
import FavoriteButton from "~/components/UI/FavoriteButton/FavoriteButton.vue";

const route = useRoute()
const id = route.params.id

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite;
}

const allProducts = ref([
  {
    id: '1',
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    price: 1116,
    grade: '4.6',
    quantity: 8,
    countOfReviews: 30,
    developer: "BioTech",
    description: "Nutrex Anabol допомагає збільшити синтез протеїну в скелетних м'язах, при одночасному зменшенні впливу протеолітичних процесів. Надаючи кращі адаптогенні ефекти в тренувальному процесі і харчуванні, Anabol 5 допомагає дорегулювати власний цикл білка в організмі.",
    image: 'https://wallpapers.com/images/high/home-gym-with-barbell-r4xvbh7jalyuhdme.webp',
    availability: true
  },
])

const tabs = {
  description: {
    header: "Опис",
  },
  characteristics: {
    header: "Характеристики",
    list: [
      { key: "Виробник", value: "Nutrex Research" },
      { key: "Тип продукту", value: "Анаболічна добавка" },
      { key: "Форма випуску", value: "Капсули" },
      { key: "Кількість в упаковці", value: "60 капсул" },
      { key: "Основні інгредієнти", value: "Анаболічний комплекс на основі рослинних стероїдів" },
      { key: "Призначення", value: "Підвищення сили, витривалості та набору м’язової маси" },
      { key: "Рекомендована доза", value: "2 капсули на день (1 вранці, 1 ввечері)" },
      { key: "Час прийому", value: "Після їжі" },
      { key: "Особливості", value: "Без гормонів, не впливає на рівень тестостерону" },
      { key: "Кому підходить", value: "Спортсменам та бодібілдерам" },
      { key: "Протипоказання", value: "Індивідуальна непереносимість, вагітність, період лактації" },
      { key: "Термін придатності", value: "Вказаний на упаковці" },
    ]
  }
}

const product = allProducts.value.find(p => p.id === id)
</script>

<style>
.p-tabview-tablist-item-active {
  position: relative;
}

.p-tabview-tablist-item-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #5856D6;
}
</style>
