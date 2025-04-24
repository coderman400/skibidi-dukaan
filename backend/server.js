const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'https://skibidi-dukaan-chi.vercel.app'
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error('[GLOBAL ERROR]', err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

app.use((req, res, next) => {
    const allowedOrigin = 'https://skibidi-dukaan-chi.vercel.app';
    const origin = req.headers.origin;
    
    if (origin === allowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      return next();
    }
  
    res.status(403).json({ error: 'CORS policy: Access denied' });
  });


// Routes
app.use('/auth', require('./routes/auth'));
app.use('/snacks', require('./routes/snackRoutes'));
app.use('/cart', require('./routes/cartRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));
app.use('/otp', require('./routes/otpRoutes'));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Successfully Connected"))
    .catch(err => console.log("DB Connection Error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
