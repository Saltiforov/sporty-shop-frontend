<template>
  <header class="flex items-end pt-[13px] pr-[24px] pb-[8px] pl-[71px]">
    <div class="logo mr-[67px]">
      <NuxtLink to="/"><img src="../../assets/images/header-logo.svg" alt="header-logo"></NuxtLink>
    </div>
    <div class="pb-[24px] justify-between items-center flex w-full items-end">
      <LinksList
          :links="links"
          :parent-classes="['flex', 'flex-wrap', 'gap-x-[16px]', 'md:gap-x-[32px]']"
          :link-class="['mr-[32px]', 'text-[#F6F6F6]', 'sm:mr-[32px]', 'md:mr-[53px]', 'last:mr-0', 'font-semibold']"
      />

      <div class="search-field  max-w-[425px] w-full">
        <IconField>
          <InputText :pt="{
          root: {
            class: 'header-search-field'
          }
        }" placeholder="Пошук..."/>
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


      <div class="action-panel max-w-[134px] w-full h-[36px] flex justify-between">
        <Button :pt="{ root: { class: 'action-panel-icon' } }">
          <img src="~/assets/icons/favorite-icon-heart.svg" alt="favorite-icon-heart.svg"/>
        </Button>
        <Button type="button" @mouseenter="toggle" aria-haspopup="true" aria-controls="overlay_menu"
                :pt="{ root: { class: 'action-panel-icon' } }">
          <img src="~/assets/icons/user-icon.svg" alt="user-icon.svg"/>
        </Button>
        <Button :pt="{ root: { class: 'action-panel-icon' } }">
          <img src="~/assets/icons/shopping-cart-icon.svg" alt="shopping-cart-icon.svg"/>
        </Button>
      </div>
    </div>
    <Menu
        :pt="{
    root: {
      class: 'relative bg-[var(--color-gray-light-lavender)] before:content-[\'\'] before:absolute before:top-[-26px] before:right-[40px] before:border-[13px] before:border-transparent before:border-b-[var(--color-gray-light-lavender)]'
    },
    submenuLabel: {
      class: 'p-0'
    },
    itemLink: {
      class: 'border-b border-[var(--color-gray-light-lavender)] last:border-b-0'
    }
  }"
        ref="menu"
        id="overlay_menu"
        :style="{ top: '106.4219px', insetInlineStart: '1667.5px' }"
        :model="items"
        :popup="true"
    />



  </header>
</template>

<script setup>
import LocaleSwitch from "~/components/UI/LocaleSwitch/LocaleSwitch.vue";

const menu = ref();
const items = ref([
  {
    items: [
      {
        label: 'Увійти',
      },
      {
        label: 'Зареєструватись',
      }
    ]
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const links = ref([
  {
    label: "КАТАЛОГ",
    icon: "pi pi-filter",
    page: "catalog",
  },
  {
    label: "АКЦІЇ", icon: "pi pi-shopping-cart", page: "promotions",
  },
  {
    label: "НОВИНКИ", icon: "pi pi-user", page: "new",
  },
  {
    label: "ДОСТАВКА ТА ОПЛАТА", icon: "pi pi-user", page: "shipping-and-payment",
  },
  {
    label: "ПРО НАС", icon: "pi pi-user", page: "about-us",
  },
])
</script>

<style scoped>
.action-panel-icon {
  background: transparent;
  border: none;
  padding: 0;
}

.action-panel-icon:hover {
  background: transparent;
  border: none;
  padding: 0;
}

.header-search-field {
  width: 100%;
  padding: 11px 0 11px 14px;
  border-radius: 12px;
  border: none;
  font-weight: 300;
  line-height: 22px;
}
</style>