<template>
  <div class="w-full pt-[32px] pr-[24px] pb-[24px] pl-[28px]  border border-[#8E8E93] max-w-[294px] h-auto aspect-[294/426] mx-auto rounded-lg flex flex-col justify-between">
    <div class="flex relative flex-col items-center justify-center">

      <div class="absolute flex items-center justify-center h-[32px] w-[32px] z-10 -top-3 -right-2">
        <Button @click="toggleFavorite">
          <svg :style="{ fill: isActive ? '#B3261E' : ''}" width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.6497 3.3164C24.7119 5.37858 24.7909 8.69688 22.8291 10.8548L12.9993 21.6667L3.17083 10.8548C1.20906 8.69685 1.28806 5.37851 3.35025 3.31632C5.65281 1.01376 9.44496 1.22417 11.4792 3.76692L13 5.66725L14.5195 3.7667C16.5537 1.22395 20.3472 1.01384 22.6497 3.3164Z" stroke="#7F7F7F" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="mix-blend-mode:luminosity"/>
            <path d="M22.6497 3.3164C24.7119 5.37858 24.7909 8.69688 22.8291 10.8548L12.9993 21.6667L3.17083 10.8548C1.20906 8.69685 1.28806 5.37851 3.35025 3.31632C5.65281 1.01376 9.44496 1.22417 11.4792 3.76692L13 5.66725L14.5195 3.7667C16.5537 1.22395 20.3472 1.01384 22.6497 3.3164Z" :style="{stroke: isActive ? '#B3261E' : 'gray' }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="mix-blend-mode:overlay"/>
          </svg>
        </Button>
      </div>


        <NuxtLink :to="`/product/${product.id}`" class="block mb-6">
          <img class="rounded-lg" src="@/assets/images/product-image.png" alt="Product image">
        </NuxtLink>


      <div class="product-name mb-[31px]">
        <p class="text-[24px] leading-[22px] fw-500 line-clamp-3">{{ product.title }}</p>
      </div>

    </div>

    <div class="flex items-center justify-between mt-6">
      <div>
        <div class="product-reviews mb-2  flex items-center">
          <svg class="mr-2" width="18" height="18" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.75122 6.75258C1.51628 6.53531 1.6439 6.14254 1.96167 6.10487L6.46436 5.5708C6.59387 5.55544 6.70636 5.47411 6.76099 5.35569L8.66016 1.23835C8.79419 0.947769 9.20728 0.947714 9.34131 1.23829L11.2405 5.3556C11.2951 5.47403 11.4069 5.55558 11.5364 5.57093L16.0393 6.10487C16.3571 6.14254 16.4843 6.53543 16.2494 6.75269L12.9208 9.83143C12.8251 9.91998 12.7824 10.0518 12.8079 10.1797L13.6913 14.627C13.7536 14.9408 13.4196 15.184 13.1404 15.0277L9.18386 12.8125C9.07006 12.7488 8.9318 12.7491 8.818 12.8128L4.86108 15.0271C4.58185 15.1834 4.24721 14.9408 4.30957 14.627L5.19311 10.18C5.21852 10.0521 5.176 9.91995 5.08025 9.8314L1.75122 6.75258Z"
                stroke="#FFCC00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="product-grade text-[16px] text-[#8E8E93] fw-500">{{ product.grade }}
            <span>({{ product.countOfReviews }})</span></p>
        </div>
        <p class="text-[24px] leading-[22px] fw-500">{{ product.price }} грн</p>
      </div>

      <button
          class="text-white self-end flex items-center w-[50px] h-[50px] bg-[#28A745] px-4 py-2 rounded-md hover:bg-gray-800 transition">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M1 1H1.26835C1.74213 1 1.97943 1 2.17267 1.08548C2.34304 1.16084 2.48871 1.28218 2.59375 1.43604C2.71269 1.61026 2.75564 1.8429 2.84137 2.30727L5.00004 14L15.4218 14C15.875 14 16.1023 14 16.29 13.9199C16.4559 13.8492 16.5989 13.7346 16.7051 13.5889C16.8252 13.4242 16.8761 13.2037 16.9777 12.7631L16.9785 12.76L18.5477 5.95996L18.5481 5.95854C18.7023 5.29016 18.7796 4.95515 18.6947 4.69238C18.6202 4.46182 18.4635 4.26634 18.2556 4.14192C18.0184 4 17.6758 4 16.9887 4H3.5M16 19C15.4477 19 15 18.5523 15 18C15 17.4477 15.4477 17 16 17C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19ZM6 19C5.44772 19 5 18.5523 5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18C7 18.5523 6.55228 19 6 19Z"
              stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>


<script setup>

const isActive = ref(true)

const toggleFavorite = () => {
  isActive.value = !isActive.value
}

defineProps({
  product: {
    type: Object,
    required: true,
    default: () => {
    }
  }
})

</script>

<style scoped>

</style>