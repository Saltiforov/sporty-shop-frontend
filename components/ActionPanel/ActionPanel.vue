<template>
  <div class="action-panel w-full flex justify-between items-center">

    <div v-if="responsive" class="menu min-w-[44px]">
      <Button @click="handleMobileMenu" :pt="buttonPT">
        <img v-if="!isOpenMobileMenu" src="~/assets/icons/menu-icon-open.svg" alt="menu-icon-open.svg">
        <img v-else src="~/assets/icons/menu-icon-close.svg" alt="menu-icon-close.svg">
      </Button>
    </div>

    <button
        :disabled="!canUseFavorite"
        @click="navigateTo('/profile/favorites')"
        :pt="buttonPT"
    >
      <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M25.3559 3.35597C27.6759 5.67593 27.7647 9.40902 25.5578 11.8367L14.4992 24.0001L3.44218 11.8367C1.23519 9.40898 1.32407 5.67585 3.64404 3.35588C6.23441 0.765507 10.5006 1.00221 12.7891 3.8628L14.5 6.00068L16.2095 3.86256C18.4979 1.00197 22.7656 0.76559 25.3559 3.35597Z"
            :stroke="canUseFavorite" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        />
      </svg>
    </button>

    <div class="relative flex inline-block" @click="profileAction">
      <button type="button" aria-haspopup="true" aria-controls="overlay_menu" :pt="buttonPT">
        <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M25.5 28.5C25.5 24.3579 20.1274 21 13.5 21C6.87258 21 1.5 24.3579 1.5 28.5M13.5 16.5C9.35786 16.5 6 13.1421 6 9C6 4.85786 9.35786 1.5 13.5 1.5C17.6421 1.5 21 4.85786 21 9C21 13.1421 17.6421 16.5 13.5 16.5Z"
              :stroke="isUserLogin" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          />
        </svg>
      </button>

      <Menu
          ref="menu"
          id="overlay_menu"
          :model="items"
          :popup="true"
          :class="{ top: '90px' }"
          :pt="menuPT"
      />
    </div>

    <button @click="$emit('showShoppingCart')" :pt="buttonPT">
      <div class="badge-container">
        <img src="~/assets/icons/shopping-cart-icon.svg" alt="shopping-cart-icon"/>
        <Badge :value="cartCount" severity="secondary" class="custom-badge"/>
      </div>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  canUseFavorite: String,
  isUserLogin: String,
  items: Array,
  cartCount: Number,
  responsive: {
    type: Boolean,
    default: false
  },
  isOpenMobileMenu: {
    type: Boolean,
    default: false
  }
})


const emit = defineEmits(['toggle', 'showShoppingCart', 'handle-mobile-sidebar'])

const token = useCookie('token')

const isUserLogin = computed(() => token.value ? 'var(--color-primary-green)' : 'var(--color-gray-pale-lavender)')

const canUseFavorite = computed(() => token.value ? 'var(--color-gray-pale-lavender)' : 'var(--color-muted-gray)')

const menu = ref();

const handleMobileMenu = () => {
  emit('handle-mobile-sidebar')
}

const profileAction = computed(() => props.responsive ? redirectToProfile : toggle)

const toggle = (event) => {
  menu.value.toggle(event);
};

const redirectToProfile = () => {
  return token.value
      ? navigateTo('/profile/personal-information')
      : navigateTo('/auth/login')
}

const buttonPT = {
  root: {
    style: {
      background: 'transparent',
      border: 'none',
      padding: '0 10px',
    }
  }
}

const menuPT = {
  root: {
    class: `
      absolute left-1/2 translate-x-[15%] translate-y-[10%] top-full mt-20 z-500
      bg-[var(--color-gray-light-lavender)]
      before:content-[''] before:absolute before:top-[-26px]
      before:right-[40px] before:border-[13px] before:border-transparent
      before:border-b-[var(--color-gray-light-lavender)]
    `
  },
  submenuLabel: {class: 'p-0'},
  itemLink: {class: 'border-b border-[var(--color-primary-pure-white)] last:pb-[10px]'}
}
</script>

<style scoped>
.badge-container {
  position: relative;
  display: inline-block;
}

.custom-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(20%, -20%);
  z-index: 100;
}
</style>