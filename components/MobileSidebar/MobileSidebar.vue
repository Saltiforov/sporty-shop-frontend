<template>
  <div>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-[400] bg-black bg-opacity-50 backdrop-blur-custom z-40"
        @click="$emit('close')"
    ></div>

    <aside
        class="fixed z-[500] border-top-radius top-0 left-0 w-[80%] h-full bg-[var(--color-primary-lavender)] shadow-lg transform transition-transform duration-300"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >

      <Button
          v-show="content === 'filters'"
          :pt="{
            root: {
              style: {
                backgroundColor: 'transparent',
                border: 'none',
                padding: '0',
              }
            }
          }"
          @click="$emit('close')"
          class="mobile-filter-close__btn"
          aria-label="Закрыть"
      >
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.28516 13.0556L1.74269 7.51317L7.28516 1.9707" stroke="#9E2B24" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </Button>

      <Tabs v-model:value="currentTab">
        <TabList :pt="{
          tabList: {
            style: 'background-color: var(--color-primary-lavender) border-top: none'
          }
        }">
          <Tab :pt="{
            root: {
              style: {
                borderBottom: '3px solid var(--color-primary-purple)',
                paddingBottom: '4px'
              }
            }
          }" value="0">{{ tabLabel }}
          </Tab>
        </TabList>
        <TabPanels :pt="{
            root: {
              style: 'padding: 0px'
            }
          }">
          <TabPanel value="0">
            <component :is="sidebarContent"/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </aside>
  </div>
</template>

<script setup>
import MobileSidebarMenu from "~/components/MobileSidebar/MobileSidebarMenu/MobileSidebarMenu.vue";
import Filters from "~/components/UI/Filters/Filters.vue"

const props = defineProps({
  isOpen: Boolean,
  content: String,
})

const {t} = useI18n();

const currentTab = ref('0')

const tabLabel = computed(() => props.content === 'menu' ? t('menu_label') : t('filters'))

const sidebarContent = computed(() => props.content === 'menu' ? MobileSidebarMenu : Filters)


</script>

<style scoped>
.border-top-radius {
  border-top-right-radius: 23px;
}

.backdrop-blur-custom {
  backdrop-filter: blur(6.9px);
  -webkit-backdrop-filter: blur(6.9px);
}

.mobile-filter-close__btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 10;
  width: auto;

  background: transparent;
  border: none;
}

.mobile-filter-close__btn:hover {
  background: transparent;
  border: none;
}

@media (max-width: 1400px) {
  aside {
    width: 30%;
  }
}

@media (max-width: 1100px) {
  aside {
    width: 60%;
  }
}

@media (max-width: 900px) {
  aside {
    width: 80%;
  }
}

@media (max-width: 500px) {
  aside {
    width: 100%;
  }
}


</style>
