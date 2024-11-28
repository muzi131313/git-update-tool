<template>
  <div ref="terminalRef"></div>
</template>
<script lang="ts" setup>
import eventBus from '@/hooks/useEventBus';
import { EventType, MessageType, type BackgroundType, type ColorType, type MessageItem } from '@/interface.d';
import { onMounted, ref } from 'vue';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'; // 引入样式

const terminalRef = ref();

const terminal = new Terminal({
  cols: 80,
  rows: 24,
  theme: {
    background: "#000000",
    foreground: "#ffffff",
  },
});

function writeColoredText(terminal: Terminal, text: string, color: ColorType, background: BackgroundType) {
  const colorCode = color ? `\x1b[${color}m` : '';
  const backgroundCode = background ? `\x1b[${background}m` : '';
  terminal.write(`${colorCode}${backgroundCode}${text}\x1b[0m\r\n`);
}

const writeMessage = (message: string, type: MessageType = MessageType.White) => {
  switch (type) {
    case MessageType.Red:
      writeColoredText(terminal, message, 31, null);
      break;
    case MessageType.Green:
      writeColoredText(terminal, message, 32, null);
      break;
    case MessageType.White:
      writeColoredText(terminal, message, null, null);
      break;
    default:
      writeColoredText(terminal, message, null, null);
      break;
  }
  // terminal.write(message);
}

const initTerminal = () => {
  terminal.open(terminalRef.value);
  writeMessage("Hello, welcome to the Vue xterm.js terminal!\r\n");
}
const initEvent = () => {
  eventBus.on(EventType.message, (message: unknown) => {
    const messageItem = message as MessageItem;
    writeMessage(messageItem.message, messageItem.type);
  });
}

onMounted(() => {
  initTerminal();
  initEvent();
})
</script>
