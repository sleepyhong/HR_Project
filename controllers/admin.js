const User = require('../model/User');

exports.getUsers = (req, res, next) => {
    User.find({ type: "employee" })
    .then(users => {
        res.json(users)
    })
    .catch(err => {console.log(err)})
}