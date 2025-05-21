<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex flex-1">
      <div class="profile-container base-container  justify-between flex-1 ">
        <LayoutBreadcrumb v-if="!isLoading"/>
        <BreadcrumbSkeleton/>
        <div class="pb-[100px] profile-layout h-full flex ">
          <aside class="sidebar max-w-[277px] mr-[116px] w-full">
            <div class="sidebar-header flex pb-[24px] items-center border-b border-[var(--color-gray-light-lavender)]">
              <div class="w-[44px] mr-3">
                <img class="rounded-full" src="/assets/icons/user-profile-icon.png" alt="user-profile-icon.png"/>
              </div>
              <h2 class="text-light-16">{{ fullUserName }}</h2>
            </div>
            <nav class="sidebar-nav flex justify-center w-full">
              <ul>
                <NuxtLink
                    v-for="item in localizedList"
                    :key="item.title"
                    @click="item.command()"
                    class="flex items-center gap-2 cursor-pointer"
                    :to="item.route"
                >
                  <img class="mr-3" :src="item.icon" alt=""/>
                  <span
                      class="py-[11px] max-w-[185.5px] w-full rounded-tr-[100px] rounded-br-[100px] pr-[18.5px]"
                      :class="{ 'active': item.page === currentTab }"
                  >
                  {{ item.title }}
                </span>
                </NuxtLink>
              </ul>
            </nav>
          </aside>

          <main class="p-6 w-full">
            <NuxtPage/>
          </main>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import {useAuthStore} from "~/stores/auth.js";

definePageMeta({
  layout: 'profile',
})

import PersonalInformationIcon from '~/assets/icons/user-profile-persn-inf-icon.svg'
import OrderHistoryIcon from '~/assets/icons/user-profile-order-history-icon.svg'
import FavoriteProductsIcon from '~/assets/icons/user-profile-favorite-products-icon.svg'
import ChangePasswordIcon from '~/assets/icons/user-profile-change-passwrd-icon.svg'
import LogoutIcon from '~/assets/icons/user-profile-logout-icon.svg'

import {onMounted} from "vue";
import {getCurrentUser} from "~/services/api/user-service.js";
import {storeToRefs} from "pinia";
import {capitalizeFirstLetter} from "~/utils/index.js";
import BreadcrumbSkeleton from "~/components/Skeletons/BreadcrumbSkeleton/BreadcrumbSkeleton.vue";
import LayoutBreadcrumb from "~/components/UI/LayoutBreadcrumb/LayoutBreadcrumb.vue";

const {t} = useI18n();

const {logUserOut} = useAuthStore();

const {currentUser} = storeToRefs(useAuthStore());

const userData = ref({})

const isLoading = ref(false);

const route = useRoute();

const currentTab = computed(() => route.path.split('/').pop() || 'personal-information')

const fullUserName = computed(() => {
  const first = capitalizeFirstLetter(currentUser.value?.firstName ?? '')
  const last = capitalizeFirstLetter(currentUser.value?.lastName ?? '')
  return `${first} ${last}`.trim()
})

const logout = () => {
  logUserOut();
  navigateTo('/')
}

const localizedList = computed(() => [
  {
    title: t('personal_information'),
    icon: PersonalInformationIcon,
    page: 'personal-information',
    route: '/profile/personal-information',
    command: () => setActiveTab('personal-information')
  },
  {
    title: t('orders_history'),
    icon: OrderHistoryIcon,
    component: 'OrderHistory',
    page: 'orders',
    route: '/profile/orders-history',
    command: () => setActiveTab('orders')
  },
  {
    title: t('favorites'),
    icon: FavoriteProductsIcon,
    component: 'FavoriteProducts',
    page: 'favorite',
    route: '/profile/favorites',
    command: () => setActiveTab('favorite')
  },
  {
    title: t('change_password'),
    icon: ChangePasswordIcon,
    component: 'ChangePassword',
    page: 'change-password',
    route: '/profile/change-password',
    command: () => setActiveTab('change-password')
  },
  {title: t('logout'), icon: LogoutIcon, component: 'Logout', command: () => logout()},
]);

const setActiveTab = (component) => {
  currentTab.value = component;
};

const loadUserData = async () => {
  isLoading.value = true
  try {
    userData.value = await getCurrentUser()
  } catch (e) {
    console.error('Ошибка при загрузке пользователя', e)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

onMounted(async () => {
  await loadUserData()
})

</script>

<style scoped>

.active {
  transform: scale(1.05);
  transition: transform 0.3s ease, background 0.3s ease;
  background: linear-gradient(to left, var(--color-gray-light-lavender), var(--color-primary-pure-white));
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

@media (max-width: 1200px) {
  .profile-layout {
    flex-direction: column;
  }
  .sidebar-nav {
    padding-bottom: 24px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--color-gray-light-lavender);
  }
}
@media (max-width: 500px) {
  main {
    padding: 15px 5px 30px 5px;
  }
  .profile-container {
    padding: 8px;
  }
}

</style>