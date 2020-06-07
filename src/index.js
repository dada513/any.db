const SQliteDatabase = require('./sqlite/Database')
module.exports.createDatabase = async (type, options) => {
  if (!type) throw new Error('Database type is not defined')
  if (!options) throw new Error('Database options is not defined')
  if (type === 'sqlite') {
    if (!options.file) throw new Error('Database file is not defined')
    const db = new SQliteDatabase(options)
    await db.connect()
    return db
  }
}
