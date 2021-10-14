import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { rowCreator, columnsData } from "../Util";

const DataContext = createContext();

// env variables for public api to fetch data

const DATA_URL = process.env.REACT_APP_DATA_URL;
const DATA_HOSTNAME = process.env.REACT_APP_DATA_HOST_NAME;
const API_KEY = process.env.REACT_APP_DATA_API_KEY;

// data provider context

export default function DataProvider({ children }) {
  const [table, setTable] = useState({ data: [], columns: [] });
  const [query, setQuery] = useState({
    primaryField: null,
    isNumeric: null,
    modifier: null,
  });
  const [queryParams, setQueryParams] = useState({ type: null, payload: null });
  const [toggleDirections, setToggleDirections] = useState(true);
  const [loader, setLoader] = useState(true);

  // get data from the api and based on response
  // set the data for table based on result
  // toggle the loader
  useEffect(() => {
    (async function () {
      console.log("here");
      try {
        const { data } = await axios.request({
          method: "GET",
          url: DATA_URL,
          headers: {
            "x-rapidapi-host": DATA_HOSTNAME,
            "x-rapidapi-key": API_KEY,
          },
        });

        const columns = Object.keys(data[0])
          .map((item) =>
            columnsData.includes(item)
              ? { Header: item, accessor: item, class: "f" }
              : null
          )
          .filter((item) => item !== null);

        const rows = rowCreator(columnsData, data, 15, 2);
        setTable({ ...table, data: rows, columns: columns });
        setLoader(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // funtion to change the color of the cells based on the query parameters created

  function getColor(cell, queryParams) {
    switch (queryParams.type) {
      case "VALUE_IS":
        if (
          queryParams.payload &&
          cell.column.Header.toLowerCase() ===
            queryParams.payload.column.toLowerCase()
        ) {
          if (cell.value.toLowerCase() === queryParams.payload.value) {
            return queryParams.payload.color;
          }
        }
        return;
      case "CLASSIFICATION":
        switch (queryParams.payload.modifier) {
          case "gt":
            if (
              queryParams.payload &&
              cell.column.Header.toLowerCase() ===
                queryParams.payload.column.toLowerCase()
            ) {
              if (cell.value > parseInt(queryParams.payload.value)) {
                return queryParams.payload.color;
              }
            }
            return;
          case "lt":
            if (
              queryParams.payload &&
              cell.column.Header.toLowerCase() ===
                queryParams.payload.column.toLowerCase()
            ) {
              if (cell.value < parseInt(queryParams.payload.value)) {
                return queryParams.payload.color;
              }
            }
            return;
          case "eq":
            if (
              queryParams.payload &&
              cell.column.Header.toLowerCase() ===
                queryParams.payload.column.toLowerCase()
            ) {
              if (cell.value === parseInt(queryParams.payload.value)) {
                return queryParams.payload.color;
              }
            }
            return;
          default:
            return;
        }
      default:
        return;
    }
  }
  return (
    <DataContext.Provider
      value={{
        table,
        setTable,
        query,
        setQuery,
        getColor,
        queryParams,
        setQueryParams,
        toggleDirections,
        setToggleDirections,
        loader,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
