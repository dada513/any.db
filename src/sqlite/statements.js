const sqlstring = require('sqlstring')
module.exports = {
  createTable: () =>
    'CREATE TABLE IF NOT EXISTS "json" ("key" TEXT, "value" TEXT, PRIMARY KEY("key"));',
  set: (key, value) =>
    `REPLACE INTO json (key, value) VALUES (${sqlstring.escape(
      key
    )}, '${value}')`,
  get: (key) => `SELECT * FROM json WHERE (key = ${sqlstring.escape(key)})`,
  all: () => 'SELECT * FROM json',
  delete: (key) => `DELETE FROM json WHERE (key = ${sqlstring.escape(key)})`
}
