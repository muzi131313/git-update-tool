<template>
  <LeftMenu></LeftMenu>
  <TopInput v-if="show"></TopInput>
  <main>
    <RightContent></RightContent>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import LeftMenu from './components/LeftMenu.vue';
import RightContent from './components/RightContent.vue';
import TopInput from './components/TopInput.vue';
import { useInputStore } from '@/stores/input';
import { useThemeColor } from './hooks/useThemeColor';

const inputStore = useInputStore();
const { show } = storeToRefs(inputStore);

const { initThemeColor } = useThemeColor();
initThemeColor();
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
