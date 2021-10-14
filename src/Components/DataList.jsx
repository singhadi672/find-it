// Data List Component - component to build dropdown menu

import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Datalist({
  options,
  field,
  setField,
  query,
  setQuery,
  secondary,
}) {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("Select...");

  // function to set the query params as user selects the options from dropdown menu
  function setDatalist(option) {
    setValue(option.field);
    setToggle((prev) => !prev);
    if (option.hasOwnProperty("isNumeric")) {
      setField({ ...field, field: option.field, isNumeric: option.isNumeric });
    }
    if (secondary && secondary === true) {
      setQuery({ ...query, modifier: option.id });
    } else {
      setQuery({
        ...query,
        primaryField: option.id,
        isNumeric: option.isNumeric,
        value: null,
        modifier: null,
      });
    }
  }
  return (
    <div className="formatter__datalist">
      <div className="formatter__datalist__head">
        <input
          type="text"
          name="options"
          id="options"
          disabled
          value={value}
          style={{ backgroundColor: "white" }}
        />
        <button onClick={() => setToggle((prev) => !prev)}>
          {toggle ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} />
          )}
        </button>
      </div>
      {toggle && (
        <div className="formatter__datalist__body">
          {options.map((option) => (
            <div
              id={option.id}
              className="formatter__datalist__body__option"
              onClick={() => setDatalist(option)}
            >
              {option.field}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
