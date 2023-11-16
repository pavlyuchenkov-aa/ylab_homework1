const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

const users = [
  { id: 1, email: 'user@example.com', password: 'password123' },
];

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const token = 'test123';
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});