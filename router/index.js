const router = require('express').Router();

const UserRouter = require("./UserRouter");
const HRAdminRouter = require("./HRAdminRouter");
const TokenRouter = require("./TokenRouter");
const HouseRouter = require("./HouseRouter");

router.use(UserRouter);
router.use(HRAdminRouter);
router.use(TokenRouter);
router.use(HouseRouter);

module.exports = router;