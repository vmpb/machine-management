const express = require('express');
const cors = require('cors');
require('dotenv').config();
const machinesRoutes = require('./routes/machines');
const deliveriesRoutes = require('./routes/deliveries');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/machines', machinesRoutes);
app.use('/api/deliveries', deliveriesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
