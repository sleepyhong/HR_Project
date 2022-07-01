const router = require("express").Router();

const AdminController = require('../controllers/admin');

// employee profiles
router.get('/profiles', AdminController.getUsers);

// housing management
router.post('/add-house', AdminController.postAddHouse);
router.get('/houses', AdminController.getHouses);
router.delete('/delete-house/:houseId', AdminController.deleteHouse);

module.exports = router;