// @desc get goals
// route GET /api/goals
const getGoals = (req,res) => {
    res.status(200).json({ message:  'get goal' })
}

// @desc set goals
// route POST /api/goals
const setGoal = (req,res) => {
    res.status(200).json({ message:  'set goal' })
}

// @desc update goals
// route PUT /api/goals
const updateGoal = (req,res) => {
    res.status(200).json({ message:  `update goal ${req.params.id}` })
}

// @desc delete goals
// route DELETE /api/goals
const deleteGoal = (req,res) => {
    res.status(200).json({ message : `delete goal ${req.params.id}`})
}

module.exports = {
    getGoals,setGoal,updateGoal,deleteGoal
}