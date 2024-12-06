declare module 'click-outside-vue3';

export const SOCKET_TIMEOUT = 10 * 10e3;

export enum MessageType {
  Red = 'red',
  Green = 'green',
  White = 'white',
}

export enum MenuMessageItemType {
  darkLight = 'darkLight',
  create = 'Create',
  rename = 'Rename',
  delete = 'Delete',
  execute = 'Execute',
}

export enum StdType {
  stdout = 'stdout',
  stderr = 'stderr',
  close = 'close',
}

export type ColorType = number | null | undefined;
export type BackgroundType = number | null | undefined;

export interface MenuMessageItem {
  type: MenuMessageItemType;
}

export interface MessageItem {
  type: MessageType;
  message: string;
}

export interface MessageObject {
  type: StdType;
  data: string | number;
}

export const Msgs = {
  [StdType.stdout]: MessageType.White,
  [StdType.stderr]: MessageType.Red,
  [StdType.close]: MessageType.Green,
}

export enum EventType {
  message = 'message',
  menu = 'menu',
}
