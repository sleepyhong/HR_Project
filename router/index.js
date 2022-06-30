const router = require('express').Router();

const UserRouter = require("./UserRouter");
const HRAdminRouter = require("./HRAdminRouter");

router.use(UserRouter);
router.use(HRAdminRouter)

module.exports = router;