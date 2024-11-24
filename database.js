import sqlite3 from "sqlite3";

const sqlite = sqlite3;
const db = new sqlite.Database("./speedtest.db");

const Time = (function () {
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;

  return {
    second, minute, hour, day
  }
})()



function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.exec(
      `
      CREATE TABLE IF NOT EXISTS readings(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ping INTEGER,
        download INTEGER,
        upload INTEGER,
        response TEXT,
        startTime INTEGER,
        endTime INTEGER
      ) STRICT
    `,
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}

function insertReading(data) {
  const { ping, download, upload, response, startTime } = data;
  const insert = db.prepare(
    `INSERT INTO readings (ping, download, upload, response, startTime, endTime) 
VALUES (?, ?, ?, ?, ?, ?) RETURNING id`
  );
  return new Promise((resolve, reject) => {
    insert.get(
      ping,
      download,
      upload,
      response,
      startTime,
      Date.now(),
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
  });
}

function getData({ startTimeFrom, startTimeTo } = {}) {
  startTimeFrom = startTimeFrom ?? Date.now() - 6 * Time.hour;
  startTimeTo = startTimeTo ?? Date.now()
  const query = db.prepare(`SELECT ping, download, upload, startTime FROM readings WHERE startTime BETWEEN ? and ?`)
  return new Promise((resolve, reject) => {
    query.all([startTimeFrom, startTimeTo], (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  });
}

await initializeDatabase();

export { insertReading, getData };
