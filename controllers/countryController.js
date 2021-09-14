const Country = require("../models/CountryModel");

// get list of all Countrys.
exports.countries_list = (req, res) => {
  Country.find({}, (err, data) => {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
};

//create a new Country
exports.create_country = async (req, res) => {
  try {
    const { name, capital, population, currency, timeZone, flag } = req.body;
    const newCountry = new Country({
      name,
      capital,
      population,
      currency,
      timeZone,
      flag,
    });
    await newCountry.save();
    res.status(200).send({ msg: "Country created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

//update an Country
exports.update_country = (req, res) => {
  Country.findByIdAndUpdate(
    req.body.id,
    { ...req.body },
    { new: true, runValidators: true },
    (err, data) => {
      if (err) res.status(500).send({ msg: "Server error" });
      else {
        res.status(200).send({ msg: "Country updated successfully" });
      }
    }
  );
};

//delete an Country
exports.delete_country = (req, res) => {
  Country.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send({ msg: "error" });
    else res.status(200).send({ msg: " Country deleted successfully " });
  });
};
