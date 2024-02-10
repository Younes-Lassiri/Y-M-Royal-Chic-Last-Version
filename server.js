const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid'); // Import UUID module
const app = express();
const PORT = process.env.PORT || 4000;
const retry = require('retry');

app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'https://iptvnfl.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "srv1264.hstgr.io",
  user: "u501859913_royal_chic2024",
  password: "Younesselassiri2003@",
  database: "u501859913_royal_chic2024"
});

// Function to execute MySQL query with retry logic
function executeQueryWithRetry(sql, params, callback) {
  const operation = retry.operation({
    retries: 3, // Number of retries
    factor: 2, // Exponential backoff factor
    minTimeout: 1000, // Minimum timeout between retries (in milliseconds)
    maxTimeout: 60000, // Maximum timeout between retries (in milliseconds)
    randomize: true // Randomize the timeouts to prevent simultaneous retries
  });

  operation.attempt((currentAttempt) => {
    pool.query(sql, params, (err, rows, fields) => {
      if (operation.retry(err)) {
        console.log(`Retry attempt ${currentAttempt}: ${err.message}`);
        return;
      }

      callback(err ? operation.mainError() : null, rows, fields);
    });
  });
}

// Connect to MySQL
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');

  // Release the connection back to the pool
  connection.release();
});

// Route to handle user login
app.post('/api/login', (req, res, next) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  pool.query(sql, [email, password], (error, results, fields) => {
    if (error) {
      console.error('Error executing login query:', error);
      return res.status(500).json({ message: 'Error executing login query' });
    }
    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful', user: { token: 'your-user-token' } });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Route to get all users
app.get('/api/users', (req, res, next) => {
  const sql = 'SELECT * FROM users';
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error executing query to get users:', error);
      return res.status(500).json({ message: 'Error executing query to get users' });
    }
    res.json(results);
  });
});

// Route to create a new user
app.post('/api/users', (req, res, next) => {
  const { name, email, password } = req.body;
  const userId = uuidv4();
  const sql = 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)';
  pool.query(sql, [userId, name, email, password], (error, results, fields) => {
    if (error) {
      console.error('Error executing query to add user:', error);
      return res.status(500).json({ message: 'Error executing query to add user' });
    }
    res.status(201).json({ message: 'User added successfully', user: { id: userId, name, email } });
  });
});

// Route to handle settings
app.get('/api/settings', (req, res, next) => {
  const sql = 'SELECT display FROM settings LIMIT 1';
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error executing query to get settings:', error);
      return res.status(500).json({ message: 'Error executing query to get settings' });
    }
    if (results.length > 0) {
      res.json({ display: results[0].display });
    } else {
      res.status(404).json({ message: 'Settings not found' });
    }
  });
});

// Route to update display settings
app.put('/api/settings', (req, res, next) => {
  const { display } = req.body;
  const sql = 'UPDATE settings SET display = ?';
  pool.query(sql, [display], (error, results, fields) => {
    if (error) {
      console.error('Error executing query to update settings:', error);
      return res.status(500).json({ message: 'Error executing query to update settings' });
    }
    res.json({ message: 'Settings updated successfully', display });
  });
});

// Route to update user information
app.put('/api/users', (req, res, next) => {
  const { oldEmail, newEmail, name, password } = req.body;
  const sql = 'UPDATE users SET email = ?, name = ?, password = ? WHERE email = ?';
  pool.query(sql, [newEmail, name, password, oldEmail], (error, results, fields) => {
    if (error) {
      console.error('Error executing query to update user information:', error);
      return res.status(500).json({ message: 'Error executing query to update user information' });
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully', user: { email: newEmail, name } });
    }
  });
});

// Route to add orders
app.post('/api/orders', (req, res, next) => {
  const { clientName, clientContact, clientTotalPaid, clientItems, clientPayMethod } = req.body;
  const sql = 'INSERT INTO orders (clientName, clientContact, clientTotalPaid, clientItems, clientPayMethod) VALUES (?, ?, ?, ?, ?)';
  pool.query(sql, [clientName, clientContact, clientTotalPaid, clientItems, clientPayMethod], (error, results, fields) => {
    if (error) {
      console.error('Error executing query to add order:', error);
      return res.status(500).json({ message: 'Error executing query to add order' });
    }
    res.status(201).json({ message: 'Order added successfully' });
  });
});

// Route to fetch all orders
app.get('/api/orders', (req, res, next) => {
  const sql = 'SELECT * FROM orders';
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error executing query to get orders:', error);
      return res.status(500).json({ message: 'Error executing query to get orders' });
    }
    res.json(results);
  });
});

// Route to add messages
app.post('/api/messages', (req, res, next) => {
  const { userName, userEmail, contactMessage } = req.body;
  const sql = 'INSERT INTO messages (userName, userEmail, contactMessage) VALUES (?, ?, ?)';
  pool.query(sql, [userName, userEmail, contactMessage], (error, results, fields) => {
    if (error) {
      console.error('Error executing query to add message:', error);
      return res.status(500).json({ message: 'Error executing query to add message' });
    }
    res.status(201).json({ message: 'Message added successfully' });
  });
});

// Route to fetch all messages
app.get('/api/messages', (req, res, next) => {
  const sql = 'SELECT * FROM messages';
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error executing query to get messages:', error);
      return res.status(500).json({ message: 'Error executing query to get messages' });
    }
    res.json(results);
  });
});




// Route to get all products
app.get('/api/products', (req, res, next) => {
  const sql = 'SELECT * FROM products';
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error executing query to get products:', error);
      return res.status(500).json({ message: 'Error executing query to get products' });
    }
    res.json(results);
  });
});

// Route to create a new product
app.post('/api/products', (req, res, next) => {
  const { name, thumbnail, price, isNew, sold, promo, oldPrice, promoValue, wish, quantite } = req.body;
  const sql = 'INSERT INTO products (name, thumbnail, price, isNew, sold, promo, oldPrice, promoValue, wish, quantite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(sql, [name, thumbnail, price, isNew, sold, promo, oldPrice, promoValue, wish, quantite], (error, results, fields) => {
    if (error) {
      console.error('Error executing query to add product:', error);
      return res.status(500).json({ message: 'Error executing query to add product' });
    }
    res.status(201).json({ message: 'Product added successfully' });
  });
});

app.listen(process.env.PORT || 4000);