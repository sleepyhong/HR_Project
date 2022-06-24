const router = require('express').Router();

router.get("/api", function(req, res) {
    res.send('hello');
})

module.exports = router;
