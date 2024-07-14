const express = require('express');
const mongoose = require('mongoose');
const Dish = require('./model/dishSchema');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/dishes/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    const dish = await Dish.findOne({ dishId: id });
    dish.isPublished = !dish.isPublished;
    await dish.save();
    res.json(dish);
    console.log(`Dish updated: ${JSON.stringify(dish)}`);
    io.emit('updateDish', dish); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/dishes', async (req, res) => {
  const { dishId, dishName, imageUrl, isPublished } = req.body;
  const newDish = new Dish({ dishId, dishName, imageUrl, isPublished });
  try {
    const savedDish = await newDish.save();
    res.json(savedDish);
    console.log(`New dish added: ${JSON.stringify(savedDish)}`);
    io.emit('newDish', savedDish); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
