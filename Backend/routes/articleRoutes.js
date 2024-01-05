const{Router} = require('express');
const router = Router();
const articleController = require('../controller/articleController');
router.post('/', articleController.getSearch)

module.exports = router