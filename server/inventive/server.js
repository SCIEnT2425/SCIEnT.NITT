const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const fs = require("fs");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, ".")));


app.use(bodyParser.json());

// Load service account credentials
const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Your Google Sheet ID (from URL)
const SPREADSHEET_ID = "1VSNr5noRbT4gczPtKP3Abc67yLId1lrW8tmqKjXba5s";

app.post("/inventiveForm/submit", async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const { rollno,branch,year,name,age,dob,mobileNo,ideation } = req.body;

    // Append row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:C", // Adjust range & columns
      valueInputOption: "RAW",
      requestBody: {
        values: [[rollno,branch,year,name,age,dob,mobileNo,ideation]],
      },
    });

    res.status(200).send("Success! Data added to sheet.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding to sheet");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
