import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors()); // Cross-Origin Resource Sharing (Frontend ko connect karne ke liye)
app.use(express.json()); // JSON body parse karne ke liye

// MongoDB Local Connection (ya Mongo Atlas URI)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// 1. GET: Saare visions fetch karna
app.post('/api/visions', async (req, res) => {
  try {
    const visions = await Vision.find().sort({ order: 1 });
    res.json(visions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visions' });
  }
});

// 2. POST: Naya vision add karna (Seed data ke liye)
app.post('/api/visions', async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const newVision = new Vision({ title, description, order });
    await newVision.save();
    res.status(201).json(newVision);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create vision' });
  }
});

// 3. POST: Contact form messages save karna
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message stored successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to save message' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});