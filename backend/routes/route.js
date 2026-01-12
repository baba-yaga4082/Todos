
const router = require('express').Router();
const User = require('../models/user').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

router.post('/register', async (req, res) => {
    try {
        const {email, username, password} = req.body;
        
        const user1 = await User.findOne({email});
        if(user1){
            return res.status(400).json({message: 'user already exists'});
        }
        
        const hashpsswd = await bcrypt.hash(password, 10);
        const user = new User({email, username, password: hashpsswd});
        await user.save();
        
        return res.status(200).json({message: 'user registered successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'server error'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'register first'});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const payload = {
            userId: user._id,
            email: user.email
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        const {password: pwd, ...others} = user._doc;

        return res.status(200).json({
            user: others,
            token
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

module.exports = router;