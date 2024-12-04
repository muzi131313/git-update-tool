<template>
  <div class="right-content">
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
      <BottomOutput></BottomOutput>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { json as Json } from '@codemirror/lang-json'
import { useJsonStore } from '@/stores/json';
import { storeToRefs } from 'pinia';
import BottomOutput from './BottomOutput.vue';
import { oneDark } from '@codemirror/theme-one-dark'
import { useThemeColor } from '@/hooks/useThemeColor';

const jsonStore = useJsonStore();
const { jsonString } = storeToRefs(jsonStore);

const { isDarkMode } = useThemeColor();


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
    max-height: 390px;
    border-top: 1px solid var(--vt-c-divider);
  }
}
</style>
