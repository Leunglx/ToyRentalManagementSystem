const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.json({ message: '123dsd456' });
});

module.exports = router;
