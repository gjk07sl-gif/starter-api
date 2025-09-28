import express from 'express';

const app = express();
app.use(express.json());

const todos = []; // in-memory store for demo

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/v1/todos', (req, res) => {
  res.json({ todos });
});

app.post('/v1/todos', (req, res) => {
  const { title } = req.body || {};
  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return res.status(400).json({ error: 'title must be a string with at least 3 characters' });
  }
  const todo = { id: todos.length + 1, title: title.trim(), done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

export default app;
