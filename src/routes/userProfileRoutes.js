const express = require('express');
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/profile_images/' });

const router = express.Router();
router.get('/profile', authMiddleware, userProfileController.getProfile);
router.post('/profile', authMiddleware, userProfileController.createProfile);
router.put('/profile/update', authMiddleware, userProfileController.updateProfile);
router.put('/profile/image', upload.single('image'), authMiddleware, userProfileController.updateProfileImage);

module.exports = router;

