const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Updated CORS Configuration
app.use(
    cors({
      origin: "*", 
      credentials: true, // Allows cookies & auth headers
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  
// Routes
app.use('/api/auth', authRoutes);
app.get("/",(req,res) => {
    console.log("daiwhd");
    res.send("<h1>TMol</h1>")
})

app.get("",(req,res) => {
    console.log("dai312321whd");
    res.send("<h1>TMol</h1>")
})
// Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log("MongoDB URI:", process.env.MONGO_URI);