const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/RoleMiddleware'); 

// Zastita worker rute
router.get('/', roleMiddleware(['USER']), (req, res) => {
    console.log("worker.js");
    res.redirect('http://localhost:5173/worker'); 
});

module.exports = router;