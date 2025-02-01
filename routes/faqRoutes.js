const express = require("express");
const { createFAQ, getFAQs } = require("../controllers/faqController");

const router = express.Router();

router.post("/faqs", createFAQ);
router.get("/faqs", getFAQs);

module.exports = router;
