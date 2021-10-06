const mongoose = require("mongoose");
const countrySchema = new mongoose.Schema({
  // flag: { type: String },
  // name: { type: String, required: true, unique: true },
  // capital: { type: String, required: true },
  // population: { type: Number, required: true },
  // currency: { type: String, required: true },
  // timeZone: { type: String, required: true },
  // addColumns: [{ fieldName: String, fieldValue: String }],
  data: { type: Object },
});

module.exports = mongoose.model("Country", countrySchema);

// name, capital, population, currency, timeZone;
