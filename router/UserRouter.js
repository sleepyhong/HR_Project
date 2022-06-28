const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Token = require("../model/RegisterToken");

router.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error("Incorrect username or password")
        }

        res
            .status(200)
            .json({
                user: user
            });
    }
    catch (error) {
        res
            .status(400)
            .json({
                error: error.toString()
            });
    }
});

router.post('/register/:token', async (req, res) => {
    const { tokenString } = req.params;
    const { username, email, password } = req.body

    const token = await Token.findOne({ token: tokenString });
    if (!token) {
        return res
            .status(400)
            .json({ msg: 'Invalid Token'});
    }

    if ((token.dateCreated.getTime() - new Date().getTime()) / (1000 * 60 * 60) > 3) {
        await Token.findOneAndDelete({ token: tokenString });
        return res
            .status(400)
            .json({ msg: 'Token Expired. Contact your hiring manager for more information'})
    }

    if (password.length < 8) {
        return res
            .status(400)
            .json({ msg: 'Password should be at least 8 characters long' })
    }

    const user = await User.findOne({ username: username }) // finding user in db
    const userEmail = await User.findOne({ email: email }) // finding user in db
    if (user || userEmail)
        return res.status(400).json({ msg: 'User already exists' })

    const newUser = new User({
        username: username,
        email: email,
        password: password
    })

    // hashing the password
    bcrypt.hash(password, Number(process.env.SALT), async (err, hash) => {
        if (err)
            return res.status(400).json({ msg: err })

        newUser.password = hash
        const savedUserRes = await newUser.save()

        if (savedUserRes)
            return res.status(200).json({ msg: 'User is successfully saved' })
    })
});

module.exports = router;