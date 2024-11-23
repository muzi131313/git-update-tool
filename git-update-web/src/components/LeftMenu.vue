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
    <RightMenu></RightMenu>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import RightMenu from './RightMenu.vue';

import { useJsonStore } from '@/stores/json';

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

jsonStore.init();

const selectMenuItem = (item: MenuItem) => {
  jsonStore.setCurrentKey(item.id);
};
</script>

<style lang="scss" scoped>
.left-menu {
  width: 200px;
  background-color: #f2f2f2;
  border-right: 1px solid gainsboro;
}

.menus {
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    color: #000;
    padding: 4px 12px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
    position: relative;
    &.active {
      .select-menu {
        display: block;
      }
    }
    .select-menu {
      position: absolute;
      right: 12px;
      top: 8px;
      width: 18px;
      display: none;
    }
  }

  li:hover {
    background-color: #e6e6e6;
  }
}

</style>
