import express from "express";

export const router = express.Router();

import {
  getSheetData, getAllSheetsList, uploadSheet 
} from "../controllers/index.js";


router.get("/getData", getSheetData);
router.get("/listAllSheets", getAllSheetsList);
router.post("/uploadSheet", uploadSheet);

