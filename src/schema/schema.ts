import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

// This is a Sample of the table creation. 
// Please refer to https://orm.drizzle.team/docs/mysql/sql-schema-declaration

export const usersTable = mysqlTable('users_table', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
