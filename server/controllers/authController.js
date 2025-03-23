const router = require('express').Router();
const bcrypt  = require('bcryptjs');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    try {
        //1. If the user already exists
        const user = await User.findOne({email: req.body.email});

        //2. If user exist, send an error response 
        if (user) {
            return res.send({
                message: 'User already exists',
                success: false
            })    
        }
        //3. When password is send from user as plain text, to save in data base, we need to Encrypt the Password
        //accept two arguments:
            // - password value
            // - salt value:
            //     - determines computational cost of hashing.
            //     - higher the value, slower the result or encryption but more secure and vice versa.
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        //4. Create new user 
        const newUser =  new User(req.body);

        //5. save in Database
        await newUser.save();

        //6. Return the response.
        res.send({
            message: 'User created successfully',
            success: true
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
});

router.post('/login', async (req, res) => {

    try {
        // 1. to use login, we are going to send request body with email and password:
        // “email”: “Ngawangzandsaad@sa.com”,
        // “password”: “1221213”
        
        // 2. when we send, first we need to check if that email is present in Database or not.
        const user = await User.findOne({ email: req.body.email }).select('+password');
        if (!user) {
            return res.send({
                message: 'User does not exists',
                success: false
            })    
        }
        // 3. Check if the password is correct or not for that existing email
        // If it exist then check if password is correct.
        // since the password is saved as encrypted password as done in signup logic.
        // and since we receive the plain password in request body, we need to compare in such a way 
        // that we can compare plain password and encrypted password and check if they match.
        // for that we can use bcrypt package and use compare method of it.
        console.log(req.body);
        console.log(user);
        const isvalid = await bcrypt.compare(req.body.password, user.password);
        console.log(req.body);
        if (!isvalid) { 
            return res.send({
                message: 'Invalid password',
                success: false
            })
        }
        // 4. If the user exists and password is correct then assign a JWT Token.
        const token = jwt.sign({userId: user?._id}, process.env.SECRET_KEY, {expiresIn: '1d'});

        //5. Return the success response
        return res.send({
            message: 'Logged in successfully',
            success: true,
            token: token
        })

    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
});

module.exports = router;