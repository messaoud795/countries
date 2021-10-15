import axios from "axios";

export async function getCountries() {
  try {
    const { data } = await axios.get("https://restcountries.com/v2/all");
    console.log(data);
    return await data.slice(0, 21).map((el) => ({
      name: el.name,
      area: el.area,
      region: el.region,
      latlng: el.latlng.join(" - "),
      numericCode: el.numericCode,
    }));
  } catch (error) {
    console.log(error);
  }
}
export default getCountries;

export const countriesData = [
  {
    id: 0,
    name: "Afghanistan",
    area: 652230,
    region: "Asia",
    latlng: "33 - 65",
    numericCode: "004",
  },
  {
    id: 1,
    name: "Åland Islands",
    area: 1580,
    region: "Europe",
    latlng: "60.116667 - 19.9",
    numericCode: "248",
  },
  {
    id: 2,
    name: "Albania",
    area: 28748,
    region: "Europe",
    latlng: "41 - 20",
    numericCode: "008",
  },
  {
    id: 3,
    name: "Algeria",
    area: 2381741,
    region: "Africa",
    latlng: "28 - 3",
    numericCode: "012",
  },
  {
    id: 4,
    name: "American Samoa",
    area: 199,
    region: "Oceania",
    latlng: "-14.33333333 - -170",
    numericCode: "016",
  },
  {
    id: 5,
    name: "Andorra",
    area: 468,
    region: "Europe",
    latlng: "42.5 - 1.5",
    numericCode: "020",
  },
  {
    id: 6,
    name: "Angola",
    area: 1246700,
    region: "Africa",
    latlng: "-12.5 - 18.5",
    numericCode: "024",
  },
  {
    id: 7,

    name: "Anguilla",
    area: 91,
    region: "Americas",
    latlng: "18.25 - -63.16666666",
    numericCode: "660",
  },
  {
    id: 8,

    name: "Antarctica",
    area: 14000000,
    region: "Polar",
    latlng: "-74.65 - 4.48",
    numericCode: "010",
  },
  {
    id: 9,

    name: "Antigua and Barbuda",
    area: 442,
    region: "Americas",
    latlng: "17.05 - -61.8",
    numericCode: "028",
  },
  {
    id: 10,

    name: "Argentina",
    area: 2780400,
    region: "Americas",
    latlng: "-34 - -64",
    numericCode: "032",
  },
  {
    id: 11,

    name: "Armenia",
    area: 29743,
    region: "Asia",
    latlng: "40 - 45",
    numericCode: "051",
  },
  {
    id: 12,

    name: "Aruba",
    area: 180,
    region: "Americas",
    latlng: "12.5 - -69.96666666",
    numericCode: "533",
  },
  {
    id: 13,

    name: "Australia",
    area: 7692024,
    region: "Oceania",
    latlng: "-27 - 133",
    numericCode: "036",
  },
  {
    id: 14,
    name: "Austria",
    area: 83871,
    region: "Europe",
    latlng: "47.33333333 - 13.33333333",
    numericCode: "040",
  },
  {
    id: 15,

    name: "Azerbaijan",
    area: 86600,
    region: "Asia",
    latlng: "40.5 - 47.5",
    numericCode: "031",
  },
  {
    id: 16,

    name: "Bahamas",
    area: 13943,
    region: "Americas",
    latlng: "24.25 - -76",
    numericCode: "044",
  },
  {
    id: 17,
    name: "Bahrain",
    area: 765,
    region: "Asia",
    latlng: "26 - 50.55",
    numericCode: "048",
  },
  {
    id: 18,
    name: "Bangladesh",
    area: 147570,
    region: "Asia",
    latlng: "24 - 90",
    numericCode: "050",
  },
  {
    id: 19,
    name: "Barbados",
    area: 430,
    region: "Americas",
    latlng: "13.16666666 - -59.53333333",
    numericCode: "052",
  },
  {
    id: 20,
    name: "Belarus",
    area: 207600,
    region: "Europe",
    latlng: "53 - 28",
    numericCode: "112",
  },
];

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
