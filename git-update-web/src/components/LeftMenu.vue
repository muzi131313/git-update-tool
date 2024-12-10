<template>
  <div class="left-menu">
    <ul class="menus">
      <li v-for="item in menuItems"
        :class="[selectedMenuItem === item.id ? 'active' : '']"
        :key="item.id"
        :data-id="item.id"
        @click="selectMenuItem(item)">
        {{ item.label }}
        <img src="../assets/select.svg" class="select-menu" />
      </li>
    </ul>
    <RightMenu @reSelect="reSelect"></RightMenu>
    <div class="left-menu-line" @mousedown="startResizing"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';

import RightMenu from './RightMenu.vue';

import { useJsonStore } from '@/stores/json';
import { useMenuStore } from '@/stores/menu';
import { useResizable } from '@/hooks/useResizable';
import type { MenuItem } from '@/interface.d';
import { CacheKey } from '@/utils/constant';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getCurrentKey } from '@/utils/json-utils';

const jsonStore = useJsonStore();
const emit = defineEmits(['updateMenuWidth']);

const selectedMenuItem = computed(() => jsonStore.currentKey);
const menuItems = computed(() => {
  return Object.keys(jsonStore.keys).map((key) => {
    return {
      id: key,
      label: (jsonStore.keys as any)[key],
    };
  });
});

const leftMenuWidth = useLocalStorage(CacheKey.leftMenu, CacheKey.leftMenuWidth);
const { size: sidebarWidth, startResizing } = useResizable(leftMenuWidth.value, {
  minWidth: 150,
  maxWidth: 600,
});

watch(sidebarWidth, val => {
  emit('updateMenuWidth', val);
})

const updateCurrentKey = (key: string) => {
  jsonStore.setCurrentKey(key);
  useMenuStore().updateSelectId(key);
};

const jsonInit =  async() => {
  const keys = await jsonStore.init();
  const key = await getCurrentKey();
  const _keys = Object.keys(keys);
  const hasKeys = _keys?.length;
  const currentKey = key as string || (hasKeys ? _keys[0] : '');
  updateCurrentKey(currentKey);
};

const reSelect = () => {
  jsonInit();
};

const selectMenuItem = (item: MenuItem) => {
  updateCurrentKey(item.id);
};

jsonInit();
</script>

<style lang="scss" scoped>
.left-menu {
  width: var(--app-left-menu-width);
  background: var(--vt-c-bg);
  box-shadow: var(--vt-shadow-3);
  position: relative;
  .left-menu-line {
    position: absolute;
    right: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background-color: var(--vt-c-divider-light);
    cursor: ew-resize;
  }
}

.menus {
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    padding: 4px 12px;
    cursor: pointer;
    border-bottom: 1px solid var(--vt-c-divider-light);
    position: relative;
    &.active {
      background-color: var(--vt-c-bg-mute) !important;
      .select-menu {
        display: block;
      }
    }
    .select-menu {
      position: absolute;
      right: 12px;
      top: 10px;
      width: 18px;
      display: none;
      width: 14px;
      height: 14px;
    }
  }

  li:hover {
    background-color: var(--vt-c-bg-soft);
  }
}

</style>
