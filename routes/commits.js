const express = require('express')
const controller = require('../controllers/commits')
const router = express.Router()

router.post('/', controller.postCommits);
router.get('/', controller.getAllRepositoryCommits);

module.exports = router