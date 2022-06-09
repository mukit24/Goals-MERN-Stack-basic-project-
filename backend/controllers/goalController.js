const Goal = require('../models/goalModel')
const User = require('../models/userMOdel')
const ash = require('express-async-handler')
// @desc get goals
// route GET /api/goals
const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({user : req.user.id})
        res.status(210).json({
            status: 'Success',
            data: {
                goals
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

// @desc set goals
// route POST /api/goals
const setGoal = async (req, res) => {
    
    try {
        const goal = await Goal.create({
            text : req.body.text,
            user : req.user.id
        })
        res.status(210).json({
            status: 'Success',
            data: {
                goal
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

// @desc update goals
// route PUT /api/goals
const updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id)

        if(!goal){
            res.status(401)
            throw new Error('No goals found')
        }
        const user = await User.findById(req.user.id)

        if(goal.user.toString() !== user.id){
            res.status(401)
            throw new Error('User not authorized..')
        }

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(210).json({
            status: 'Success',
            data: {
                updatedGoal
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

// @desc delete goals
// route DELETE /api/goals

const deleteGoal = ash(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
        
        if(!goal){
            res.status(401)
            throw new Error('No goals found')
        }
        const user = await User.findById(req.user.id)

        if(goal.user.toString() !== user.id){
            res.status(401)
            throw new Error('User not authorized..')
        }

    await Goal.findByIdAndDelete(req.params.id)
    res.status(210).json({
        status: 'Success',
        data: { }
    })
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}