// require the module
const any = require("any.db");

async function main() {
  // create the database
  const db = await any.createDatabase("sqlite", { file: "db.sqlite" });
  // set values in the database
  await db.set("user1", { email: "someuser@example.com", password: "12345" });
  // get values
  await db.get("user1"); // Returns { email: "someuser@example.com", password: "12345" }
  // get all values
  /* 
      This returns a Map of key => value
      Learn more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    */
  await db.all();
  // delete a user
  await db.delete("user1");
  // check if a key exists in the database
  await db.has("user1");
}
main();
