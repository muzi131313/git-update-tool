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
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import RightMenu from './RightMenu.vue';

import { useJsonStore } from '@/stores/json';
import { useMenuStore } from '@/stores/menu';

interface MenuItem {
  id: string;
  label: string;
}

const jsonStore = useJsonStore();

const selectedMenuItem = computed(() => jsonStore.currentKey);
const menuItems = computed(() => {
  return Object.keys(jsonStore.keys).map((key) => {
    return {
      id: key,
      label: (jsonStore.keys as any)[key],
    };
  });
});

const updateCurrentKey = (key: string) => {
  jsonStore.setCurrentKey(key);
  useMenuStore().updateSelectId(key);
};

const jsonInit = () => {
  jsonStore.init().then((keys: object) => {
    const _keys = Object.keys(keys);
    if (_keys?.length) {
      updateCurrentKey(_keys[0]);
    }
  });
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
  border-right: 1px solid var(--vt-c-divider);
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
