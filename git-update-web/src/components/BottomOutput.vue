<template>
  <div ref="terminalRef"></div>
</template>
<script lang="ts" setup>
import eventBus from '@/hooks/useEventBus';
import { useThemeColor } from '@/hooks/useThemeColor';
import { EventType, MessageType, type BackgroundType, type ColorType, type MessageItem } from '@/interface.d';
import { Welcome } from '@/utils/constant';
import { onMounted, ref } from 'vue';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css'; // import styles

const terminalRef = ref();

const { isDarkMode } = useThemeColor();

const isDark = isDarkMode();

const background = isDark ? '#000000' : '#ffffff';
const foreground = isDark ? '#ffffff' : '#000000';

const terminal = new Terminal({
  cols: 80,
  rows: 24,
  theme: {
    background,
    foreground,
  },
});
const fitAddon = new FitAddon();
terminal.loadAddon(fitAddon);

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
}

const initTerminal = () => {
  terminal.open(terminalRef.value);
  writeMessage(`${Welcome} terminal!\r`);
}

const updateTerminalHeight = (height: number) => {
  terminalRef.value.style.height = `${height}px`;
  fitAddon.fit();
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

defineExpose({
  updateTerminalHeight,
})
</script>
