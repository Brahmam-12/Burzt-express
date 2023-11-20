const express = require('express');
const studentModel = require('../models/studentModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const isAuthorized = require('../middlewares/isUserAuthorized')

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await studentModel.findOne({ username: username });
        if (user) {
            return res.json({ errorMessage: "Error! Username already exits" })
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newStudent = new studentModel({
                username: username,
                password: hashedPassword
            })
            await newStudent.save();
            res.json({ message: "user created" })
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/signin', async (req, res) => {
    const Secret_Token = 'sdefgrhtn78derfgtrhtnj7sw232453'
    try {
        const { username, password } = req.body;
        const user = await studentModel.findOne({ username: username });
        if (!user) {
            return res.json({ error: "userName not registered" })
        }
        else {
            const checkPswd = await bcrypt.compareSync(password,user.password);
            if (!checkPswd) {
                return res.json({ error: "Invalid password!" })
            } else {
                const payload = { userId: user._id, username: user.username }
                const genToken = jwt.sign(payload, Secret_Token)
                res.set('authorization', genToken)
                const decoded = jwt.verify(genToken,'sdefgrhtn78derfgtrhtnj7sw232453');
                console.log(decoded.userId);
                console.log(decoded.username);
                res.json({ message: "sign in successful" })
            }
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/user', isAuthorized, (req, res) => {
    const { userId, username } = req.user
    res.json({
        userId: userId,
        username: username
    })
})

router.get('/others', isAuthorized, async (req, res) => {
    try {
        const { userId } = req.user;
        const allUsers = await studentModel.find();
        const otherStudents = allUsers.filter((user) => {
            if (user._id.toString() != userId) {
                return user
            }
        })
        const otherStudentsDetails = otherStudents.map((student) => {
            return {
                userId: student._id,
                username: student.username
            }
        })
        res.json(otherStudentsDetails)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;


