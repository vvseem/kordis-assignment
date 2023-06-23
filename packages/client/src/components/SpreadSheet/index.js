import React, { useEffect, useMemo, useState } from "react";
import getTransformedData from "./getTransformedData";
import { useSpreadsheetTable } from "./useSpreadsheetTable";
import getColumns from "./getColumns";
import "./index.css";

const SpreadSheetTable = ({ value }) => {
  const [tableMeta, setTableMeta] = useState(value);
  const [tableData, setTableData] = useState([]);

  console.log(value)

  const transformedData = useMemo(() => getTransformedData(tableMeta.data, tableMeta), [tableMeta]);
  const columns = useMemo(() => getColumns(tableMeta), [tableMeta]);

  useEffect(() => {
    if (Object.keys(tableMeta).length) {
      setTableData(
        transformedData?.reduce((acc, value) => {
          Object.keys(value).forEach((key) => {
            acc.push(value[key]);
          });
          return acc;
        }, [])
      );
    }
  }, [setTableData, transformedData]);

  const { table, flexRender } = useSpreadsheetTable(
    tableData,
    columns,
    setTableMeta
  );

  return (
    <>
      <div className="spreadsheet-text">Spreadsheet</div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SpreadSheetTable;
