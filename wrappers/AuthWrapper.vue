<template>
  <div v-if="isVisible" class="overlay">
    <div class="popup">
      <div class="popup-header">
        <Tabs v-model="activeTab">
          <TabList :pt="{
            tabList: {
              class: 'bg-transparent',
            }
          }">
            <Tab value="login" @click="activeTab = 'login'">Вхід</Tab>
            <Tab value="register" @click="activeTab = 'register'">Реєстрація</Tab>
          </TabList>
        </Tabs>
      </div>

      <div class="popup-content">
        <TabPanels :pt="{
          root: {
            class: 'bg-transparent',
          }
        }">
          <TabPanel >
            <AuthComponent :is-login="isLogin"/>
          </TabPanel>
        </TabPanels>
      </div>

      <button class="close-btn" @click="isVisible = false">✕</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
const activeTab = ref('login')
const isLogin = computed(() => activeTab.value === 'login')

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
  width: 600px;
  max-width: 90%;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.popup-header {
  margin-bottom: 1rem;
}

.popup-content {
  max-height: 60vh;
  overflow-y: auto;
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
</style>
