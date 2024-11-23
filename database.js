import sqlite3 from "sqlite3";

const sqlite = sqlite3;
const db = new sqlite.Database("./speedtest.db");

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS readings(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ping INTEGER,
      download INTEGER,
      upload INTEGER,
      response TEXT,
      startTime INTEGER,
      endTime INTEGER
    ) STRICT
  `);
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
          return reject(err)
        }
        resolve(data)
      }
    );
  });
}

initializeDatabase();

export { insertReading };
