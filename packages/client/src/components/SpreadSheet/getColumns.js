const getComputedCell = (row, column, originalRows, computedRows) => {
  computedRows[row] = {
    ...computedRows[row],
    [column]:
      eval(
        originalRows[row][column].replace(
          /'(.+?)'&'(.+?)'/g,
          (_, _row, _column) => {
            return (
              computedRows?.[_row]?.[_column] ??
              getComputedCell(_row, _column, originalRows, computedRows)
            );
          }
        )
      ) ?? 0,
  };

  return computedRows[row][column];
};

const ItemCell = ({ row, getCellValue }) => {
  return (
    <div
      style={{
        paddingLeft: `${row.depth * 2}rem`,
      }}
    >
      <>
        {row.getCanExpand() && (
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer" },
            }}
          >
            {row.getIsExpanded() ? "^" : ">"}
          </button>
        )}

        {getCellValue()}
      </>
    </div>
  );
};

const getColumns = (data) => {
  return data?.headers.map((header) => {
    return {
      accessorFn: (row) => {
        if (header !== "item")
          return getComputedCell(row.index, header, data.data, {}).toFixed(2);
        return row[header];
      },

      accessorKey: header,
      ...(header === "item" && {
        cell: ({ row, getValue }) => (
          <ItemCell row={row} getCellValue={getValue} />
        ),
      }),
      header: () => header.toUpperCase(),
      footer: (props) => props.column.id,
    };
  });
};

export default getColumns;
