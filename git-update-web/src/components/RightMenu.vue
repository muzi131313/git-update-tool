<template>
  <ul class="right-menu" :style="rightMenuStyle" v-if="menuShow">
    <li @click="darkLightMenu">dark/light</li>
    <li @click="createMenu">create</li>
    <li @click="renameMenu">rename</li>
    <li @click="delMenu">del</li>
    <li @click="executeMenu">execute</li>
  </ul>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { useRightMenu } from '@/hooks/useRightMenu';
import { useIO } from '@/hooks/useIO';
import { useInputStore } from '@/stores/input';
import { useJsonStore } from '@/stores/json';
import eventBus from '@/hooks/useEventBus';
import { EventType, type MenuMessageItem, MenuMessageItemType } from '@/interface.d';
import { useMenuStore } from '@/stores/menu';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getKey } from '@/utils/json-utils';
import { useConfirm } from '@/hooks/useConfirm';

const { toggleThemeColor } =  useThemeColor();

const inputStore = useInputStore();
const jsonStore = useJsonStore();
const io = useIO();
const selectId = computed(() => useMenuStore().selectId);

const emits = defineEmits(['reSelect']);

const { pageX, pageY, show: menuShow } = useRightMenu('.left-menu');
const rightMenuStyle = computed(() => {
  return {
    left: `${pageX.value}px`,
    top: `${pageY.value}px`,
  };
});

eventBus.on(EventType.menu, (message: unknown) => {
  const messageItem = message as MenuMessageItem;
  switch (messageItem.type) {
    case MenuMessageItemType.darkLight:
      darkLightMenu();
      break;
    case MenuMessageItemType.create:
      createMenu();
      break;
    case MenuMessageItemType.rename:
      renameMenu();
      break;
    case MenuMessageItemType.delete:
      delMenu();
      break;
    case MenuMessageItemType.execute:
      executeMenu();
      break;
    default:
      break;
  }
})

const darkLightMenu = () => {
  toggleThemeColor();
}

const executeMenu = async () => {
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
  inputStore.updateShow(true, true);
}
const delMenu = async () => {
  if (!selectId.value) {
    console.warn('[warn] selectId is empty');
    return;
  }
  const key = selectId.value;
  const item = await getKey(key);
  if (!item) {
    console.error('[error] delete item is empty');
    return;
  }
  const confirmDelete = await useConfirm({
    title: 'delete',
    message: `are you sure delete '${item.name}' json config' ?`,
  });
  if (!confirmDelete) {
    console.log('cancel delete');
    return;
  }
  await jsonStore.delByKey(selectId.value);
  emits('reSelect');
}
</script>
<style lang="scss" scoped>
.right-menu {
  position: fixed;
  z-index: 2;
  background-color: var(--color-background-soft);
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border);
  color: var(--vt-c-text-2);
  li {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid var(--color-border);
    padding-left: 8px;
    padding-right: 8px;
    cursor: pointer;
    text-align: center;
    &:hover {
      background-color: var(--color-background-mute);
    }
  }
}
</style>
