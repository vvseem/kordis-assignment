import XLSX from "xlsx";
import { parseData } from "../utils/index.js";
import fs from "fs";
import { join } from "path";

export const getSheetData = (req, res) => {

  fs.readFile(`newSheetsss.json`, (err, jsonData) => {
    if (err) {
      res.status(500).send('Error writing JSON data to file.');
    } else {
      res.status(200).send(JSON.parse(jsonData));
    }
  });
}

export const getAllSheetsList = (req, res) => {
  const directoryPath = "sheets";
  const fileList = []

  fs.readdir(directoryPath, (err, files) => {
    if (!err) {
      files.forEach(file => {
        console.log(file.replace(/\.[^/.]+$/, ''))
        fileList.push(file.replace(/\.[^/.]+$/, ''));
      });
      return res.status(200).json(fileList)
    } 

    return res.status(500).json({ error: 'Error' });
  });
}

export const uploadSheet = (req, res) => {
  const { data, range, fileName } = req.body;
  const jsonData = parseData(data, range);
  // console.log("jsosadasdasd", jsonData.data)
  fs.writeFile(`${fileName}.json`, JSON.stringify(jsonData), (err) => {
    if (err) {
      res.status(500).send('Error writing JSON data to file.');
    } else {
      res.send('JSON data written to file.');
    }
  });
}
