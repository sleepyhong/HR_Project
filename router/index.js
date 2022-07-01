const router = require('express').Router();

const UserRouter = require("./UserRouter");
const HRAdminRouter = require("./HRAdminRouter");
const TokenRouter = require("./TokenRouter");

router.use(UserRouter);
router.use(HRAdminRouter);
router.use(TokenRouter);

module.exports = router;