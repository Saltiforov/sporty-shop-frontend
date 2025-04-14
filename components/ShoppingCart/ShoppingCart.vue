<template>
  <div v-if="true" class="overlay">
    <div class="shopping-cart rounded-tl-[32px] rounded-bl-[32px]">
      <div class="header flex justify-between pb-[49px] items-center">
        <div class="flex">
          <h1 class="large-title mr-[25px]">Кошик</h1>
          <p class="large-title" style="color: #999999">(10)</p>
        </div>
        <div>
          <Button>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.63597 1.63649L7.51465 7.51517M7.51465 7.51517L13.3933 13.3938M7.51465 7.51517L1.63597 13.3938M7.51465 7.51517L13.3933 1.63649" stroke="#9E2B24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
      <div class="shopping-cart-content grid grid-rows-auto gap-4">
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.shopping-cart {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 620px;
  background-color: #E6E7F8;
  z-index: 1000;
  box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
}
</style>
