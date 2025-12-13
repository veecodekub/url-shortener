import { expect, test } from 'bun:test';
import request from 'supertest';
import app from '.';

test('GET / responds with "Hello World with Bun and Express!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World with Bun and Express!');
});
