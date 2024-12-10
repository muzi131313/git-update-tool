const Tool = require('../src/utils/tool.js');
const path = require('path');

test('Tool read json from ./json/example.json', () => {
  const _path = path.resolve(__dirname, './json/example.json');
  expect(Tool.readFile(_path)).toEqual(JSON.parse(`[{"path": "example.json"}]`));
});

test('Tool check validate json', () => {
  expect(Tool.isInvalidate('')).toBe(true);
  expect(Tool.isInvalidate(null)).toBe(true);
  expect(Tool.isInvalidate(undefined)).toBe(true);
  expect(Tool.isInvalidate('hello')).toBe(false);
});

test('Tool check folder exists', () => {
  const _path = path.resolve(__dirname, './json');
  expect(Tool.isFolderExist(_path)).toBe(true);
});

test('Tool check folder is git folder', () => {
  const _path = path.resolve(__dirname, './json');
  expect(Tool.isGitFolder(_path)).toBe(false);
});

test('Tool execCommand success', async () => {
  try {
    const command = 'echo "hello world";';
    const result = await Tool.execCommand(command);
    expect(result.done).toBe(true);
  } catch (e) {
    console.error('error: ', e);
  }
});

test('Tool execCommand failed', async () => {
  let result;
  try {
    const command = 'echo "hello world";xx';
    result = await Tool.execCommand(command);
  } catch (e) {
    expect(e.done).toBe(false);
  }
});
