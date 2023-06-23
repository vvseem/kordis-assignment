import React from "react";
import "../SpreadSheet/index.css";

const SpreadsheetList = () => {
  const data = [{ name: "Spreadsheet" }, { name: "Spreadsheet2" }];

  return (
    <div className="spreadsheet-list">
      {data.map((current, index) => {
        return (
          <div key={index} className="spreadsheet-list-item">
            <img
              className="spreadsheet-list-img"
              src={"../../spreadsheet-image.png"}
            />
            <h4>{current.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default SpreadsheetList;
