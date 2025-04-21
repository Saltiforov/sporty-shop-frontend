<template>
    <Accordion :value="['0']" multiple>
      <AccordionPanel :pt="{
        root: {
          class: 'border-0'
        }
      }" class="mb-5" v-for="(item, idx) in orderList" :value="idx" :key="item.id">
        <AccordionHeader :pt="{
          root: {
            class: 'pt-[14px] accordion-header-style pb-[14px] rounded-[12px]'
          }
        }" >
          <div class="flex w-full items-center justify-between">
            <p class="title-lg-20">Замовлення №{{ item.orderNumber }}</p>
            <div class="order-status  text-white px-[12px] bg-[var(--color-primary-purple)] rounded-[var(--default-rounded)] py-[10px] mx-[20px]">
              {{ item.status }}
            </div>
          </div>
        </AccordionHeader>
        <AccordionContent>
          <div class="order-item-content-wrapper px-[48px] pb-[46px]">
            <div class="card-item grid gap-7 mb-[27px]">
              <CartItem
                  v-for="item in shoppingCartItems"
                  :cart-product="item"
                  :key="item.id"
                  :is-history-view="true"
              />
              <div class="history-view-price justify-end text-[var(--color-primary-red)] title-lg-20 flex">
                <p class="mr-5">Разом:</p>
                <p>{{ finalPrice }} грн</p>
              </div>
            </div>
            <div class="flex text-[var(--color-gray-dark-charcoal)] max-w-[890px] justify-between">
              <div class="flex flex-col gap-6 w-full max-w-[427px]">
                <p v-for="(value, label) in item.userInfo" :key="label">{{ label }}</p>
              </div>

              <div class="flex flex-col gap-6 w-full max-w-[427px]">
                <p v-for="(value, label) in item.userInfo" :key="label">{{ value }}</p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
</template>

<script setup>
import CartItem from "~/components/Cards/CartItem/CartItem.vue";
import {calculateTotal} from "~/utils/index.js";

const finalPrice = computed(() => calculateTotal(shoppingCartItems.value, true))


const orderList = [
  {
    id: 1,
    orderNumber: 1111115,
    status: 'Відправлено',
    firstName: 'Іван',
    lastName: 'Петренко',
    phone: '+380 99 765 55 55',
    email: 'qwerty@gmail.com',
    userInfo: {
      'Електронна пошта': 'qwerty@gmail.com',
      'Телефон': '+380 99 765 55 55',
      'Прізвище': 'Огірковий',
      'Ім’я': 'Огірок',
      'Адреса доставки:': 'Київ',
      'Додаткова інформація про доставку:': 'Відділення НП №60'

    }
  },
  {
    id: 2,
    orderNumber: 1532415,
    status: 'В обробці',
    firstName: 'Марія',
    lastName: 'Шевченко',
    phone: '+380 97 123 45 67',
    email: 'maria@example.com',
    userInfo: {
      'Електронна пошта': 'qwerty@gmail.com',
      'Телефон': '+380 99 765 55 55',
      'Прізвище': 'Огірковий',
      'Ім’я': 'Огірок',
      'Адреса доставки:': 'Київ',
      'Додаткова інформація про доставку:': 'Відділення НП №60'
    }
  }
];


const
    shoppingCartItems = ref([
      {
        image: '@/assets/images/product-image.png',
        name: 'Nutrex Research Anabol Hardcore - 60 капс',
        quantity: 3,
        price: 1121,
        id: 1,
        discountPrice: 999
      },
      {
        image: '@/assets/images/product-image.png',
        name: 'Nutrex Research Anabol Hardcore - 60 капс',
        quantity: 3,
        price: 1121,
        id: 1,
        discountPrice: 999
      },
    ])

</script>

<style scoped>
.accordion-header-style {
  color: var(--color-primary-dark);
}
</style>