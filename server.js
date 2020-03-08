const express = require('express');
const connectDB = require('./db/mongoose');

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

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to food order API...' });
});

// Routes
app.use('/api/users', require('./routes/users'));
// app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menus', require('./routes/menus'));
// app.use('/api/customers', require('./routes/customers'));
app.use('/api/orders', require('./routes/order'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
