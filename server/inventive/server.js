const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const fs = require("fs");
const cors = require("cors"); // Add CORS package
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, ".")));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Load service account credentials
const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Your Google Sheet ID
const SPREADSHEET_ID = "1VSNr5noRbT4gczPtKP3Abc67yLId1lrW8tmqKjXba5s";

app.post("/inventiveForm/submit", async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const { roll, branch, year, name, age, dob, mobile, description } = req.body;

    // Append row with all eight fields
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:H", // Updated range to match 8 columns
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

app.listen(3000, () => console.log("Server running on http://localhost:3000"));