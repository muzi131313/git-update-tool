import { createApp, h } from 'vue';
import Confirm from '../components/Confirm.vue';

export function useConfirm({ title = 'confirm', message = 'are you sure to continue?' } = {}) {
  return new Promise((resolve, reject) => {
    try {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const _resolve = (value: boolean) => {
        resolve(value);
        closeDialog();
      }

      const closeDialog = () => {
        app.unmount();
        container.remove();
      }

      const app = createApp({
        render() {
          return h(Confirm, {
            title,
            message,
            visible: true,
            onCancel: () => {
              _resolve(false);
            },
            onConfirm: () => {
              _resolve(true);
            },
          });
        },
      });

      app.mount(container);
    } catch (e) {
      reject(e);
    }
  });
}
