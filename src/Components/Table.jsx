// Table component - the component to create table.

import { useTable } from "react-table";
import { useData } from "../Context/dataContext";

export default function Table() {
  const { table, getColor, queryParams } = useData();
  const tableInstance = useTable(table);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="table">
      <table {...getTableProps()} className="table__main">
        <thead className="table__head">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="table__head__headers"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table__row">
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={`table__body ${getColor(cell, queryParams)}`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
