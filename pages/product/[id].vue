<template>
  <div class="px-4 py-6">
    <div class="header flex flex-col">
      <div class="article text-[#999999] self-end mb-2">
        <p>Артикул: 9876678 {{ }} </p>
      </div>
    </div>

    <div
        class="about-product-content mb-[46px] text-[#999999] flex flex-col lg:flex-row flex-wrap justify-between items-center gap-8">
      <div class="image relative w-full lg:max-w-[678px]">
        <div class="absolute z-[100] top-2 -right-4">
          <FavoriteButton
              inactive-color="#B3261E"
              :is-favorite="product.isFavorite"
              :toggle-favorite="() => toggleFavorite(product)"
              :icon-size="{ width: 36, height: 32 }"
          />
        </div>

        <div class="max-w-[678px] h-[678px] w-full">
          <SwiperWrapper
              :items="images"
              :options="swiperOptions"
              @swiper-slide-to-left="slideChange"
              @swiper-slide-to-right="slideChange"
          >
            <template #default="{ item }">
              <img
                  :src="getSelectedImage(selectedImage, item)"
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

      <div class="about-product-info w-full flex flex-col self-start max-w-full lg:max-w-[870px]">
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
        <TabPanel header="Опис">
          <p class="m-0">
            <p class="mb-4">
              <strong>Nutrex Anabol</strong>  допомагає збільшити синтез протеїну в скелетних м'язах, при одночасному
              зменшенні впливу
              протеолітичних процесів. Надаючи кращі адаптогенні ефекти в тренувальному процесі і харчуванні, Anabol 5
              допомагає дорегулювати власний цикл білка в організмі.
              Anabol від Nutrex представляє собою універсальний продукт, який може бути використаний в якості доповнення
              при прагненні набрати максимальну вагу і збільшити розміри, а також в процесі сушки, щоб зберегти і
              наростити якісні м'язи. <strong>Що робить Anabol 5 таким анаболічним?</strong>
            </p>
            <p class="mb-4"><strong>Ді-циклопентанон</strong> . Є синтетичним аналогом рослинного стеролу з високою
              анаболічною дією, який виявляє себе
              при збільшенні затримки азоту в м'язах. Це означає, що в Anabol 5 ді-циклопентанон сприяє збільшенню
              вмісту
              білка в м'язах, а це в свою чергу спричиняє збільшення м'язової маси.</p>
            <p class="mb-4"><strong>6-кето-диосгенин ацетат, пропіонат, ципіонат, деканоат-ефір</strong>
              6-кето-диосгенин ацетат, пропіонат, ципіонат, деканоат-ефір. 6-кето-діосгенін є сапоніном природного
              походження, який виявляє анаболічну активність, не проявляючи жодних андрогенних властивостей. Його
              анаболізм полягає в збільшенні затримки азоту. Крім цього, 6-кето-діосгенін в наукових дослідженнях
              показав
              свою ефективність в наборі м'язової маси. 6-кето-діосгенін в Anabol 5 пов'язаний з 4 різними ефірами, що
              гарантують швидку, середню і тривалу дію.
              Гекогенін ацетат. Гекогенін – це також естеризована версія сапоніна природного походження. В результаті
              застосування він показав свою ефективність в зниженні м'язового запалення. Крім того, він допомагає
              поліпшити відновлювальні процеси після тренування і сприяє збільшенню м'язової маси і сили.</p>
            <p><strong>Рекомендації щодо застосування:</strong> Приймайте 1 рідку капсулу вранці та 1 рідку капсулу
              ввечері. Для досягнення
              найкращих результатів використовуйте щодня і циклічно. Рекомендована тривалість циклу – 12 тижнів, 4 тижні
              перерва.</p>
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
          <div class="delivery-and-payment">
            <div class="mb-4">
              <strong class="fw-600 leading-[33px]">Оплата</strong>
            </div>
            <p class="mb-4">Оплата здійснюється через <strong>Telegram</strong>. Після оформлення замовлення наш
              менеджер зв’яжеться з вами у Telegram для підтвердження замовлення та надасть реквізити для оплати.</p>
            <div class="mb-4">
              <strong>Доступні методи оплати:</strong>
              <ul class="list-disc pl-6">
                <li>Банківський переказ (Monobank, ПриватБанк та інші)</li>
                <li>Переказ на картку</li>
                <li>Криптовалюта (за запитом)</li>
              </ul>
            </div>

            <div class="mb-4">
              <strong>Доставка</strong>
              <div>
                <p>По Україні:</p>
                <ul class="list-disc pl-6">
                  <li>Нова Пошта – 1-3 дні, згідно з тарифами перевізника</li>
                  <li>Укрпошта – 3-7 днів</li>
                </ul>
              </div>
              <div>
                <p>Міжнародна доставка:</p>
                <ul class="list-disc pl-6">
                  <li>Доставка в інші країни здійснюється через міжнародні поштові сервіси</li>
                  <li>Терміни та вартість доставки залежать від країни одержувача та вибраного перевізника</li>
                  <li>Після відправки ви отримаєте номер для відстеження посилки</li>
                </ul>
              </div>

            </div>

            <div>
              <div>
                <p>📌 Важливо!</p>
                <ul class="list-disc pl-6">
                  <li>Відправка здійснюється тільки після повної передоплати</li>
                  <li>Точну вартість міжнародної доставки уточнюйте у менеджера в Telegram</li>
                </ul>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Відгуки">
          <div class="reviews-content  murecho-font flex justify-between">

            <div class="review-list pt-[26px] justify-self-start">
              <div class="review-card mb-[23px] last:mb-0 max-w-[518px]" v-for="review in reviews">
                <div class="flex justify-between items-center">
                  <p class="review-card__name fw-600">{{ review.name }}</p>
                  <div class="review-card__date text-[14px]">{{ review.date }}</div>
                  <div class="review-card__stars">
                    <Rating v-model="review.stars" readonly>
                      <template #onicon>
                        <img src="@/assets/icons/star-filled.svg" class="mr-1"/>
                      </template>
                      <template #officon>
                        <img src="@/assets/icons/star-empty.svg" class="mr-1"/>
                      </template>
                    </Rating>
                  </div>
                  <div class="review-card__confirmed text-[#ADADAD] fw-400">
                    <p v-if="review.purchaseConfirmed">Покупка підтверджена!</p>
                    <p v-else>Покупка не підтверджена!</p>
                  </div>
                </div>

                <p class="review-card__comment">{{ review.comment }}</p>
              </div>
            </div>

            <div class="review-form max-w-[642px] w-full">
              <div class="mb-4">
                <strong><h2 class="form-title fw-500">Новий відгук</h2></strong>
              </div>
              <div class="border mb-4 rounded-[8px] py-[10px] px-[10px] bg-white  max-w-[354px]">
                <InputText class="w-full h-[42px] py-[10px] rounded-[8px]" placeholder="Ваше ім’я"/>
              </div>
              <div class="bg-white mb-[10px] py-[10px] px-[10px] rounded-[8px]">
                <Textarea style="resize: none" class="w-full rounded-[8px]" placeholder="Поділіться вашими враженнями"
                          rows="5" cols="30"/>
              </div>

              <div class="rate-product mb-[27px] flex items-center">
                <p class="mr-[10px] text-[14px]">Оцініть товар</p>
                <Rating>
                  <template #onicon>
                    <img src="@/assets/icons/star-filled.svg" class="mr-1"/>
                  </template>
                  <template #officon>
                    <img src="@/assets/icons/star-empty.svg" class="mr-1"/>
                  </template>
                </Rating>
              </div>

              <div
                  class="send-review__btn  text-center rounded-[8px] text-[#FFFFFF] py-[10px] px-[10px] bg-[var(--color-primary-dark)] max-w-[386px]">
                <Button><p class="text-[14px]">Надіслати відгук</p></Button>
              </div>

            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>

    <div class="recommended-products">
      <div class="flex items-center justify-center mb-[70px] gap-6 my-8">
        <div class="h-px w-[56px] bg-[#5856D6]"></div>
        <h2 class="text-xl font-semibold text-center whitespace-nowrap">
          Рекомендовані товари
        </h2>
        <div class="h-px w-full bg-[#5856D6]"></div>
      </div>

      <div class="recommended-products__content mx-auto max-w-[1500px] pb-[70px] p-4">
        <SwiperWrapper :items="products" :options="recommendedProductsSwiperOptions">
          <template #default="{ item }">
            <ProductCard class="mt-3 mb-3" :product="item"/>
          </template>
        </SwiperWrapper>
      </div>
    </div>

    <div class="viewed-products flex items-center justify-center gap-6 my-8">
      <div class="h-px w-[56px] bg-[#5856D6]"></div>
      <h2 class="text-xl font-semibold text-center whitespace-nowrap">
        Переглянуті товари
      </h2>
      <div class="h-px w-full bg-[#5856D6]"></div>
    </div>

    <div
        class="viewed-products__content mx-auto max-w-[1500px] pb-[70px] p-4">
      <SwiperWrapper :items="products" :options="recommendedProductsSwiperOptions">
        <template #default="{ item }">
          <ProductCard class="mt-3 mb-3" :product="item"/>
        </template>
      </SwiperWrapper>
    </div>


  </div>
