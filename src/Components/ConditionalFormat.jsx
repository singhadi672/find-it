// Conditional formatting Component - component to provide formatting options and generate query based on selection

import { useState, useRef } from "react";
import { useData } from "../Context/dataContext";
import { colors, formatOptions, modifiers } from "../Util";
import Datalist from "./DataList";

export default function ConditionalFormatter() {
  const [field, setField] = useState({ field: "", isNumeric: "" });
  const { query, setQuery, setQueryParams, queryParams } = useData();
  const inputRef = useRef(null);
  const [accentColor, setAccentColor] = useState("green");

  // funtion to generate query for formatting
  function generateQuery(query) {
    if (query.isNumeric !== null) {
      if (!query.isNumeric && inputRef.current.value) {
        setQueryParams({
          ...queryParams,
          type: "VALUE_IS",
          payload: {
            value: inputRef.current.value.toLowerCase(),
            column: query.primaryField,
            color: accentColor,
          },
        });
      } else {
        setQueryParams({
          ...queryParams,
          type: "CLASSIFICATION",
          payload: {
            modifier: query.modifier,
            value: inputRef.current.value,
            column: query.primaryField,
            color: accentColor,
          },
        });
      }
    }
  }
  return (
    <div className="formatter">
      <h3 className="formatter__heading">Conditional format rules</h3>
      <section className="formatter__conditions">
        <h4>Format rules</h4>
        <div className="formatter__condition">
          <h5 className="formatter__conditions__heading-alt">
            Format cells if...
          </h5>
          <Datalist
            options={formatOptions}
            field={field}
            setField={setField}
            query={query}
            setQuery={setQuery}
          />
        </div>
        {field.isNumeric === true && (
          <div className="formatter__condition">
            <h5 className="formatter__conditions__heading-alt">
              add relation...
            </h5>
            <Datalist
              options={modifiers}
              secondary={true}
              query={query}
              setQuery={setQuery}
            />
            <div className="formatter__condition__value">
              <h5>add value...</h5>
              <input type="number" name="" id="" ref={inputRef} />
            </div>
          </div>
        )}
        {field.isNumeric === false && (
          <div className="formatter__condition">
            <div className="formatter__condition__value">
              <h5>add value...</h5>
              <input type="text" name="" id="" ref={inputRef} />
            </div>
          </div>
        )}
      </section>
      <section className="formatter__color">
        <h4>Formatting color</h4>
        <div className="formatter__color__section">
          {colors.map((color) => (
            <div
              className={`formatter__color__section-color ${color}`}
              style={{
                border:
                  accentColor === color
                    ? "0.2rem solid var(--accent-main)"
                    : "none",
              }}
              onClick={() => setAccentColor(color)}
            ></div>
          ))}
        </div>
      </section>
      <button
        className="formatter__button"
        onClick={() => generateQuery(query)}
      >
        Format cells
      </button>
    </div>
  );
}
