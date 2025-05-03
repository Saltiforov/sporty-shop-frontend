<template>
  <header class="flex items-end pt-[13px] pr-[24px] pb-[8px] pl-[71px]">
    <div class="logo mr-[67px]">
      <NuxtLink to="/"><img src="../../assets/images/header-logo.svg" alt="header-logo"></NuxtLink>
    </div>
    <div class="pb-[24px] justify-between items-center flex w-full items-end">
      <LinksList
          :links="links"
          :parent-classes="['flex', 'flex-wrap', 'gap-x-[16px]', 'md:gap-x-[32px]', 'w-full', 'max-w-[815px]']"
          :link-class="['mr-[32px]', 'text-[#F6F6F6]', 'sm:mr-[32px]', 'md:mr-[53px]', 'last:mr-0', 'font-semibold']"
      />
      <div class="search-field  max-w-[425px] w-full">
        <IconField>
          <InputText :pt="{
          root: {
            class: 'header-search-field'
          }
        }" :placeholder="searchFieldPlaceholder"/>
          <InputIcon :pt="{
            root: {
              class: 'text-[var(--color-primary-black)]'
            }
          }" class="pi pi-search"/>
        </IconField>
      </div>

      <div class="locale-switch">
        <LocaleSwitch/>
      </div>
      <div class="action-panel max-w-[144px] w-full h-[36px] flex justify-between">
        <Button :pt="{ root: { class: 'action-panel-icon' } }">
          <img src="~/assets/icons/favorite-icon-heart.svg" alt="favorite-icon-heart.svg"/>
        </Button>
        <div class="relative flex inline-block" @click="toggle">
          <Button
              type="button"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              :pt="{ root: { class: 'action-panel-icon' } }"
          >
            <img src="~/assets/icons/user-icon.svg" alt="user-icon.svg"/>
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
          absolute left-1/2 translate-x-[15%] top-full mt-20 z-500
          bg-[var(--color-gray-light-lavender)]
          before:content-[''] before:absolute before:top-[-26px]
          before:right-[40px] before:border-[13px] before:border-transparent
          before:border-b-[var(--color-gray-light-lavender)]
        `
      },
      submenuLabel: { class: 'p-0' },
      itemLink: { class: 'border-b border-[var(--color-gray-light-lavender)] last:border-b-0' }
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
  </header>
</template>

<script setup>
import LocaleSwitch from "~/components/UI/LocaleSwitch/LocaleSwitch.vue";
import {useAuthStore} from "~/stores/auth.js";
import {storeToRefs} from "pinia";

const {$eventBus} = useNuxtApp();

const {t} = useI18n();

const authPopup = useAuthPopup()

const router = useRouter();

const {logUserOut} = useAuthStore();

const {authenticated, currentUser} = storeToRefs(useAuthStore());

const cartStore = useCartStore();

const userId = computed(() => currentUser.value._id)

const showShoppingCart = () => {
  $eventBus.emit('show-cart');
};

const redirectToUserOrderHistory = () => {
  $eventBus.emit('show-order-history')
  router.push(`/profile/${userId.value}`)
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
          {label: t('my_cabinet'), command: () => router.push(`/profile/${userId.value}`)},
          {label: t('my_orders'), command: () => redirectToUserOrderHistory()},
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
    page: "catalog",
  },
  {
    label: computed(() => t('header_promotions')),
    icon: "pi pi-shopping-cart",
    page: "promotions",
  },
  {
    label: computed(() => t('header_new')),
    icon: "pi pi-user",
    page: "new",
  },
  {
    label: computed(() => t('header_shipping_and_payment')),
    icon: "pi pi-user",
    page: "shipping-and-payment",
  },
  {
    label: computed(() => t('header_about_us')),
    icon: "pi pi-user",
    page: "about-us",
  },
])


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

.custom-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(20%, -20%);
  z-index: 100;
}
</style>