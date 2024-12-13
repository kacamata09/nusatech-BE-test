const express = require('express');
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/profile_images/' });

const router = express.Router();
router.get('/', authMiddleware, userProfileController.getProfile);
router.post('/', authMiddleware, userProfileController.createProfile);
router.put('/update', authMiddleware, userProfileController.updateProfile);
router.put('/image', upload.single('image'), authMiddleware, userProfileController.updateProfileImage);

module.exports = router;

