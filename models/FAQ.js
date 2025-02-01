const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    type: Map,
    of: String, // Stores translated versions as key-value pairs
  },
});

FAQSchema.methods.getTranslatedText = function (lang) {
  return this.translations?.get(lang) || this.question;
};

module.exports = mongoose.model("FAQ", FAQSchema);
