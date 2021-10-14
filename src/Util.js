import format_image from "./images/format_image.PNG";
import add_value from "./images/add_value.PNG";
import add_relation from "./images/add_relation.PNG";
import format_color_and_submit from "./images/format_color_and_submit.PNG";


// utility to create rows from the incoming data
export function rowCreator(columnsData, dataFromServer, limit, pivot) {
  const rows = [];
  for (let i = 0; i < limit; i++) {
    let dataRow = {};
    for (let j = 0; j < columnsData.length; j++) {
      dataRow[columnsData[j]] = dataFromServer[i + pivot][columnsData[j]];
    }
    rows.push(dataRow);
  }

  return rows;
}

// column data
export const columnsData = [
  "Country",
  "Continent",
  "TotalCases",
  "TotalRecovered",
  "ActiveCases",
];

// format options for datalist
export const formatOptions = [
  {
    field: "Country is",
    isNumeric: false,
    id: "country",
  },
  {
    field: "Contient is",
    isNumeric: false,
    id: "continent",
  },
  {
    field: "total Cases are",
    isNumeric: true,
    id: "totalCases",
  },
  {
    field: "total Recovered are",
    isNumeric: true,
    id: "totalRecovered",
  },
  {
    field: "Active Cases are",
    isNumeric: true,
    id: "activeCases",
  },
];

// modifiers for datalist

export const modifiers = [
  {
    field: "less than",
    id: "lt",
  },
  {
    field: "greater than",
    id: "gt",
  },
  {
    field: "equal to",
    id: "eq",
  },
];

export const colors = ["green", "blue", "red", "orange"];


// images for the user direction component
export const images = [
  {
    image: format_image,
    description: "select the column name from the list",
  },
  {
    image: add_value,
    description: "add approprite value you want to query",
  },
  {
    image: add_relation,
    description:
      "for columns having numeric values, add the relation to query the data",
  },
  {
    image: format_color_and_submit,
    description: "select your favorite color and click the format option!",
  },
];
