const statements = require('./statements')
// WIP MYSQL DB (doesnt work)
module.exports = class Database {
  constructor (options) {
    this.options = options
  }

  async connect () {
    this.connection = null
    this.connection.prepare(statements.createTable()).run()
  }

  async set (key, value) {
    if (typeof value !== 'object') throw new Error('value must be an object')
    return this.connection
      .prepare(statements.set(key, JSON.stringify(value)))
      .run()
  }

  async get (key) {
    const result = this.connection.prepare(statements.get(key)).get()
    if (result) {
      return JSON.parse(result.value.replace(/\\"/g, '"')) // replace backslashes made by JSON.stringify
    } else {
      return null
    }
  }

  async has (key) {
    const has = await this.get(key)
    return !!has
  }

  async all () {
    const query = this.connection.prepare(statements.all()).all()
    const all = new Map()
    query.forEach(({ key, value }) =>
      all.set(key, JSON.parse(value.replace(/\\"/g, '"')))
    )
    return all
  }

  async delete (key) {
    return this.connection.prepare(statements.delete(key)).run()
  }
}
