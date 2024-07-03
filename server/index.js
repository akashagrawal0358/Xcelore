const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbconn = require('./db/conn');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

dbconn();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
