const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); 
}

app.use(cors({
    origin: 'http://localhost:5173' 
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//API za testiranje CORS-a
app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});