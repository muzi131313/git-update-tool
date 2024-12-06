import { ref, onUnmounted } from 'vue';

interface ResizableOptions {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  useHeight?: boolean;
}

export function useResizable(initialValue = 200, options: ResizableOptions = {}) {
  const size = ref(initialValue);
  const isResizing = ref(false);

  const minWidth = options.minWidth || 150;
  const maxWidth = options.maxWidth || 600;
  const minHeight = options.minWidth || 200;
  const maxHeight = options.maxWidth || 700;
  const useHeight = options.useHeight;

  const startResizing = () => {
    isResizing.value = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  };

  const resize = (event: MouseEvent) => {
    if (isResizing.value) {
      if (useHeight) {
        const targetHeight = window.innerHeight - event.clientY;
        const newHeight = Math.max(minHeight, Math.min(targetHeight, maxHeight));
        size.value = newHeight;
      } else {
        const newWidth = Math.max(minWidth, Math.min(event.clientX, maxWidth));
        size.value = newWidth;
      }
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
    size,
    isResizing,
    startResizing,
  };
}
