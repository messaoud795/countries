const express = require("express");
const {
  countries_list,
  create_country,
  update_country,
  delete_country,
} = require("../controllers/countryController");

const router = express.Router();

//get all countrys
router.get("/", countries_list);

//create a new country
router.post("/add", create_country);

//update an country
router.patch("/edit", update_country);

//delete an country
router.delete("/delete/:id", delete_country);

module.exports = router;
