<template>
  <div class="right-content">
    <codemirror
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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { json as Json } from '@codemirror/lang-json'
import { useJsonStore } from '@/stores/json';
import { storeToRefs } from 'pinia';

const jsonStore = useJsonStore();
const { jsonString } = storeToRefs(jsonStore);
const extensions = ref([
  Json(),
]);

const jsonChange = (json: string) => {
  jsonStore.updateJSON(json);
}
const handleReady = () => {
  console.log('ready');
}
</script>

<style scoped>
.right-content {
  height: 100%;
}
</style>
