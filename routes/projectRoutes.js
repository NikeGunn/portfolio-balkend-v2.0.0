const express = require('express');
const {
  ap,
  cp,
  up,
  dp,
} = require('../controllers/projectController');

const router = express.Router();

router.get('/', ap);
router.post('/', cp);
router.put('/:id', up);
router.delete('/:id', dp);

module.exports = router;
