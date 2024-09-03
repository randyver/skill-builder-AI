import { integer, pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const videos = pgTable('videos', {
  id: serial('id').primaryKey(),
  title: varchar("title").notNull(),
  url: text("url").notNull(),
  level: text("level").notNull(),
  field: text("field").notNull(),
});

export const result = pgTable('result', {
  result_id: uuid("result_id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id),
  field: text("field").notNull(),
});

export const fields = pgTable('fields', {
  field: text("field").primaryKey(),
  description: text("description").notNull(),
  url_image: text("url_image").notNull(),
});