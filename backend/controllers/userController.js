// @desc register user
// route GET /api/user

const registerUser = (req,res) => {
    res.json({message : "user registration"})
}

// @desc login user
// route GET /api/user

const loginUser = (req,res) => {
    res.json({message : "user login"})
}

// @desc register user
// route GET /api/user

const getMe = (req,res) => {
    res.json({message : "user information"})
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}