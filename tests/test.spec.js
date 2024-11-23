import test from 'ava';
import { readFile } from "node:fs/promises"
import path from "node:path"
import { parseResult } from '../result-parser.js'

test("should pass", t => {
  t.is(1, 1)
})

test("should return data from example", async t => {
  const content = await readFile(path.resolve('tests', 'example.json'))
  const result = JSON.parse(content)
  const parsedResult = parseResult(result);
  t.deepEqual(parsedResult, {
    ping: 25.558,
    download: 48779068,
    upload: 36688238,
  })
})
