const express = require("express");
const serviceController = require("../controllers/serviceController");
const authMiddleware = require('../middlewares/auth');


const router = express.Router();
router.get("/", authMiddleware, serviceController.getAllServices);
router.get("/:id", authMiddleware, serviceController.getServiceById);
router.post("/", authMiddleware, serviceController.createService);
router.put("/:id", authMiddleware, serviceController.updateService);
router.delete("/:id", authMiddleware, serviceController.deleteService);

module.exports = router;
