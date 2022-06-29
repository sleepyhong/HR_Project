const router = require("express").Router();
const nodemailer = require("nodemailer");

const Token = require("../model/RegisterToken");

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
                user: "seoungwoo0407@outlook.com",
                pass: "Sm10230420?"
            },
            tls:{
                rejectUnauthorized:false
            }
        });
        const info = await transporter.sendMail({
            from: '"HR Project" <seoungwoo0407@outlook.com>',
            to: userEmail,
            subject: "Link to Register Page",
            text: `
                Here is the link to the register page!
                http://localhost:3001/register/${tokenString}
            `
        });


        res.status(200).json(token);
    }
    catch (error) {
        res.status(400).json(error.toString());
    }
});


module.exports = router;