import axios from "axios";

export async function getCountries() {
  try {
    const { data } = await axios.get("https://restcountries.eu/rest/v2/all");
    var countries = await data.slice(0, 21).map((el) => {
      var flag = el.flag;
      var capital = el.capital;
      var name = el.name;
      var currency = el.currencies[0].name;
      var timeZone = el.timezones[0];
      var population = el.population;
      return {
        flag,
        name,
        capital,
        currency,
        timeZone,
        population,
      };
    });
    return countries;
  } catch (error) {}
}
export default getCountries;
