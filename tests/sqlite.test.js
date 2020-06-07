const any = require('../src/index')
test('execute queries on the database', async () => {
  const db = await any.createDatabase('sqlite', {
    file: './test.db'
  })

  await db.set('test', { testing: true })
  expect(await db.has('test')).toBeTruthy()
  expect(await db.all()).toEqual(
    new Map(
      Object.entries({
        test: { testing: true }
      })
    )
  )
  expect(await db.get('test')).toEqual({ testing: true })
  await db.delete('test')
  expect(await db.get('test')).toBeNull()
  expect(await db.has('test')).toBeFalsy()
  expect(await db.all()).toEqual(new Map())
})

test('error handling', async () => {
  await expect(any.createDatabase()).rejects.toThrow(
    new Error('Database type is not defined')
  )
  await expect(any.createDatabase('sqlite')).rejects.toThrow(
    new Error('Database options is not defined')
  )
  await expect(any.createDatabase('sqlite', {})).rejects.toThrow(
    new Error('Database file is not defined')
  )

  const db = await any.createDatabase('sqlite', {
    file: './test.db'
  })
  await expect(db.set('throw', 'provide wrong value type')).rejects.toThrow()
})
