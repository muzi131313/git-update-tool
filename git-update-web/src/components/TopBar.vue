<template>
  <div class="top-bar-container">
    <span class="logo">
      git update
    </span>
    <ul class="operate-btns">
      <li class="operate-btn" v-for="(menu, index) in menus" :key="index" @click="menu.click">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#icon-${menu.icon}`"></use>
        </svg>
        {{ menu.text }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import eventBus from '@/hooks/useEventBus';
import { EventType, MenuMessageItemType } from '@/interface.d';

const menus = [
  {
    icon: 'create_new',
    text: 'create',
    click: () => {
      eventBus.emit(EventType.menu, { type: MenuMessageItemType.create });
    },
  },
  {
    icon: 'rename',
    text: 'rename',
    click: () => {
      eventBus.emit(EventType.menu, { type: MenuMessageItemType.rename });
    },
  },
  {
    icon: 'execute',
    text: 'execute',
    click: () => {
      eventBus.emit(EventType.menu, { type: MenuMessageItemType.execute });
    },
  },
  {
    icon: 'delete',
    text: 'delete',
    click: () => {
      eventBus.emit(EventType.menu, { type: MenuMessageItemType.delete });
    },
  },
];
</script>
<style lang="scss" scoped>
.top-bar-container {
  background-color: var(--vt-c-bg-mute);
  height: 32px;
  padding: 0 8px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--vt-c-divider);
  display: flex;
  align-items: center;
  .logo {
    display: inline-flex;
    font-weight: bold;
  }
  .operate-btns {
    display: inline-flex;
    list-style: none;
    .operate-btn {
      padding-left: 8px;
      padding-right: 8px;
      border-right: 1px solid var(--vt-c-divider);
      cursor: pointer;
      color: var(--vt-c-text-1);
      &:hover {
        color: var(--vt-c-text-2);
      }
    }
  }
}
</style>
