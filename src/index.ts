import express from 'express';
import { env } from './env';

const app = express();
const port = env.PORT;

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

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

export default app;
