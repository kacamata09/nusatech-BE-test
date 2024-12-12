const bannerRepo = require("../repositories/bannerRepository");
const helper = require("../helpers/responseHelper");

exports.getAllBanner = async (req, res) => {
  try {
    const banners = await bannerRepo.getAllBanner();
    return helper.success(res, banners, "Banners fetched successfully");
  } catch (error) {
    return helper.error(res, error.message);
  }
};

exports.getBannerById = async (req, res) => {
  try {
    const banner = await bannerRepo.getBannerById(req.params.id);
    if (!banner.length) return helper.notFound(res, "Banner not found");
    return helper.success(res, banner[0], "Banner fetched successfully");
  } catch (error) {
    return helper.error(res, error.message);
  }
};

exports.createBanner = async (req, res) => {
  try {
    await bannerRepo.createBanner(req.body);
    return helper.success(res, null, "Banner created successfully", 201);
  } catch (error) {
    return helper.error(res, error.message);
  }
};

exports.updateBanner = async (req, res) => {
  try {
    await bannerRepo.updateBanner(req.params.id, req.body);
    return helper.success(res, null, "Banner updated successfully");
  } catch (error) {
    return helper.error(res, error.message);
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    await bannerRepo.deleteBanner(req.params.id);
    return helper.success(res, null, "Banner deleted successfully");
  } catch (error) {
    return helper.error(res, error.message);
  }
};
