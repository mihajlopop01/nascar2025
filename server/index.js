const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./controllers/UserController');
const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); 
}

const db = process.env.MONGO_URI
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
    origin: 'http://localhost:5173' 
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//API za testiranje CORS-a
app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});