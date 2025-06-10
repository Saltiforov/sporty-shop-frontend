<template>
  <header
      :class="[
      'flex relative header flex-col items-end pt-[13px] pr-[24px] pb-[8px] pl-[71px]',
      { 'mb-[98px]': isHomePage }
    ]"
  >
    <div class="header-content w-full items-end flex">
      <div class="logo">
        <NuxtLink :to="logoLink">
          <picture>
            <source srcset="/images/mobile-header-icon.svg" media="(max-width: 679px)" type="image/svg+xml" />
            <NuxtImg
                class="logo-image"
                src="/images/header-logo.svg"
                alt="header-logo"
                width="147"
                height="115"
                preload
                format="webp"
                :modifiers="{ quality: 100 }"
                fetchpriority="high"
            />
          </picture>
        </NuxtLink>
      </div>

      <nav class="pb-[16px] header-actions justify-between items-center flex w-full">
        <LinksList
            class="links-list"
            :links="links"
            parent-classes="links-container"
            link-class="link-item text-[var(--color-gray-pale-lavender)] mr-[64px] text-[20px] last:mr-0"
        />

        <div class="product-search-wrapper max-w-[425px] w-full">
          <ProductSearch />
        </div>

        <div class="locale-switch max-w-[200px] w-full justify-between flex">
          <LocaleSwitch/>
          <CurrencySwitch />
        </div>

        <div class="action-panel max-w-[144px] w-full  ml-[10px]">
          <ActionPanel
              :canUseFavorite="canUseFavorite"
              :isUserLogin="isUserLogin"
              :items="items"
              :cartCount="cartStore.cartCount"
              @showShoppingCart="showShoppingCart"
          />
        </div>

      </nav>
    </div>
    <nav class="menu w-full text-[red] flex">
      <button @click="handleMobileMenu">
        <img v-if="!isOpen" src="~/assets/icons/menu-icon-open.svg" alt="menu-icon-open.svg">
        <img v-else src="~/assets/icons/menu-icon-close.svg" alt="menu-icon-close.svg">
      </button>
    </nav>
  </header>


  <AuthWrapper/>
</template>

<script setup>
import LocaleSwitch from "~/components/UI/LocaleSwitch/LocaleSwitch.vue";
import {useAuthStore} from "~/stores/auth.js";
import {storeToRefs} from "pinia";
import AuthWrapper from "~/wrappers/AuthWrapper.vue";
import SearchDropdownMenu from "~/components/UI/SearchDropdownMenu/SearchDropdownMenu.vue";
import CurrencySwitch from "~/components/UI/CurrencySwitch/CurrencySwitch.vue";
import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false
  }
})


const {t} = useI18n();

const route = useRoute()

const authPopup = useAuthPopup()

const {logUserOut} = useAuthStore();

const localePath = useLocalePath()

const {authenticated, isAuthenticated} = storeToRefs(useAuthStore());

const cartStore = useCartStore();

const emit = defineEmits(['handle-mobile-sidebar'])

const isUserLogin = computed(() => isAuthenticated.value ? 'var(--color-primary-green)' : 'var(--color-gray-pale-lavender)')

const canUseFavorite = computed(() => isAuthenticated.value ? 'var(--color-gray-pale-lavender)' : 'var(--color-muted-gray)')

const handleMobileMenu = () => {
  emit('handle-mobile-sidebar')
}

const showShoppingCart = () => {
  cartStore.open()
};

const logout = () => {
  logUserOut()
  navigateTo('/')
}

const isHomePage = computed(() => {
  const normalizedPath = route.path.replace(/^\/(en|uk)/, '')
  return normalizedPath === '/' || normalizedPath === ''
})

const logoLink = computed(() => {
  if (isHomePage.value) {
    return localePath({ path: '/', query: route.query })
  }
  return localePath('/')
})

const items = computed(() => {
  if (authenticated.value) {
    return [
      {
        items: [
          {label: t('my_cabinet'), command: () => navigateTo('/profile/personal-information')},
          {label: t('my_orders'), command: () => navigateTo('/profile/orders-history')},
          {label: t('logout'), command: () => logout()},
        ]
      }
    ]
  } else {
    return [
      {
        items: [
          {label: t('login'), command: () => authPopup.open('login')},
          {label: t('register'), command: () => authPopup.open('register')},
        ]
      }
    ]
  }
})


const links = ref([
  {
    label: computed(() => t('catalog')),
    icon: "pi pi-filter",
    page: "/content/catalog",
  },
  {
    label: computed(() => t('promotions')),
    icon: "pi pi-shopping-cart",
    page: "/content/promotions",
  },
  {
    label: computed(() => t('shipping_and_payment')),
    icon: "pi pi-user",
    page: "/content/shipping-and-payment",
  },
  {
    label: computed(() => t('about_us')),
    icon: "pi pi-user",
    page: "/content/about-us",
  },
  {
    label: computed(() => t('frequently_questions')),
    icon: "pi pi-user",
    page: "/content/frequently-questions",
  },
])

</script>

<style scoped>
.product-search-wrapper {
  display: block;
}

.menu {
  display: none;
}

.logo {
  margin-right: 67px;
}

.links-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 780px;
  width: 100%;
}

.input-icon {
  color: var(--color-primary-black);
}

.link-item {
  margin-right: 64px !important;
  color: #F6F6F6;
  font-weight: 600;
  font-size: 20px;
}

@media (max-width: 1768px) {
  .product-search-wrapper {
    position: absolute !important;
    top: 100px !important;
    right: 20px !important;
    left: auto !important;
  }
  .input-icon {
    color: var(--color-primary-blue);
  }
}



@media (max-width: 1500px) {
  .logo {
    margin-right: 36px;
  }
}
@media (max-width: 1400px) {
  .menu {
    display: block;
  }
  .header {
    margin-bottom: 36px;
  }
  .links-list {
    display: none;
  }
  .header-actions {
    justify-content: flex-end;
    padding-bottom: 0px;
  }
  .action-panel {
    max-width: 130px;
  }
  .product-search-wrapper{
    position: relative !important;
    top: 0 !important;
    right: 0 !important;
  }
}


@media (max-width: 950px) {
  .product-search-wrapper {
    position: absolute !important;
    top: 118px !important;
    right: 20px !important;
    left: auto !important;
  }
}

@media (max-width: 740px) {
  .header  {
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 0;
  }
  .logo {
    margin: 0;
    padding-left: 22px;
  }
}

@media (max-width: 679px) {
  .logo {
    padding-left: 0;
    width: 100%;
  }
}



@media (max-width: 670px) {
  .action-panel {
    display: none;
  }
  .menu {
    display: none;
  }
  .header-actions {
    padding-bottom: 16px;
  }
  .product-search-wrapper {
    position: absolute !important;
    top: 90px !important;
    right: 20px !important;
    left: auto !important;
    max-width: 340px !important;
  }
}

@media (max-width: 530px) {
  .header-actions {
    padding-bottom: 0px;
  }
  .locale-switch {
    flex-direction: column;
    width: auto;
    align-items: flex-end;
  }
  .action-panel {
    display: none;
  }
  .header  {
    padding-bottom: 17px;

  }
  .product-search-wrapper {
    top: 95px !important;
    right: 10px !important;
    left: auto !important;
    max-width: 259px !important;
  }
}



</style>
