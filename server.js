/*
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Dummy user data for demonstration
const users = [];

// Route to handle user login
// Route to handle user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      res.status(200).json({ message: 'Login successful', user: { token: 'your-user-token' } });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json({ message: 'User added successfully', user: newUser, allUsers: users });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/









const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid'); // Import UUID module
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Default user for MySQL
  database: 'royalChic'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to handle user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    connection.query(sql, [email, password], (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Error executing query' });
        return;
      }
      if (results.length > 0) {
        res.status(200).json({ message: 'Login successful', user: { token: 'your-user-token' } });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
});





// Route to get all users
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Error executing query' });
      return;
    }
    res.json(results);
  });
});

// Route to create a new user
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;
  const userId = uuidv4(); // Generate a UUID for the user
  const sql = 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)';
  connection.query(sql, [userId, name, email, password], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Error executing query' });
      return;
    }
    res.status(201).json({ message: 'User added successfully', user: { id: userId, name, email } });
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



/*dispaly*/




// Route to handle settings
app.get('/api/settings', (req, res) => {
  const sql = 'SELECT display FROM settings LIMIT 1'; // Assuming settings have only one row
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Error executing query' });
      return;
    }
    if (results.length > 0) {
      res.json({ display: results[0].display });
    } else {
      res.status(404).json({ message: 'Settings not found' });
    }
  });
});

// Route to update display settings
app.put('/api/settings', (req, res) => {
  const { display } = req.body;
  const sql = 'UPDATE settings SET display = ?'; // No need for WHERE clause
  connection.query(sql, [display], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Error executing query' });
      return;
    }
    res.json({ message: 'Settings updated successfully', display });
  });
});


/*chnege user*/



/// Route to update user information
app.put('/api/users', (req, res) => {
  const { oldEmail, newEmail, name, password } = req.body;
  const sql = 'UPDATE users SET email = ?, name = ?, password = ? WHERE email = ?';
  connection.query(sql, [newEmail, name, password, oldEmail], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Error executing query' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully', user: { email: newEmail, name } });
    }
  });
});
