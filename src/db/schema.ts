import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const shortUrlsTable = pgTable('short_urls', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    long_url: varchar('long_url').notNull(),
    short_code: varchar('short_code').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    clicks: integer('clicks').default(0),
});
