const router = require('express').Router();
const User = require('./../models/user');
const authMiddleware = require('../middlewares/authMiddleware');

//get Details.
//normal
// router.get('get-logged-user', async (req, res) => { })
//but since this route should be accessible to authenticated users only thus we need to use our authMiddleware.
//the reason autheMiddleware is between is becuase we need to call this function before executing async callback function.
// router.get('get-logged-user', authMiddleware, async (req, res) => { })

//to get the user details
// in AuthMiddleare, we are extracting userId from the jwt token and then sending it as request to this callback function
router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        res.send({
            message: 'User details fetched successfully',
            success: true,
            user: user
        })

    } catch (err) {
        res.send({
            message: err.message,
            success: false
        })
    }
})

router.get('/get-all-users', authMiddleware, async (req, res) => {
    try {
        const allUsers = await User.find({_id: {$ne: req.body.userId}});
        res.send({
            message: 'All users fetched successfully',
            success: true,
            user: allUsers
        })

    } catch (err) {
        res.status(400).send({
            message: err.message,
            success: false
        })
    }
})

module.exports = router;

