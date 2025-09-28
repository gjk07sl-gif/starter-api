import request from 'supertest';
import app from '../app.js';

describe('Starter API', () => {
  test('GET /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /v1/todos validates', async () => {
    const res = await request(app).post('/v1/todos').send({ title: 'x' });
    expect(res.status).toBe(400);
  });

  test('POST then GET /v1/todos', async () => {
    const created = await request(app).post('/v1/todos').send({ title: 'Learn APIs' });
    expect(created.status).toBe(201);
    const list = await request(app).get('/v1/todos');
    expect(list.status).toBe(200);
    expect(list.body.todos.length).toBeGreaterThanOrEqual(1);
  });
});
