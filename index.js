import { spawn } from 'node:child_process'
import { insertReading } from './database.js';
import { parseResult } from './result-parser.js';

const acceptLicense = '--accept-license'
const acceptGdpr = '--accept-gdpr'

const speedTest = spawn('./bin/speedtest', [acceptLicense, acceptGdpr, '-f', 'json'])

const startTime = Date.now()

speedTest.stdout.setEncoding('utf-8')
speedTest.stdout.on('data', async (response) => {
  try {
    const result = JSON.parse(response)
    const parsedResult = parseResult(result)
    const inserted = await insertReading({...parsedResult, response, startTime})
    console.log(`REcording ID: `, inserted)
    console.log('New reading stored!')
  } catch (ex) {
    console.error('error', ex)
    process.exit(1);
  }
})
