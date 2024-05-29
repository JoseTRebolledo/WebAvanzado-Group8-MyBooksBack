var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({hello: "hello world"});
  res.status(200);
});

module.exports = router;
