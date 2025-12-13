import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World with Bun and Express!');
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

export default app;
