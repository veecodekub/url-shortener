import { expect, test } from 'bun:test';
import request from 'supertest';
import app from '..';

test('Create a new short URL', async () => {
    const response = await request(app)
        .post('/')
        .send({ url: 'https://example.com' })
        .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('url', 'https://example.com');
    expect(response.body).toHaveProperty('short_code');
});

test('Redirect to original URL', async () => {
    // First, create a new short URL
    const createResponse = await request(app)
        .post('/')
        .send({ url: 'https://example.com' })
        .set('Accept', 'application/json');

    const shortCode = createResponse.body.short_code;

    // Now, test the redirection
    const redirectResponse = await request(app)
        .get(`/${shortCode}`)
        .redirects(0); // Prevent following redirects

    expect(redirectResponse.status).toBe(302);
    expect(redirectResponse.headers.location).toBe('https://example.com');
});
