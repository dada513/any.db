interface SQLiteOptions {
  file: string;
}
declare class Database {
  /**
   * @param options Options for the database
   */
  constructor(options: SQLiteOptions);
  /**
   * Connects to the database.
   * Don't use this method if you are using createDatabase
   */
  connect(): Promise<void>;
  /**
   * Sets a key in the database
   * @param key
   * @param value
   */
  set(key: string, value: object): Promise<void>;
  /**
   * Gets a key from the database
   * @param key the key to retrieve
   */
  get(key: string): Promise<object | null>;
  /**
   * Checks if a key exists in the database
   * @param key the key to check for
   */
  has(key: string): Promise<boolean>;
  /**
   * Returns a Map of all keys and their values in the database
   */
  all(): Promise<Map<string, object>>;
  /**
   * Deletes a key from the database
   * @param key The key to delete
   */
  delete(key: string): Promise<void>;
}

export type supportedDatabases = "sqltie";
export type dbOptions = SQLiteOptions;

/**
 * Creates the database
 * @param type Type of the database: MySQL or SQLite
 * @param options Options for the database connection
 */
export function createDatabase(
  type: supportedDatabases,
  options: dbOptions
): Promise<Database>;
