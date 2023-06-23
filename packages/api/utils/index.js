import { readFile, utils, set_fs } from "xlsx";
import fs from "fs";
set_fs(fs);


export const parseData = () => {
  // =================
  const nSpaces = 3;
  const path = "sheets/super copy.xlsx";
  const range = utils.decode_range("A5:G91");
  
  // =================

  const getLabelAndLevel = (value, index) => ({
    label: value.trim(),
    level: value.search(/\S/) / nSpaces,
    index,
  });
  
  const getRowCells = (row, rowHeaders, columnHeaders) =>
    columnHeaders.reduce(
      (data, column, index) => ({
        ...data,
        [column]:
          row[index]?.f.replace(/([A-Z]+)([0-9]+)/g, (cell) => {
            const { r, c } = utils.decode_cell(cell);
            return `'${rowHeaders[r - range.s.r - 1].index}'&'${
              columnHeaders[c - 1]
            }'`;
          }) ?? "",
      }),
      {}
    );
  
  // =================
  
  const book = readFile(path, { dense: true });
  const sheet = book.Sheets[book.SheetNames[0]];
  const sheetData = sheet["!data"].slice(range.s.r, range.e.r + 1);

  const columnHeaders = sheetData
    .shift()
    .slice(1 + range.s.c, 1 + range.e.c)
    .map((header) => header.v);
  const rowHeaders = sheetData.map((row, index) => getLabelAndLevel(row[0].v, index));
  const rows = sheetData.reduce((rows, row, index) => {
    row = row.slice(range.s.c);
    const { label } = getLabelAndLevel(row.shift().v);
    rows[index] = { ...getRowCells(row, rowHeaders, columnHeaders), displayName: label , item: label, index: (index).toString() };
    return rows;
  }, {});

  const root = rowHeaders.reduce(
    (acc, { label, level }, index) => {
      if (level === 0) {
        acc.root[index] = {};
        acc.stack = [acc.root[index]];
      } else {
        acc.stack = acc.stack.slice(0, level);
        acc.stack[level - 1][index] = {};
        acc.stack[level] = acc.stack[level - 1][index];
      }
      acc.lastLevel = level;
      return acc;
    }, {
      root: {},
      lastLevel: 0,
      stack: [],
    }
  ).root;

  columnHeaders.unshift("item")

  return {
    headers: columnHeaders,
    data: rows,
    root
  };
}
