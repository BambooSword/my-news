// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const collections = sqliteTable('collections', {id:text('id').primaryKey(), userId:text('user_id').notNull(), kind:text('kind').notNull(), content:text('content').notNull(), createdAt:text('created_at').notNull()});
export const contentItems = sqliteTable('content_items', {id:text('id').primaryKey(), kind:text('kind').notNull(), content:text('content').notNull(), publishedAt:text('published_at').notNull()});
export const subscriptions = sqliteTable('subscriptions', {id:text('id').primaryKey(), email:text('email').notNull().unique(), token:text('token').notNull(), confirmed:integer('confirmed').notNull().default(0), lastSent:text('last_sent'), createdAt:text('created_at').notNull()});
