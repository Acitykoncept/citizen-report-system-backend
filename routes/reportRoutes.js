const express = require('express');
const { makeReport } = require('../controllers/reportController');
const upload = require('../config/multerConfig');

const router = express.Router();

router.post('/report', upload.single('image'), makeReport);

module.exports = router;
