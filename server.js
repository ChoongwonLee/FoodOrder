const express = require('express');
const connectDB = require('./db/mongoose');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8000;

// Connect MongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
// To access uploaded images (make images publically available)
// app.use('/api/menus/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menus', require('./routes/menus'));
app.use('/api/orders', require('./routes/order'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
