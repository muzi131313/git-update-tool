<template>
  <ul class="right-menu" :style="rightMenuStyle" v-if="menuShow">
    <li @click="createMenu">create</li>
    <li @click="renameMenu">rename</li>
    <li @click="delMenu">del</li>
    <li @click="executeMenu">execute</li>
  </ul>
</template>
<script lang="ts" setup>
import { watch, computed } from 'vue';

import { useRightMenu } from '@/hooks/useRightMenu';
import { useIO } from '@/hooks/useIO';
import { useInputStore } from '@/stores/input';
import { useJsonStore } from '@/stores/json';

const inputStore = useInputStore();
const jsonStore = useJsonStore();
const io = useIO();

const { pageX, pageY, show: menuShow, selectId } = useRightMenu('.left-menu');
const rightMenuStyle = computed(() => {
  return {
    left: `${pageX.value}px`,
    top: `${pageY.value}px`,
  };
});

watch(() => menuShow.value, val => {
  console.log('[debug] val: ', val);
})

const executeMenu = async () => {
  console.log('[debug] execute...');
  if (!selectId.value) {
    console.warn('[warn] selectId is empty');
    return;
  }
  const json = await jsonStore.getJSONByKey(selectId.value);
  console.log('[debug] json: ', json);
  io.emit(json);
}
const createMenu = () => {
  inputStore.updateShow(true);
}
const renameMenu = async () => {
  if (!selectId.value) {
    console.warn('[warn] selectId is empty');
    return;
  }
  await jsonStore.setSelectKey(selectId.value);
  inputStore.updateShow(true);
}
const delMenu = async () => {
  if (!selectId.value) {
    console.warn('[warn] selectId is empty');
    return;
  }
  await jsonStore.delByKey(selectId.value);
}
</script>
<style lang="scss" scoped>
.right-menu {
  position: fixed;
  z-index: 2;
  height: 200px;
  background-color: #fff;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  color: #000;
  li {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #ddd;
    padding-left: 8px;
    padding-right: 8px;
    cursor: pointer;
    text-align: center;
    &:hover {
      background-color: #f9f9f9;
    }
  }
}
</style>
