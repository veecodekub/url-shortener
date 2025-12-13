import express, { type Request, type Response } from 'express';
import { decode, encode } from '../utils/base62.util';
import { body, param, validationResult } from 'express-validator';
import { db } from '../db';
import { shortUrlsTable } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

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
        const id = decode(short_code);

        try {
            const short_url = await db.query.shortUrlsTable.findFirst({
                where: eq(shortUrlsTable.id, id),
            });

            if (!short_url) {
                return res.status(404).json({ error: 'Short URL not found' });
            }

            await db
                .update(shortUrlsTable)
                .set({
                    clicks: (short_url.clicks ?? 0) + 1,
                })
                .where(eq(shortUrlsTable.id, id));

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

        const last_row_result = await db
            .select()
            .from(shortUrlsTable)
            .orderBy(desc(shortUrlsTable.created_at))
            .limit(1);

        const last_row_id = last_row_result[0] ? last_row_result[0].id : 1000;
        const id = last_row_id + 1;
        const short_code = encode(id);

        await db.insert(shortUrlsTable).values({
            long_url: url,
            short_code,
        });

        res.json({
            url,
            short_code,
        });
    }
);

export default shortUrlsRouter;
