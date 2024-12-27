const express = require('express');
const router = express.Router();
const User = require('../model/User');


router.post('/', async (req, res) => {
    const { email, password, name, role } = req.body;

    try {
        const newUser = new User({ email, password, name, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

module.exports = router;