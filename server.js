const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Giftogram Technical Assessment' })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
