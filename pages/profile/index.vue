<template>
  <div class="layout justify-between">

      <div class="sidebar max-w-[277px] w-full">
        <div class="sidebar-header flex pb-[24px] items-center border-b border-[var(--color-gray-light-lavender)]">
          <div class="w-[44px] mr-3">
            <img class="rounded-[50%]" src="/assets/icons/user-profile-icon.png" alt="user-profile-icon.png">
          </div>
          <h2 class="text-light-16">User_name</h2>
        </div>
        <nav class="sidebar-nav flex justify-center  w-full">
          <ul>
            <li
                v-for="item in list"
                :key="item.title"
                @click="selectComponent(item.component)"
                class="flex items-center gap-2 cursor-pointer"
            >
              <i class="mr-5" :class="item.icon">Icon</i>
              <span class="py-[11px] max-w-[185.5px] w-full rounded-tr-[100px] rounded-br-[100px] pr-[18.5px]" :class="{ 'active': item.component === currentTab }">{{ item.title }}</span>
            </li>
          </ul>
        </nav>
      </div>

      <div class="content">
        <main>
          <component :is="components[currentTab]" />
        </main>
      </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'breadcrumb',
})

import PersonalInformation from '~/components/UserProfile/PersonalInformation/PersonalInformation.vue'
import OrderHistory from '~/components/UserProfile/OrderHistory/OrderHistory.vue'
import FavoriteProducts from "~/components/UserProfile/FavoriteProducts/FavoriteProducts.vue";
import ChangePassword from "~/components/UserProfile/ChangePassword/ChangePassword.vue";
import Logout from "~/components/UserProfile/Logout/Logout.vue";

const components = { PersonalInformation, OrderHistory, FavoriteProducts, ChangePassword, Logout };

const list = [
  { title: 'Особиста інформація', icon: 'user', component: 'PersonalInformation' },
  { title: 'Історія замовлень', icon: 'user', component: 'OrderHistory' },
  { title: 'Вподобані товари', icon: 'user', component: 'FavoriteProducts' },
  { title: 'Змінити пароль', icon: 'user', component: 'ChangePassword' },
  { title: 'Вихід', icon: 'user', component: 'Logout' },
]

const currentTab = ref('OrderHistory')

const selectComponent = (component) => {
  currentTab.value = component;
};
</script>

<style scoped>

.active {
  background: linear-gradient(to left, #D6D6EB, #FFFFFF);
}

.layout {
  display: flex;
  padding-bottom: 100px;
}

.sidebar-header {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.sidebar-nav ul {
  list-style-type: none;
  padding: 0;
}

.content {
  flex-grow: 1;
  max-width: 1344px;
  padding: 0 15px;
}

main {
  background-color: var(--color-gray-lavender);
  padding: 20px;
  border-radius: 8px;
}
</style>
