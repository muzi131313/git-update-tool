<template>
  <div v-if="visible" class="confirm-overlay">
    <div class="confirm-dialog">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="confirm-actions">
        <button @click="onCancel">cancel</button>
        <button @click="onConfirm">confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'confirm',
  },
  message: {
    type: String,
    default: 'are you sure to continue?',
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['cancel', 'confirm']);

const onCancel = () => {
  emit('cancel');
};

const onConfirm = () => {
  emit('confirm');
};
</script>

<style lang="scss" scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-dialog {
  background: var(--color-background);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  h3 {
    color: var(--vt-c-text-1);
    text-align: left;
  }
  p {
    color: var(--vt-c-text-2);
    padding: 8px 0;
  }
}

.confirm-actions {
  display: flex;
  justify-content: end;
  button {
    margin: 10px;
    padding: 8px 16px;
    border-radius: 4px;
    border-width: 0;
    cursor: pointer;
    background-color: var(--color-background-mute);
    color: var(--vt-c-text-2);
    &:hover {
      color: var(--vt-c-text-1);
    }
  }
}
</style>
