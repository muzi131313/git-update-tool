<template>
  <div class="right-content" :style="contentStyle">
    <div class="edit-content">
      <Codemirror
        v-model="jsonString"
        placeholder="JSON input here..."
        :style="{ height: '100%' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
        @change="jsonChange"
      />
    </div>
    <div class="output-content">
      <div class="output-content-line" @mousedown="startResizing"></div>
      <BottomOutput></BottomOutput>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { json as Json } from '@codemirror/lang-json'
import { useJsonStore } from '@/stores/json';
import { storeToRefs } from 'pinia';
import BottomOutput from './BottomOutput.vue';
import { oneDark } from '@codemirror/theme-one-dark'
import { useThemeColor } from '@/hooks/useThemeColor';
import { useResizable } from '@/hooks/useResizable';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CacheKey } from '@/utils/constant';

const jsonStore = useJsonStore();
const { jsonString } = storeToRefs(jsonStore);

const { isDarkMode } = useThemeColor();

const maxHeight = useLocalStorage(CacheKey.terminal, CacheKey.terminalHeight);
const { size: targetHeight, startResizing } = useResizable(maxHeight.value, {
  useHeight: true,
  minHeight: 200,
  maxHeight: 700,
});

const contentStyle = computed(() => {
  return {
    '--terminal-max-height': `${maxHeight.value}px`,
  }
})

watch(targetHeight, val => {
  maxHeight.value = val;
})

const initExtensions = () => {
  const isDark = isDarkMode();
  if (isDark) {
    return [
      Json(),
      oneDark,
    ]
  }
  return [
    Json(),
  ];
}

const extensions = ref<any[]>(initExtensions());

const jsonChange = (json: string) => {
  jsonStore.updateJSON(json);
};
const handleReady = () => {
  console.log('[json] ready');
}
</script>

<style lang="scss" scoped>
.right-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  .edit-content {
    flex: 1;
  }
  .output-content {
    width: 100%;
    overflow-y: scroll;
    max-height: var(--terminal-max-height);
    position: relative;
    &-line {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 3px;
      background-color: var(--vt-c-divider);
      cursor: ns-resize;
      z-index: 1;
    }
  }
}
</style>
