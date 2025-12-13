import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../env';
import { shortUrlsTable } from './schema';

export const db = drizzle(env.DATABASE_URL, {
    schema: {
        shortUrlsTable,
    },
});
