<template>
  <div class="max-w-[1600px] mx-auto px-4 py-6">
    <div class="header text-[#999999] flex justify-between items-center">
      <div class="bread-crumb">
        Головна >> Каталог >> Спортивне харчування >> Бустери
      </div>
      <div class="article">
        <p>Артикул: 9876678</p>
      </div>
    </div>

    <h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>
    <img :src="product.image" class="w-full max-w-md mb-4 rounded-lg" />
    <p class="text-lg text-gray-700 mb-2">Цена: {{ product.price }} ₽</p>
    <p class="text-gray-500">Рейтинг: {{ product.grade }} ({{ product.countOfReviews }} отзывов)</p>
  </div>
</template>

<script setup>

const route = useRoute()
const id = route.params.id

const allProducts = [
  {
    id: '1',
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    price: 1116,
    grade: '4.6',
    countOfReviews: 10,
    image: 'https://wallpapers.com/images/high/home-gym-with-barbell-r4xvbh7jalyuhdme.webp',
  },
]

const product = allProducts.find(p => p.id === id)
</script>
