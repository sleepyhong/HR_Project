const router = require("express").Router();

const AdminController = require('../controllers/admin');

// employee profiles
router.get('/profiles', AdminController.getUsers);

// housing management
router.post('/add-house', AdminController.postAddHouse);
router.get('/houses', AdminController.getHouses);
router.delete('/delete-house/:houseId', AdminController.deleteHouse);

// Hiring Management
router.patch('/application/:id', AdminController.updateApplicationStatus)
router.patch('/visa/:id/update-opt-receipt', AdminController.updateOPTReceiptStatus)
router.patch('/visa/:id/update-opt-ead', AdminController.updateOPTEADStatus)
router.patch('/visa/:id/update-i983', AdminController.updateI983Status)
router.patch('/visa/:id/update-i20', AdminController.updateI20Status)


router.post('/visa/:id/send-update', AdminController.sendUploadDocumentsEmail)

module.exports = router;