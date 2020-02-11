const express = require('express');

const app = express();

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to food order API...' });
});

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menus', require('./routes/menus'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/orders', require('./routes/order'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
