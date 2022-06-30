const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

router.post('/login', async function(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error("Incorrect username or password")
        }

        res.json({
            success: true,
            user: user
        });
    }
    catch (error) {
        res.json({
            success: false,
            error: error.toString()
        });
    }
})

module.exports = router;