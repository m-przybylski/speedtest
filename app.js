import express from "express";
import { getData } from "./database.js";
import { resolve } from "node:path";
import { __dirname } from "./dirname.js";

import morgan from "morgan";

const PORT = 3000;
const app = express();

function speedText(speed) {
  let bits = speed * 8;
  const units = ["", "K", "M", "G", "T"];
  const places = [0, 1, 2, 3, 3];
  let unit = 0;
  while (bits >= 2000 && unit < 4) {
    unit++;
    bits /= 1000;
  }
  return `${bits.toFixed(places[unit])} ${units[unit]}bps`;
}

app.use(morgan("dev"));
app.set("view engine", "pug");

app.get("/", async (req, res, next) => {
  const data = await getData();
  res.render(resolve(__dirname, "views", "index"), {
    measurements: data,
    measurementsStr: JSON.stringify(data),
    speedText,
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
