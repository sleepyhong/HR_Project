const router = require('express').Router();

const UserRouter = require("./UserRouter");

router.use(UserRouter);

module.exports = router;
