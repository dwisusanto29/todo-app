const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Define the ToDo model
const ToDo = sequelize.define('ToDo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Sync the model with the database
sequelize.sync();

// Routes

// GET /todos - Get all todos
app.get('/todos', async (req, res) => {
  const todos = await ToDo.findAll();
  res.json(todos);
});

// GET /todos/:id - Get a single todo by ID
app.get('/todos/:id', async (req, res) => {
  const todo = await ToDo.findByPk(req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'ToDo not found' });
  }
});

// POST /todos - Create a new todo
app.post('/todos', async (req, res) => {
  const { title } = req.body;
  const todo = await ToDo.create({ title });
  res.status(201).json(todo);
});

// PUT /todos/:id - Update a todo by ID
app.put('/todos/:id', async (req, res) => {
  const { title, completed } = req.body;
  const todo = await ToDo.findByPk(req.params.id);
  if (todo) {
    todo.title = title;
    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } else {
    res.status(404).json({ error: 'ToDo not found' });
  }
});

// DELETE /todos/:id - Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  const todo = await ToDo.findByPk(req.params.id);
  if (todo) {
    await todo.destroy();
    res.json({ message: 'ToDo deleted' });
  } else {
    res.status(404).json({ error: 'ToDo not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
