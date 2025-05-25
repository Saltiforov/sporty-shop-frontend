<template>
  <div>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-[400] bg-black bg-opacity-50 backdrop-blur-custom z-40"
        @click="$emit('close')"
    ></div>

    <aside
        class="fixed z-[500] border-top-radius top-0 left-0 w-[80%] h-full bg-[var(--color-primary-lavender)] shadow-lg transform transition-transform duration-300 z-50"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <Tabs v-model:value="currentTab">
        <TabList :pt="{
          tabList: {
            style: 'background-color: var(--color-primary-lavender) border-top: none'
          },
          activeBar: {
            style: {
              height: '3px',
              backgroundColor: 'var(--color-primary-purple)',
            }
          }
        }">
          <Tab value="0">{{ t('menu_label') }}</Tab>
        </TabList>
        <TabPanels :pt="{
            root: {
              style: 'padding: 0px'
            }
          }">
          <TabPanel value="0">
            <div class="m-0">
              <nav class="p-4 bg-[var(--color-primary-lavender)]">
                <LinksList
                    :links="links"
                    parent-classes="links-container"
                    link-class="link-item text-[var(--color-gray-pale-lavender)]  mb-6 mr-[32px] text-[var(--color-primary-black)] sm:mr-[32px] md:mr-[53px] last:mr-0"
                    :label-style="['font-weight: 700']"
                    @handle-navigation="$emit('close')"
                />
              </nav>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </aside>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
})

const authPopup = useAuthPopup()

const {t} = useI18n();

const currentTab = ref('0')

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
    label: computed(() => t('new_arrivals')),
    icon: "pi pi-user",
    page: "/content/new-arrivals",
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
])
</script>

<style scoped>
.border-top-radius {
  border-top-right-radius: 23px;
}

.backdrop-blur-custom {
  backdrop-filter: blur(6.9px);
  -webkit-backdrop-filter: blur(6.9px);
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


</style>
