import { useMenuStore } from '@/stores/menu';
import { onMounted, onBeforeUnmount, ref } from 'vue';

export const useRightMenu = (domSign?: string) => {
  const pageX = ref(0);
  const pageY = ref(0);
  const show = ref(false);

  const updateShow = (value: boolean) => {
    show.value = value;
  };

  const handleContextMenu = (e: MouseEvent) => {
    if (e.button !== 2) {
      updateShow(false);
      return;
    }
    const target: HTMLElement = e.target as HTMLElement;
    if (domSign && target && !target.closest(domSign)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    // position
    pageX.value = e.pageX;
    pageY.value = e.pageY;
    // show menu
    updateShow(true);
    // select menu
    if (target && target.dataset && target.dataset.id) {
      useMenuStore().updateSelectId(target.dataset.id);
    }
  };

  onMounted(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', () => {
      updateShow(false);
    });
  });
  onBeforeUnmount(() => {
    pageX.value = 0;
    pageY.value = 0;
    updateShow(false);
    document.removeEventListener('contextmenu', handleContextMenu);
  });
  return {
    updateShow,
    show,
    pageX,
    pageY
  };
};
