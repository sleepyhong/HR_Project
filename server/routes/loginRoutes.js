const UserAuthSchema = require('../models/UserAuth')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password)
        return res.status(400).json({ msg: 'All fields are required' })

    if (password.length < 8) {
        return res
            .status(400)
            .json({ msg: 'Password should be at least 8 characters long' })
    }

    const user = await UserAuthSchema.findOne({ username }) // finding user in db
    const userEmail = await UserAuthSchema.findOne({ email }) // finding user in db
    if (user || userEmail) return res.status(400).json({ msg: 'User already exists' })

    const newUser = new UserAuthSchema({ username, email, password })
    // hasing the password
    bcrypt.hash(password, 7, async (err, hash) => {
        if (err)
        return res.status(400).json({ msg: 'error while saving the password' })

        newUser.password = hash
        const savedUserRes = await newUser.save()

        if (savedUserRes)
        return res.status(200).json({ msg: 'user is successfully saved' })
    })
})

router.post(`/login`, async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        res.status(400).json({ msg: 'Missing fields' })
    }

    const user = await UserAuthSchema.findOne({ username }) // finding user in db
    const userEmail = await UserAuthSchema.findOne({ email }) // finding user in db
    if (!user || !userEmail) {
        return res.status(400).json({ msg: 'User not found' })
    }

    // comparing the password with the saved hash-password
    const matchPassword = await bcrypt.compare(password, user.password)
    if (matchPassword) {
        const userSession = { username: user.username, email: user.email}
        req.session.user = userSession

        return res
        .status(200)
        .json({ msg: 'You have logged in successfully', userSession }) 
    } else {
        return res.status(400).json({ msg: 'Invalid credential' })
    }

})

router.get('/isAuth', async (req, res) => {
    if (req.session.user) {
    return res.json(req.session.user)
    } else {
    return res.status(401).json('unauthorize')
    }
})

module.exports = router