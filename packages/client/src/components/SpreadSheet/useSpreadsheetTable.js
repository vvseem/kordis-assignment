import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";

const EditableInput = ({ table, column, row, getValue }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const disabled = row.original[column.id].includes("(");

  useEffect(() => setValue(initialValue), [initialValue]);

  const onBlur = () => table.options.meta?.updateData(row, column, value);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      readOnly={disabled}
      disabled={disabled}
      style={{
        border: "none",
        borderRadius: 5,
        padding: "2px",
        color: "#333",
        fontWeight: disabled ? 900 : 500,
        outline: "none",
        textAlign: "center",
        backgroundColor: disabled ? "lightgray" : "white",
      }}
    />
  );
};

const defaultColumn = {
  cell: ({ getValue, row, column, table }) => (
    <EditableInput
      table={table}
      column={column}
      row={row}
      getValue={getValue}
    />
  ),
};

export function useSpreadsheetTable(data, columns, setTableMeta) {
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getSubRows: (rows) => rows.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta: {
      updateData: (row, column, value) => {
        setTableMeta((prevTableMeta) => {
          return {
            ...prevTableMeta,
            data: {
              ...prevTableMeta.data,
              [row.original.index]: {
                ...prevTableMeta.data[row.original.index],
                [column.id]: value,
              },
            },
          };
        });
      },
    },
    debugTable: true,
  });

  return { table, flexRender };
}
