const userProfileRepository = require('../repositories/userProfileRepository');
const helper = require('../helpers/responseHelper');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userProfile = await userProfileRepository.getUserProfile(userId);

    if (!userProfile) {
      return helper.error(res, 'User profile tidak ditemukan', 404);
    }

    return helper.success(res, userProfile, 'Sukses');
  } catch (error) {
    console.error(error);
    return helper.error(res, 'Internal server error');
  }
}

exports.createProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const { firstName, lastName, profileImage } = req.body;
  
     
      if (!firstName || !lastName) {
        return helper.error(res, 'First name and last name mohon diisi terlebih dahulu', 400);
      }
  
     
      const newProfile = await userProfileRepository.createUserProfile(userId, firstName, lastName, profileImage);
  
      if (!newProfile) {
        return helper.error(res, 'Gagal membuat profile', 400);
      }
  
      return helper.success(res, newProfile, 'Sukses');
    } catch (error) {
      console.error(error);
      return helper.error(res, 'Internal server error');
    }
  }

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName } = req.body;

   
    if (!firstName || !lastName) {
      return helper.error(res, 'First name and last name mohon diisi terlebih dahulu', 400);
    }

    const updatedProfile = await userProfileRepository.updateUserProfile(userId, firstName, lastName);

    if (!updatedProfile) {
      return helper.error(res, 'Failed to update profile', 400);
    }

    return helper.success(res, updatedProfile, 'Update Profile berhasil');
  } catch (error) {
    console.error(error);
    return helper.error(res, 'Internal server error');
  }
}

exports.updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

   
    if (!file) {
      return helper.error(res, 'Masukkan gambar terlebih dahulu', 400);
    }

   
    const fileName = uuidv4() + path.extname(file.originalname);
    const filePath = path.join(__dirname, '..', 'uploads', 'profile_images', fileName);

   
    fs.renameSync(file.path, filePath);

    const updatedProfile = await userProfileRepository.updateUserProfileImage(userId, fileName);

    if (!updatedProfile) {
      return helper.error(res, 'Failed to update profile image', 400);
    }

    return helper.success(res, { imageUrl: filePath }, 'Update Profile Image berhasil');
  } catch (error) {
    console.error(error);
    return helper.error(res, 'Internal server error');
  }
}

