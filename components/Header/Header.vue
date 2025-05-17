<template>
  <header class="flex header flex-col items-end pt-[13px] pr-[24px] pb-[8px] pl-[71px]">
    <div class="header-content w-full items-end flex">

      <div class="logo mr-[67px]">
        <NuxtLink to="/"><img src="../../assets/images/header-logo.svg" alt="header-logo"></NuxtLink>
      </div>
      <div class="pb-[24px] header-actions justify-between items-center flex w-full items-end">
        <LinksList
            class="links-list"
            :links="links"
            parent-classes="links-container"
            link-class="link-item text-[var(--color-gray-pale-lavender)] mr-[32px] text-[#F6F6F6] sm:mr-[32px] md:mr-[53px] last:mr-0"
        />
        <div class="search-field responsive-search-field max-w-[425px] w-full relative">
          <IconField>
            <InputText
                @focus="searchIsFocused = true"
                @blur="handleBlur"
                v-model="searchFieldValue"
                :pt="{ root: { class: 'header-search-field' } }"
                :placeholder="searchFieldPlaceholder"
            />
            <InputIcon
                :pt="{ root: { class: 'input-icon' } }"
                class="pi pi-search"
            />
          </IconField>

          <SearchDropdownMenu
              :show="searchIsFocused"
              :items="receivedProducts"
              @selected="dropdownItemSelect"
          />
        </div>

        <div class="locale-switch max-w-[200px] w-full justify-between flex">
          <LocaleSwitch/>
          <CurrencySwitch/>
        </div>
        <div class="action-panel max-w-[144px] w-full h-[36px] flex justify-between">
          <Button :disabled="!canUseFavorite" @click="navigateTo('/profile/favorite')"
                  :pt="{ root: { class: 'action-panel-icon' } }">
            <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M25.3559 3.35597C27.6759 5.67593 27.7647 9.40902 25.5578 11.8367L14.4992 24.0001L3.44218 11.8367C1.23519 9.40898 1.32407 5.67585 3.64404 3.35588C6.23441 0.765507 10.5006 1.00221 12.7891 3.8628L14.5 6.00068L16.2095 3.86256C18.4979 1.00197 22.7656 0.76559 25.3559 3.35597Z"
                  :stroke="canUseFavorite" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Button>
          <div class="relative flex inline-block" @click="toggle">
            <Button
                type="button"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                :pt="{ root: { class: 'action-panel-icon' } }"
            >
              <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M25.5 28.5C25.5 24.3579 20.1274 21 13.5 21C6.87258 21 1.5 24.3579 1.5 28.5M13.5 16.5C9.35786 16.5 6 13.1421 6 9C6 4.85786 9.35786 1.5 13.5 1.5C17.6421 1.5 21 4.85786 21 9C21 13.1421 17.6421 16.5 13.5 16.5Z"
                    :stroke="isUserLogin" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </Button>

            <Menu
                ref="menu"
                id="overlay_menu"
                :model="items"
                :popup="true"
                :class="{ top: '90px' }"
                :pt="{
      root: {
        class: `
          absolute left-1/2 translate-x-[15%] translate-y-[10%] top-full mt-20 z-500
          bg-[var(--color-gray-light-lavender)]
          before:content-[''] before:absolute before:top-[-26px]
          before:right-[40px] before:border-[13px] before:border-transparent
          before:border-b-[var(--color-gray-light-lavender)]
        `
      },
      submenuLabel: { class: 'p-0' },
      itemLink: { class: 'border-b border-[var(--color-primary-pure-white)] last:pb-[10px]' }
    }"
            />
          </div>

          <Button @click="showShoppingCart" :pt="{ root: { class: 'action-panel-icon' } }">
            <div class="badge-container">
              <img src="~/assets/icons/shopping-cart-icon.svg" alt="shopping-cart-icon"/>
              <Badge :value="cartStore.cartCount" severity="secondary" class="custom-badge"/>
            </div>
          </Button>
        </div>

      </div>


    </div>

    <div class="menu w-full text-[red] flex">
      <button @click="handleMobileMenu">
        <img v-if="!isOpen" src="~/assets/icons/menu-icon-open.svg" alt="menu-icon-open.svg">
        <img v-else src="~/assets/icons/menu-icon-close.svg" alt="menu-icon-close.svg">
      </button>
    </div>

  </header>

  <AuthWrapper/>

  <transition v-if="cartStore.isOpen">
    <div class="overlay"/>
  </transition>

  <transition @click="handleOverlayClick" name="slide-right">
    <ShoppingCart
        :is-open="cartStore.isOpen"
        :cart-items="cartStore.getCartProducts"
        @close="cartStore.close"
        @continue-shopping="handleContinueShopping"
    />
  </transition>

</template>

<script setup>
import LocaleSwitch from "~/components/UI/LocaleSwitch/LocaleSwitch.vue";
import {useAuthStore} from "~/stores/auth.js";
import {storeToRefs} from "pinia";
import AuthWrapper from "~/wrappers/AuthWrapper.vue";
import SearchDropdownMenu from "~/components/UI/SearchDropdownMenu/SearchDropdownMenu.vue";
import CurrencySwitch from "~/components/UI/CurrencySwitch/CurrencySwitch.vue";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false
  }
})


const {t} = useI18n();

const {$eventBus} = useNuxtApp()

const token = useCookie('token')

const authPopup = useAuthPopup()

const {logUserOut} = useAuthStore();

const {authenticated, currentUser} = storeToRefs(useAuthStore());

const isMainPage = computed(() => route.name === 'index')

