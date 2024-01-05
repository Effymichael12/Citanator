const {Router} = require('express');
const router = Router();
const citationController = require('../controller/citationController')
router.post('/cite', citationController.getCitation)
router.post('/update', citationController.updateCitation)

module.exports = router;