import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const shortUrlsTable = pgTable('short_urls', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity({
        startWith: 1001,
    }),
    long_url: varchar('long_url').notNull(),
    short_code: varchar('short_code').notNull().unique(),
    clicks: integer('clicks').notNull().default(0),
    created_at: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});
