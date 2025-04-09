const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importă pachetul cors
const userRoutes = require('./routes/userRoutes');
const app = express();

// Utilizează middleware-ul CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permite cererile doar de la acest origin
  methods: 'GET,POST,PUT,DELETE', // Permite aceste metode
  allowedHeaders: 'Content-Type,Authorization' // Permite aceste anteturi
}));

mongoose.connect('mongodb://localhost:27017/my_ecommerce_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});