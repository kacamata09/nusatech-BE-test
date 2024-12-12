const db = require('../config/database');

exports.getAllBanner = async () => {
  return await db.query("SELECT * FROM banners");
};

exports.getBannerById = async (id) => {
  return await db.query("SELECT * FROM banners WHERE id = ?", [id]);
};

exports.createBanner = async (bannerData) => {
  const { bannerName, bannerImage, description } = bannerData;
  return await db.query(
    "INSERT INTO banners (banner_name, banner_image, description) VALUES (?, ?, ?)",
    [bannerName, bannerImage, description]
  );
};

exports.updateBanner = async (id, bannerData) => {
  const { bannerName, bannerImage, description } = bannerData;
  return await db.query(
    "UPDATE banners SET banner_name = ?, banner_image = ?, description = ? WHERE id = ?",
    [bannerName, bannerImage, description, id]
  );
};

exports.deleteBanner = async (id) => {
  return await db.query("DELETE FROM banners WHERE id = ?", [id]);
};
