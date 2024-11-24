import express from 'express';
import { getData } from './database.js';

const PORT = 3000
const app = express()

function speedText(speed) {
  let bits = speed * 8;
  const units = ['', 'K', 'M', 'G', 'T'];
  const places = [0, 1, 2, 3, 3];
  let unit = 0;
  while (bits >= 2000 && unit < 4) {
    unit++;
    bits /= 1000;
  }
  return `${bits.toFixed(places[unit])} ${units[unit]}bps`;
}

app.set('view engine', 'pug')

app.get("/", async (req, res, next) => {
  const data = await getData()
  res.render('index', { measurements: data, measurementsStr: JSON.stringify(data), speedText })
})
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})
