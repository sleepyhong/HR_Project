const router = require("express").Router();
const nodemailer = require("nodemailer");

const Token = require("../model/RegisterToken");

router.post('/check-token', async (req, res) => {
    const { tokenString } = req.body;

    const token = await Token.findOne({ token: tokenString });
    if (!token) {
        return res
            .status(400)
            .json({ msg: 'Invalid Token' });
    }

    if ((token.dateCreated.getTime() - new Date().getTime()) / (1000 * 60 * 60) > 3) {
        await Token.findOneAndDelete({ token: tokenString });
        return res
            .status(400)
            .json({ msg: 'Token Expired. Contact your hiring manager for more information' });
    }

    return res.status(200);
});

router.post('/create-register-token', async (req, res) => {
    try {
        const { userEmail } = req.body;
        const tokenString = Math.random().toString(36).substring(2);
        const token = await Token.create({
            token: tokenString,
            dateCreated: new Date(),
            userEmail: userEmail
        });

        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const info = await transporter.sendMail({
            from: `"HR Project" <${process.env.EMAIL}>`,
            to: userEmail,
            subject: "Link to Register Page",
            text: `Here is the link to the register page!\nhttp://localhost:3001/register/${tokenString}`
        });


        res.status(200).json(token);
    }
    catch (error) {
        res.status(400).json(error.toString());
    }
});


module.exports = router;