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
  } catch (error) {
    console.log(error);
  }
}
export default getCountries;

// let initialHeaders = [
//   { id: "name", label: "name" },
//   { id: "capital", label: "capital" },
//   { id: "population", label: "population" },
//   { id: "currency", label: "currency" },
//   { id: "timeZone", label: "timeZone" },
// ];

export const data = [
  {
    name: "Åland Islands",
    capital: "Mariehamn",
    population: 28876,
    currency: "Euro",
    timeZone: "UTC+02:00",
  },
  {
    name: "Albania",
    capital: "Tirana",
    population: 2886026,
    currency: "Albanian lek",
    timeZone: "UTC+01:00",
  },
  {
    name: "Algeria",
    capital: "Algiers",
    population: 40400000,
    currency: "Algerian dinar",
    timeZone: "UTC+01:00",
  },
  {
    name: "American Samoa",
    capital: "Pago Pago",
    population: 57100,
    currency: "United State Dollar",
    timeZone: "UTC-11:00",
  },
  {
    name: "Andorra",
    capital: "Andorra la Vella",
    population: 78014,
    currency: "Euro",
    timeZone: "UTC+01:00",
  },
  {
    name: "Angola",
    capital: "Luanda",
    population: 25868000,
    currency: "Angolan kwanza",
    timeZone: "UTC+01:00",
  },
  {
    name: "Anguilla",
    capital: "The Valley",
    population: 13452,
    currency: "East Caribbean dollar",
    timeZone: "UTC-04:00",
  },
  {
    name: "Antigua and Barbuda",
    capital: "Saint John's",
    population: 86295,
    currency: "East Caribbean dollar",
    timeZone: "UTC-04:00",
  },
  {
    name: "Argentina",
    capital: "Buenos Aires",
    population: 43590400,
    currency: "Argentine peso",
    timeZone: "UTC-03:00",
  },
  {
    name: "Armenia",
    capital: "Yerevan",
    population: 2994400,
    currency: "Armenian dram",
    timeZone: "UTC+04:00",
  },
  {
    name: "Aruba",
    capital: "Oranjestad",
    population: 107394,
    currency: "Aruban florin",
    timeZone: "UTC-04:00",
  },
  {
    name: "Australia",
    capital: "Canberra",
    population: 24117360,
    currency: "Australian dollar",
    timeZone: "UTC+05:00",
  },
  {
    name: "Austria",
    capital: "Vienna",
    population: 8725931,
    currency: "Euro",
    timeZone: "UTC+01:00",
  },
  {
    name: "Azerbaijan",
    capital: "Baku",
    population: 9730500,
    currency: "Azerbaijani manat",
    timeZone: "UTC+04:00",
  },
  {
    name: "Bahamas",
    capital: "Nassau",
    population: 378040,
    currency: "Bahamian dollar",
    timeZone: "UTC-05:00",
  },
  {
    name: "Bahrain",
    capital: "Manama",
    population: 1404900,
    currency: "Bahraini dinar",
    timeZone: "UTC+03:00",
  },
  {
    name: "Bangladesh",
    capital: "Dhaka",
    population: 161006790,
    currency: "Bangladeshi taka",
    timeZone: "UTC+06:00",
  },
  {
    name: "Barbados",
    capital: "Bridgetown",
    population: 285000,
    currency: "Barbadian dollar",
    timeZone: "UTC-04:00",
  },
  {
    name: "Belarus",
    capital: "Minsk",
    population: 9498700,
    currency: "New Belarusian ruble",
    timeZone: "UTC+03:00",
  },
  {
    name: "France",
    capital: "paris",
    population: 60000000,
    currency: "Euro",
    timeZone: "UTC+02:00",
  },
  {
    name: "Spain",
    capital: "Madrid",
    population: 80000000,
    currency: "Euro",
    timeZone: "UTC+02:00",
  },
  {
    name: "Egypt",
    capital: "Cairo",
    population: 100000000,
    currency: "Pound",
    timeZone: "UTC+02:00",
  },
];
