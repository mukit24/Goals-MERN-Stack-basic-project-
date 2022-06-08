const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userMOdel')

// @desc register user
// route Post /api/user

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }

    //check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User already exist")
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password: hashedPass
    })

    if(user){
        res.status(201).json({
            '_id': user.id,
            'name': user.name,
            'email': user.email,
            'token': generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid user")
    }
    
})

// @desc login user
// route POST /api/user/login

const loginUser = asyncHandler(async (req, res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            '_id': user.id,
            'name': user.name,
            'email': user.email,
            'token': generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

// @desc register user
// route GET /api/user/me

const getMe = asyncHandler(async (req, res) => {
    const {_id,name,email} = await User.findById(req.user.id)
    res.status(201).json({
        id: _id,
        name,
        email
    })
})

//genertae jwt
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}