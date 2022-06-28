const router = require('express').Router();

const UserRouter = require("./UserRouter");
const TokenRouter = require("./TokenRouter");

router.use(UserRouter);
router.use(TokenRouter);

module.exports = router;
