const router = require("express").Router();

const AdminController = require('../controllers/admin');

router.get('/profiles', AdminController.getUsers)

module.exports = router;