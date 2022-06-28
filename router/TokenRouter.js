const router = require("express").Router();
const Token = require("../model/RegisterToken");

router.get('/create-register-token', async (req, res) => {
    try {
        const tokenString = Math.random().toString(36).substring(2);
        const token = await Token.create({
            token: tokenString,
            dateCreated: new Date()
        });
        res.status(400).json(token);
    }
    catch (error) {
        res.status(200).json(error.toString());
    }

    res.status(400).json(Math.random().toString(36).substring(2));
});


module.exports = router;