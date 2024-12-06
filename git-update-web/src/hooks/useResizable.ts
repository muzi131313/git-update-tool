import { ref, onUnmounted } from 'vue';

interface ResizableOptions {
  minWidth?: number;
  maxWidth?: number;
}

export function useResizable(initialWidth = 200, options: ResizableOptions = {}) {
  const width = ref(initialWidth);
  const isResizing = ref(false);

  const minWidth = options.minWidth || 150;
  const maxWidth = options.maxWidth || 600;

  const startResizing = () => {
    isResizing.value = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  };

  const resize = (event: MouseEvent) => {
    if (isResizing.value) {
      const newWidth = Math.max(minWidth, Math.min(event.clientX, maxWidth));
      width.value = newWidth;
    }
  };

  const stopResizing = () => {
    isResizing.value = false;
    document?.removeEventListener('mousemove', resize);
    document?.removeEventListener('mouseup', stopResizing);
  };

  onUnmounted(() => {
    document?.removeEventListener('mousemove', resize);
    document?.removeEventListener('mouseup', stopResizing);
  });

  return {
    width,
    isResizing,
    startResizing,
  };
}