</template>

<script setup>
definePageMeta({
  layout: 'breadcrumb',
})

import ProductImage from 'assets/images/big-product-image.png'
import SocialTelegram from 'assets/images/social-telegram.svg'

import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";
import AmountSelector from "~/components/UI/AmountSelector/AmountSelector.vue";
import FavoriteButton from "~/components/UI/FavoriteButton/FavoriteButton.vue";

const swiperOptions = {
  effect: 'cards',
  loop: true,
  autoplay: {
    delay: 1000,
  },
}

const recommendedProductsSwiperOptions = {
  slidesPerView: 4,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    756: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
    1409: {
      slidesPerView: 3,
    },
    1410: {
      slidesPerView: 4,
    },

  },
}

const reviews = [
  {
    name: "Огірковий Огірок",
    comment: "Чудовий товар! Взяв всю партію!",
    date: "07.07.2024",
    stars: 2,
    purchaseConfirmed: true
  },
  {
    name: "Огірковий Огірок",
    comment: "Протестував Nutrex Research Anabol Hardcore для набору м’язової маси та збільшення сили. Вже через тиждень помітив поліпшення: м’язи стали щільнішими, зросли робочі ваги, а відновлення після тренувань значно прискорилося.",
    date: "07.07.2024",
    stars: 5,
    purchaseConfirmed: true
  },
  {
    name: "Огірковий Огірок",
    comment: "Чудовий товар! Взяв всю партію!",
    date: "07.07.2024",
    stars: 3,
    purchaseConfirmed: true
  },
]

