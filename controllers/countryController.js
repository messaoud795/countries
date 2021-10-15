const Country = require("../models/CountryModel");

// get list of all Countrys.
exports.countries_list = (req, res) => {
  Country.find({}, (err, data) => {
    for (let i in data) {
      data[i] = { _id: data[i]._id, ...data[i].data };
    }

    if (err) res.status(500).send(err);
    else res.send(data);
  });
};

exports.create_country = async (req, res) => {
  try {
    //check if the name already exists
    let data = await Country.find({}, "data");
    let nameFound = await data.filter((el) => el.name === req.body.name)[0];
    if (nameFound) res.status(400).send({ msg: "Country name already exists" });
    //create and save the new country instance
    const newCountry = new Country({
      data: req.body,
    });
    await newCountry.save({ data: req.body });
    res.status(200).send({ msg: "Country created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

exports.update_country = async (req, res) => {
  try {
    let id = req.body.id;
    delete req.body.id;
    Country.findByIdAndUpdate(
      id,
      { data: req.body },
      { new: true, runValidators: true },
      (err, data) => {
        if (err) res.status(500).send({ msg: "Server error" });
        else {
          res.status(200).send({ msg: "Country updated successfully", data });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

//delete a Country
exports.delete_country = (req, res) => {
  Country.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send({ msg: "error" });
    else res.status(200).send({ msg: " Country deleted successfully " });
  });
};
