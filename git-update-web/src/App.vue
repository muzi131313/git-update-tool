<template>
  <div class="app-container" :style="appStyle">
    <header>
      <TopBar></TopBar>
    </header>
    <div class="content-container">
      <LeftMenu @updateMenuWidth="updateMenuWidth"></LeftMenu>
      <TopInput v-if="show"></TopInput>
      <main>
        <RightContent></RightContent>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import LeftMenu from './components/LeftMenu.vue';
import RightContent from './components/RightContent.vue';
import TopInput from './components/TopInput.vue';
import TopBar from './components/TopBar.vue';
import { useInputStore } from '@/stores/input';
import { useThemeColor } from './hooks/useThemeColor';
import { computed } from 'vue';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CacheKey } from './utils/constant';

const inputStore = useInputStore();
const { show } = storeToRefs(inputStore);

const { initThemeColor } = useThemeColor();
initThemeColor();

const leftMenuWidth = useLocalStorage(CacheKey.leftMenu, CacheKey.leftMenuWidth);

const appStyle = computed(() => {
  return {
    '--app-left-menu-width': `${leftMenuWidth.value}px`,
  };
})

const updateMenuWidth = (width: number) => {
  leftMenuWidth.value = width;
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  .content-container {
    position: relative;
    display: grid;
    grid-template-rows: calc(100vh - 32px) 1fr;
    grid-template-columns: var(--app-left-menu-width) 1fr;
  }
}
</style>