const slideChange = () => {
  if (selectedImage.value) {
    selectedImage.value = null
  }
}

const getSelectedImage = (selected, item) => {
  return selected || item
}

const selectedImage = ref(null)

const handleThumbnailClick = (index) => {
  selectedImage.value = images.value[index]
}

const images = ref([
  ProductImage,
  SocialTelegram,
  ProductImage,
])


const route = useRoute()
const id = route.params.id

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite;
}

const products = ref([
  {
    id: 1,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.6',
    countOfReviews: 10,
    price: 1116,
    discountPrice: 768,
    isFavorite: false,
    status: 'new',
    backgroundStatus: '#212094',
  },
  {
    id: 1,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.6',
    countOfReviews: 10,
    price: 1116,
    discountPrice: 768,
    isFavorite: false,
    status: 'new',
    backgroundStatus: '#212094',
  },
  {
    id: 1,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.6',
    countOfReviews: 10,
    price: 1116,
    discountPrice: 768,
    isFavorite: false,
    status: 'new',
    backgroundStatus: '#212094',
  },
  {
    id: 2,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.1',
    countOfReviews: 5,
    price: 3241,
    isFavorite: true,
  },
  {
    id: 2,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.1',
    countOfReviews: 5,
    price: 3241,
    isFavorite: true,
  },
])

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
      {key: "Виробник", value: "Nutrex Research"},
      {key: "Тип продукту", value: "Анаболічна добавка"},
      {key: "Форма випуску", value: "Капсули"},
      {key: "Кількість в упаковці", value: "60 капсул"},
      {key: "Основні інгредієнти", value: "Анаболічний комплекс на основі рослинних стероїдів"},
      {key: "Призначення", value: "Підвищення сили, витривалості та набору м’язової маси"},
      {key: "Рекомендована доза", value: "2 капсули на день (1 вранці, 1 ввечері)"},
      {key: "Час прийому", value: "Після їжі"},
      {key: "Особливості", value: "Без гормонів, не впливає на рівень тестостерону"},
      {key: "Кому підходить", value: "Спортсменам та бодібілдерам"},
      {key: "Протипоказання", value: "Індивідуальна непереносимість, вагітність, період лактації"},
      {key: "Термін придатності", value: "Вказаний на упаковці"},
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
