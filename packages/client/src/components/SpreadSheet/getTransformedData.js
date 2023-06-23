const getTransformedSubRows = (rows, subRowsData) => {
  const rootKeys = Object.keys(subRowsData);

  return rootKeys.map((key) => {
    const item = rows[key];
    const subRowData = item
      ? getTransformedSubRows(rows, subRowsData[key])
      : undefined;

    return {
      ...item,
      subRows: subRowData.length ? subRowData : undefined,
    };
  });
};

const getTransformedData = (rows, tableMeta) => {
  const rootKeys = Object.keys(tableMeta.root);

  return rootKeys.map((key) => {
    const item = tableMeta.data[key];
    const subRows = getTransformedSubRows(rows, tableMeta.root[key]);

    return {
      [item.displayName]: { ...item, subRows },
    };
  });
};

export default getTransformedData;
