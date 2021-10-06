const { db } = require("../models/CountryModel");
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

//create a new Country
// exports.create_country = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { name, capital, population, currency, timeZone } = req.body;

//     const newCountry = new Country({
//       name,
//       capital,
//       population,
//       currency,
//       timeZone,
//     });
//     await newCountry.save();
//     res.status(200).send({ msg: "Country created successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ msg: "Server error" });
//   }
// };

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

//update a Country record
// exports.update_country = (req, res) => {
//   Country.findByIdAndUpdate(
//     req.body._id,
//     { ...req.body },
//     { new: true, runValidators: true },
//     (err, data) => {
//       if (err) res.status(500).send({ msg: "Server error" });
//       else {
//         res.status(200).send({ msg: "Country updated successfully" });
//       }
//     }
//   );
// };

exports.update_country = async (req, res) => {
  let newData = req.body;
  delete newData.id;
  console.log(newData);
  Country.findByIdAndUpdate(
    req.body.id,
    { data: delete req.body.id },
    { new: true, runValidators: true },
    (err, data) => {
      if (err) res.status(500).send({ msg: "Server error" });
      else {
        res.status(200).send({ msg: "Country updated successfully", data });
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
