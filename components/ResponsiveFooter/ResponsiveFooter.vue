<template>
  <footer class="fixed bottom-0 left-0 w-full z-[1000] responsive-footer flex flex-col p-4 shadow">
    <div class="responsive-footer-container w-full flex justify-between">


      <div class="actions-wrapper w-full flex justify-between items-center">

        <div class="menu">
          <Button  @click="handleMobileMenu" :pt="{ root: { class: 'action-panel-icon' } }">
            <img v-if="!isOpen" src="~/assets/icons/menu-icon-open.svg" alt="menu-icon-open.svg">
            <img v-else src="~/assets/icons/menu-icon-close.svg" alt="menu-icon-close.svg">
          </Button>
        </div>


        <Button :disabled="!canUseFavorite" @click="navigateTo('/profile/favorites')"
                :pt="{ root: { class: 'action-panel-icon' } }">
          <svg width="27" height="23" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M25.3559 3.35597C27.6759 5.67593 27.7647 9.40902 25.5578 11.8367L14.4992 24.0001L3.44218 11.8367C1.23519 9.40898 1.32407 5.67585 3.64404 3.35588C6.23441 0.765507 10.5006 1.00221 12.7891 3.8628L14.5 6.00068L16.2095 3.86256C18.4979 1.00197 22.7656 0.76559 25.3559 3.35597Z"
                :stroke="canUseFavorite" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Button>
        <div class="relative flex inline-block" >
          <Button
              type="button"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              :pt="{ root: { class: 'action-panel-icon' } }"
              @click="redirectToProfile"
          >
            <svg width="25" height="28" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M25.5 28.5C25.5 24.3579 20.1274 21 13.5 21C6.87258 21 1.5 24.3579 1.5 28.5M13.5 16.5C9.35786 16.5 6 13.1421 6 9C6 4.85786 9.35786 1.5 13.5 1.5C17.6421 1.5 21 4.85786 21 9C21 13.1421 17.6421 16.5 13.5 16.5Z"
                  :stroke="isUserLogin" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Button>
        </div>

        <Button @click="showShoppingCart" :pt="{ root: { class: 'action-panel-icon' } }">
          <div class="badge-container">
            <svg width="27" height="28" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M1 1.5H1.40252C2.11319 1.5 2.46915 1.5 2.759 1.62822C3.01456 1.74126 3.23306 1.92326 3.39062 2.15405C3.56904 2.41538 3.63346 2.76435 3.76206 3.46091L7.00006 21.0001L22.6327 21C23.3125 21 23.6535 21 23.935 20.8799C24.1838 20.7738 24.3983 20.6019 24.5576 20.3834C24.7378 20.1363 24.8141 19.8055 24.9666 19.1446L24.9678 19.1399L27.3216 8.93994L27.3221 8.9378C27.5535 7.93523 27.6694 7.43273 27.5421 7.03857C27.4304 6.69273 27.1953 6.39951 26.8834 6.21288C26.5277 6 26.0137 6 24.9831 6H4.75M23.5 28.5C22.6716 28.5 22 27.8284 22 27C22 26.1716 22.6716 25.5 23.5 25.5C24.3284 25.5 25 26.1716 25 27C25 27.8284 24.3284 28.5 23.5 28.5ZM8.5 28.5C7.67157 28.5 7 27.8284 7 27C7 26.1716 7.67157 25.5 8.5 25.5C9.32843 25.5 10 26.1716 10 27C10 27.8284 9.32843 28.5 8.5 28.5Z"
                  stroke="#F2F2F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </Button>
      </div>
    </div>
  </footer>
</template>

<script setup>

import {useCartStore} from "~/stores/cart.js";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits(['handle-mobile-sidebar'])

const cartStore = useCartStore();

const token = useCookie('token')

const { t } = useI18n()

const handleMobileMenu = () => {
  emit('handle-mobile-sidebar')
}

const isUserLogin = computed(() => token.value ? 'var(--color-primary-green)' : 'var(--color-gray-pale-lavender)')

const canUseFavorite = computed(() => token.value ? 'var(--color-gray-pale-lavender)' : 'var(--color-muted-gray)')

const showShoppingCart = () => {
  cartStore.open()
};

const redirectToProfile = () => {
  if (token.value) {
    return navigateTo('/profile/personal-information');
  } else {
    return navigateTo('/auth/login');
  }
}

</script>


<style scoped>
.action-panel-icon {
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
}

button {
  padding: 0;
}

.action-panel-icon:last-child {
  margin: 0px;
}

.action-panel-icon:hover {
  background: transparent;
  border: none;
}

@media (min-width: 670px) {
  .responsive-footer {
    display: none !important;
  }
}

</style>