const express = require('express');
const router = express.Router();
const { imageUpload } = require('../middleware/imageUpload');
const { authenticate } = require('../middleware/auth');
const { uploadImageMessage, postTextMessage, getChats } = require('../controllers/chat');


router.get('/chats', [authenticate], getChats);
router.post('/image-upload/:userId', [authenticate, imageUpload], uploadImageMessage);
router.post('/message/:userId', [authenticate], postTextMessage);

module.exports = router;