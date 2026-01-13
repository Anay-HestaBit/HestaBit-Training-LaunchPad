const express = require('express');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(express.json());
const MOCK_USERS = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'developer' },
];
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date(),
  });
});
app.get('/api/v1/users', (req, res) => {
  console.log('Fetching users...');
  res.status(200).json({
    success: true,
    data: MOCK_USERS,
  });
});
app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;

  console.log(` LOGIN ATTEMPT: User=${username}, Password=${password}`);
  if (username === 'admin' && password === 'secure123') {
    return res.status(200).json({
      success: true,
      token: 'fake-jwt-token-xyz',
      message: 'Login successful!',
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials',
  });
});
app.listen(PORT, () => {
  console.log(` Production Server running on port ${PORT}`);
});
