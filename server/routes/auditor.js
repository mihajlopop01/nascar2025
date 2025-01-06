const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/RoleMiddleware'); 

// Zastita auditor rute
router.get('/', roleMiddleware(['AUDITOR']), (req, res) => {
    res.redirect('http://localhost:5173/auditor'); 
});

module.exports = router;