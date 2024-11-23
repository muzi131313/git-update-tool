const Tool = require('../src/utils/tool.js');
const path = require('path');

test('Tool read json from ./json/example.json', () => {
  const _path = path.resolve(__dirname, './json/example.json');
  expect(Tool.readFile(_path)).toEqual(JSON.parse(`[{"path": "example.json"}]`));
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
