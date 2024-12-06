<template>
  <div class="top-input" v-click-outside="clickOutSide">
    <input type="text" v-model="inputValue" ref="inputRef" />
    <button @click="edit" v-if="isEdit">修改</button>
    <button @click="create" v-else>创建</button>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue';

import { useJsonStore } from '@/stores/json';
import { useInputStore } from '@/stores/input';
import { storeToRefs } from 'pinia';

const jsonStore = useJsonStore();
const inputStore = useInputStore();

const { selectKey } = storeToRefs(jsonStore);
const inputValue = ref('');
const inputRef = ref();
const isEdit = computed(() => inputStore.isEdit);

const updateInputValue = (value: string) => {
  inputValue.value = value;
}

const clickOutSide = () => {
  resetInput();
}

const resetInput = () => {
  updateInputValue('');
  inputStore.updateShow(false);
}

const create = () => {
  if (!inputValue.value) {
    console.warn('[warn] input value is empty');
    return;
  }
  jsonStore.setJSON(inputValue.value, '[]');
  resetInput();
}

const edit = async () => {
  if (!selectKey.value) {
    console.warn('[warn] selectKey is empty');
    return;
  }
  await jsonStore.updateInputByKey(selectKey.value, inputValue.value);
  resetInput();
}
const init = async () => {
  const key = await jsonStore.getInputByKey(selectKey.value);
  updateInputValue(isEdit.value ? key : '');
  nextTick(() => {
    inputRef.value.focus();
  });
}
onMounted(() => {
  init();
})
</script>
<style lang="scss" scoped>
.top-input {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 200px;
  display: flex;
  align-items: center;
  width: 220px;
  height: 30px;
  background-color: #f2f2f2;
  border: 1px solid #aeaed8;
  input {
    border-width: 0;
    height: 100%;
    flex: 1;
  }
  button {
    border-width: 0;
    height: 100%;
    width: 60px;
    background-color: #6593ff;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #4e80f3;
    }
  }
}
</style>
