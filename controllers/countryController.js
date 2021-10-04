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
  console.log(req.body);
  try {
    const { name, capital, population, currency, timeZone } = req.body;
    const newCountry = new Country({
      name,
      capital,
      population,
      currency,
      timeZone,
    });
    await newCountry.save();
    res.status(200).send({ msg: "Country created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

//update a Country record
exports.update_country = (req, res) => {
  Country.findByIdAndUpdate(
    req.body._id,
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

//update a Country field
exports.update_country_field = (req, res) => {
  // Country.findById(req.body._id, "addColumns ", (err, data) => {
  //   data.filter(column=>)
  // });
  const { fieldName, fieldValue } = req.body;
  Country.findByIdAndUpdate(
    req.body._id,
    { $push: { addColumns: { fieldName, fieldValue } } },
    { new: true, runValidators: true },
    (err, data) => {
      if (err) res.status(500).send({ msg: "Server error" });
      else {
        res.status(200).send({ msg: "Country updated successfully" });
      }
    }
  );
};

//delete a Country
exports.delete_country = (req, res) => {
  Country.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send({ msg: "error" });
    else res.status(200).send({ msg: " Country deleted successfully " });
  });
};
