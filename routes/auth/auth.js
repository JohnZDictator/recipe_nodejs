const router = requrie('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../model/User');
const { registerValidation, loginValidation } = require('../../validation');


router.post('/register', async (req, res) => {
    // input validation 
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if email already exists
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
    
});

router.post('/login', (req, res) => {
    // input validation
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email or Password is Wrong');

    // password validation
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Email or Password is Wrong');

    // jwt token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;