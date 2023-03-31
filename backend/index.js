const express = require('express');
const cors = require('cors');
require('dotenv').config();
const machinesRoutes = require('./routes/machines');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/machines', machinesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
