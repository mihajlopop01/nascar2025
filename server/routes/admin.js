const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/RoleMiddleware'); 

// Zastita admin rute
router.get('/', roleMiddleware(['ADMIN']), (req, res) => {
    res.redirect('http://localhost:5173/admin');  
});

module.exports = router;