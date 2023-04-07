const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const machinesRoutes = require('./routes/machines');
const deliveriesRoutes = require('./routes/deliveries');
const users = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the authentication server');
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Received registration request:', req.body);
  try {
    const existingUser = await users.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await users.createUser(username,email, passwordHash);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during the login process' });
  }
});

app.use('/api/machines', machinesRoutes);
app.use('/api/deliveries', deliveriesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});