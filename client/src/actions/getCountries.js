import axios from "axios";

export async function getCountries() {
  try {
    const { data } = await axios.get("https://restcountries.eu/rest/v2/all");
    return await data.slice(0, 21).map((el) => ({
      flag: el.flag,
      name: el.name,
      capital: el.capital,
      currency: el.currencies[0].name,
      timeZone: el.timezones[0],
      population: el.population,
    }));
  } catch (error) {}
}
export default getCountries;
