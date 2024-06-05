require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Could not connect to MongoDB:', error));

// Routes
app.use('/movies', require('./routes/movieRoutes'));
app.use('/reviews', require('./routes/reviewRoutes'));
app.use('/users', require('./routes/userRoutes'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
