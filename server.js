const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const { USERNAME, PASSWORD } = process.env;

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data.map(({ name, email, username }) => ({ name, email, username }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
