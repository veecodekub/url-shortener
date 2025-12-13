import express from 'express';
import { env } from './env';
import shortUrlsRouter from './routers/short-urls.router';

const app = express();
const port = env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World with Bun and Express!');
});

app.get('/health', (_, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.use(shortUrlsRouter);

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

export default app;
