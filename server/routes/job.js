const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const upload = require("../middleware/multer");
const jobController = require("../controllers/job");

router.post(
  "/",
  authenticateJWT,
  upload.single("jobImage"),
  jobController.create
);

router.get("/", jobController.readAll);

router.get("/:jobId", jobController.read);
router.put("/:jobId", authenticateJWT, upload.single("jobImage"), jobController.update);
router.delete("/:jobId", authenticateJWT, jobController.delete);

module.exports = router;
