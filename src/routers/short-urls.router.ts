import { eq, sql } from 'drizzle-orm';
import express, { type Request, type Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { customAlphabet } from 'nanoid';
import { db } from '../db';
import { shortUrlsTable } from '../db/schema';

const nanoid = customAlphabet(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    10
);

const shortUrlsRouter = express.Router();

shortUrlsRouter.get(
    '/:short_code',
    param('short_code').isString().withMessage('Short code is required'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const short_code = req.params.short_code as string;

        try {
            const short_url = await db.query.shortUrlsTable.findFirst({
                where: eq(shortUrlsTable.short_code, short_code),
            });

            if (!short_url) {
                return res.status(404).json({ error: 'Short URL not found' });
            }

            await db
                .update(shortUrlsTable)
                .set({
                    clicks: sql`${shortUrlsTable.clicks} + 1`,
                })
                .where(eq(shortUrlsTable.id, short_url.id));

            res.redirect(short_url.long_url);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
);

shortUrlsRouter.post(
    '/',
    [body('url').isURL().withMessage('URL is required')],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const url = req.body.url as string;

        try {
            const short_code = nanoid();

            await db.insert(shortUrlsTable).values({
                long_url: url,
                short_code,
            });

            res.json({
                url,
                short_code,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
);

export default shortUrlsRouter;
