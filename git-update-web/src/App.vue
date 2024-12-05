<template>
  <div class="app-container">
    <header>
      <TopBar></TopBar>
    </header>
    <div class="content-container">
      <LeftMenu></LeftMenu>
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

const inputStore = useInputStore();
const { show } = storeToRefs(inputStore);

const { initThemeColor } = useThemeColor();
initThemeColor();
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
    grid-template-columns: 200px 1fr;
  }
}
</style>
