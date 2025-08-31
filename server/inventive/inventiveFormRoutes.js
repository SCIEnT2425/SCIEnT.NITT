const express = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
// Load service account credentials
//const credentials = JSON.parse(process.env.GOOGLE_CREDS);
//console.log(process.env.CLIENT_EMAIL);
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Your Google Sheet ID
const SPREADSHEET_ID = "1VSNr5noRbT4gczPtKP3Abc67yLId1lrW8tmqKjXba5s";

router.post("/submit", async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const { roll, branch, year, name, age, dob, mobile, description } = req.body;

    // Validate required fields
    if (!roll || !branch || !year || !name || !age || !dob || !mobile || !description) {
      return res.status(400).send("All fields are required");
    }

    // Append row with all eight fields
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:H",
      valueInputOption: "RAW",
      requestBody: {
        values: [[roll, branch, year, name, age, dob, mobile, description]],
      },
    });

    res.status(200).send("Success! Data added to sheet.");
  } catch (error) {
    console.error("Error adding to sheet:", error);
    res.status(500).send(`Error adding to sheet: ${error.message}`);
  }
});

module.exports = router;