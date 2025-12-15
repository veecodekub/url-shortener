import { expect, test } from 'bun:test';
import request from 'supertest';
import app from '.';

test('GET / responds with "Hello World with Bun and Express!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World with Bun and Express!');
});

test('GET /health responds with status "ok"', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
});
