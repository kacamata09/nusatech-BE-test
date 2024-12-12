const bannerRepo = require("../repositories/bannerRepository");
const helper = require("../helpers/responseHelper");

exports.getAllBanner = async (req, res) => {
  try {
    const banners = await bannerRepo.getAllBanner();
    return helper.success(res, banners, "Sukses");
  } catch (error) {
    return helper.error(res, 'Internal server error');
  }
};

exports.getBannerById = async (req, res) => {
  try {
    const banner = await bannerRepo.getBannerById(req.params.id);
    if (!banner.length) return helper.notFound(res, "Banner not found");
    return helper.success(res, banner[0], "Sukses");
  } catch (error) {
    return helper.error(res, 'Internal server error');
  }
};

exports.createBanner = async (req, res) => {
  try {
    await bannerRepo.createBanner(req.body);
    return helper.success(res, null, "Sukses membuat banner", 201);
  } catch (error) {
    return helper.error(res, 'Internal server error');
  }
};

exports.updateBanner = async (req, res) => {
  try {
    await bannerRepo.updateBanner(req.params.id, req.body);
    return helper.success(res, null, "Sukses update");
  } catch (error) {
    return helper.error(res, 'Internal server error');
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    await bannerRepo.deleteBanner(req.params.id);
    return helper.success(res, null, "Sukses menghapus banner");
  } catch (error) {
    return helper.error(res, 'Internal server error');
  }
};
