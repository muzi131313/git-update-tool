<template>
  <ul class="right-menu" :style="rightMenuStyle" v-if="menuShow">
    <li @click="toggleThemeMenu">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-a-DarkLight`"></use>
      </svg>
      {{ toggleMenuText }}
    </li>
    <li @click="createMenu">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-create_new`"></use>
      </svg>
      create
    </li>
    <li @click="renameMenu">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-rename`"></use>
      </svg>
      rename
    </li>
    <li @click="executeMenu">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-execute`"></use>
      </svg>
      execute
    </li>
    <li @click="delMenu">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-delete`"></use>
      </svg>
      delete
    </li>
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
import { useCommonStore } from '@/stores/common';

const { toggleThemeColor } =  useThemeColor();

const commonStore = useCommonStore();
const inputStore = useInputStore();
const jsonStore = useJsonStore();
const io = useIO();
const selectId = computed(() => useMenuStore().selectId);
const isDarkMode = computed(() => commonStore.isDark);
const toggleMenuText = computed(() => isDarkMode.value ? 'light' : 'dark');

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
      toggleThemeMenu();
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

const toggleThemeMenu = () => {
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
    padding-right: 16px;
    cursor: pointer;
    text-align: left;
    .icon {
      margin-right: 2px;
    }
    &:hover {
      background-color: var(--color-background-mute);
    }
  }
}
</style>
