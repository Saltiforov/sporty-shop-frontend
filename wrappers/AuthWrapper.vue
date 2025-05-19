<template>
  <div v-if="isVisible" class="overlay" @click="handleOverlayClick">
    <div class="popup murecho-font w-full" ref="popupRef" @click.stop>
      <div class="popup-header">
        <Tabs v-model:value="activeTab">
          <TabList
              :pt="{
              tabList: {
                style: 'background-color: transparent;'
              },
              activeBar: {
                root: {
                  style: 'background-color: transparent;'
                }
              }
            }"
          >
            <Tab
                :pt="{
                root: {
                  style: 'border-bottom: 1px solid var(--color-gray-lavender);'
                }
              }"
                value="login"
                @click="setActiveTab('login')"
            >
              {{ t('login') }}
            </Tab>
            <Tab
                :pt="{
                root: {
                  style: 'border-bottom: 1px solid var(--color-gray-lavender);'
                }
              }"
                value="register"
                @click="setActiveTab('register')"
            >
              {{ t('register_tab') }}
            </Tab>
          </TabList>
        </Tabs>
      </div>

      <div class="popup-content">
        <TabPanels
            :pt="{
            root: {
              style: 'background-color: transparent; padding: 0;'
            }
          }"
        >
          <TabPanel>
            <AuthComponent :is-login="isLogin" />
          </TabPanel>
        </TabPanels>
      </div>

      <Button :pt="{
        root: {
          class: 'close-btn'
        }
      }" @click="authPopup.close">
        <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M1.63597 1.63649L7.51465 7.51517M7.51465 7.51517L13.3933 13.3938M7.51465 7.51517L1.63597 13.3938M7.51465 7.51517L13.3933 1.63649"
              stroke="#9E2B24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </Button>
    </div>
  </div>
</template>



<script setup>
const {t} = useI18n()

const authPopup = useAuthPopup()

const popupRef = ref(null)

const setActiveTab = (activeTab) => {
  authPopup.setType(activeTab)
}

const isVisible = computed(() => authPopup.isShow)

const activeTab = computed(() => authPopup.popupType)

const isLogin = computed(() => activeTab.value === 'login')

const handleOverlayClick = (e) => {
  if (!popupRef.value?.contains(e.target)) {
    authPopup.close()
  }
}

</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup {
  position: relative;
  background: #E6E7F8;
  border-radius: 12px;
  max-width: 480px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.popup-header {
  margin-bottom: 1rem;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.close-btn:hover {
  background: transparent;
  border: none;
}
</style>