const router = useRouter()

const route = useRoute()

const cartStore = useCartStore();

const emit = defineEmits(['handle-mobile-sidebar'])

const searchIsFocused = ref(false)

const receivedProducts = ref([])

const searchFieldValue = ref('')

const isUserLogin = computed(() => token.value ? 'var(--color-primary-green)' : 'var(--color-gray-pale-lavender)')

const canUseFavorite = computed(() => token.value ? 'var(--color-gray-pale-lavender)' : 'var(--color-muted-gray)')

const handleOverlayClick = (event) => {
  const clickedElement = event.target
  if (clickedElement.classList.contains('overlay')) {
    cartStore.close()
  }
}

const handleBlur = () => {
  setTimeout(() => {
    searchIsFocused.value = false
  }, 150)
}

const dropdownItemSelect = () => {
  searchIsFocused.value = false
  receivedProducts.value = []
}

const handleMobileMenu = () => {
  emit('handle-mobile-sidebar')
}

const showShoppingCart = () => {
  cartStore.open()
};

const handleContinueShopping = () => {
  cartStore.close()
  navigateTo('/')
}

const logout = () => {
  logUserOut()
  navigateTo('/')
}

const menu = ref();
const items = computed(() => {
  if (authenticated.value) {
    return [
      {
        items: [
          {label: t('my_cabinet'), command: () => navigateTo('/profile/personal-information')},
          {label: t('my_orders'), command: () => navigateTo('/profile/orders')},
          {label: t('logout'), command: () => logout()},
        ]
      }
    ]
  } else {
    return [
      {
        items: [
          {label: t('auth_login'), command: () => authPopup.open('login')},
          {label: t('auth_register'), command: () => authPopup.open('register')},
        ]
      }
    ]
  }
})

const toggle = (event) => {
  menu.value.toggle(event);
};

const searchFieldPlaceholder = computed(() => t('search_placeholder'))

const links = ref([
  {
    label: computed(() => t('header_catalog')),
    icon: "pi pi-filter",
    page: "/content/catalog",
  },
  {
    label: computed(() => t('header_promotions')),
    icon: "pi pi-shopping-cart",
    page: "/content/promotions",
  },
  {
    label: computed(() => t('header_new')),
    icon: "pi pi-user",
    page: "/content/new-arrivals",
  },
  {
    label: computed(() => t('header_shipping_and_payment')),
    icon: "pi pi-user",
    page: "/content/shipping-and-payment",
  },
  {
    label: computed(() => t('header_about_us')),
    icon: "pi pi-user",
    page: "/content/about-us",
  },
])

const searchStore = useSearchStore()

watch(searchFieldValue, (val) => {
  if (!isMainPage.value) {
    searchStore.emitSearch(searchFieldValue.value)
    return
  }

  const currentQuery = {...route.query}
  const updatedQuery = {
    ...currentQuery,
    q: val?.trim() || undefined,
  }

  router.push({path: route.path, query: updatedQuery})
})


watch(() => route.query.q, (val) => {
  if (!val) {
    searchFieldValue.value = ''
  }
})

onMounted(() => {
  $eventBus.on('products-found', (products) => {
    receivedProducts.value = products
  })
})

onBeforeUnmount(() => {
  $eventBus.off('products-found', (products) => {
    receivedProducts.value = products
  })
})


</script>

<style scoped>
.action-panel-icon {
  background: transparent;
  border: none;
  padding: 0 10px;
}

.action-panel-icon:hover {
  background: transparent;
  border: none;
  padding: 0 10px;
}

.header-search-field {
  width: 100%;
  padding: 11px 0 11px 14px;
  border-radius: 12px;
  border: none;
  font-weight: 300;
  line-height: 22px;
}

.badge-container {
  position: relative;
  display: inline-block;
}

.menu {
  display: none;
}

.custom-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(20%, -20%);
  z-index: 100;
}

.links-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0 16px;
  width: 100%;
  max-width: 815px;
}

.input-icon {
  color: var(--color-primary-black);
}

.link-item {
  margin-right: 32px;
  color: #F6F6F6;
  font-weight: 600;
  font-size: 20px;
}

@media (max-width: 1768px) {
  .responsive-search-field {
    position: absolute !important;
    top: 100px !important;
    right: 20px !important;
    left: auto !important;
  }
  .links-container {
    max-width: 745px;
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
  .links-list {
    display: none;
  }
  .menu {
    display: block;
  }
  .header-actions {
    padding-bottom: 0px;
    justify-content: flex-end;
  }
  .action-panel {
    max-width: 200px;
    margin-left: 30px;
  }
  .responsive-search-field {
    position: absolute !important;
    top: 124px !important;
    right: 20px !important;
    left: auto !important;
  }
}

@media (max-width: 900px) {
  .responsive-search-field {
    position: absolute !important;
    top: 114px !important;
    right: 20px !important;
    left: auto !important;
  }
}

@media (max-width: 740px) {
  .header  {
    padding-left: 20px;
    padding-right: 20px;
  }
  .logo {
    margin: 0;
    padding-left: 22px;
  }
}


@media (max-width: 670px) {
  .action-panel {
    display: none;
  }
  .responsive-search-field {
    position: absolute !important;
    top: 108px !important;
    right: 20px !important;
    left: auto !important;
    max-width: 340px !important;
  }
}

@media (max-width: 530px) {
  .action-panel {
    display: none;
  }
  .responsive-search-field {
    right: 10px !important;
    left: auto !important;
    max-width: 300px !important;
  }
}


</style>