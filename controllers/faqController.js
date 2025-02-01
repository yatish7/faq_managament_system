const FAQ = require("../models/FAQ");
const translateText = require("../utils/translate");
const redisClient = require("../config/redis");

exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Auto-translate into Hindi & Bengali
    const translations = {
      hi: await translateText(question, "hi"),
      bn: await translateText(question, "bn"),
    };

    const faq = new FAQ({ question, answer, translations });
    await faq.save();

    res.status(201).json({ message: "FAQ created", faq });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getFAQs = async (req, res) => {
  const lang = req.query.lang || "en";

  try {
    // Check Redis cache
    const cachedFAQs = await redisClient.get(`faqs_${lang}`);
    if (cachedFAQs) {
      return res.json(JSON.parse(cachedFAQs));
    }

    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => ({
      id: faq._id,
      question: lang === "en" ? faq.question : faq.translations?.get(lang) || faq.question,
      answer: faq.answer,
    }));

    // Store in Redis cache
    await redisClient.set(`faqs_${lang}`, JSON.stringify(translatedFAQs), "EX", 3600);

    res.json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
