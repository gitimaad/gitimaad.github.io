# Terminal Login with Google Sheets Integration

## Overview
This project provides a terminal-style login interface that collects user names and emails and stores them in a Google Sheets spreadsheet.

## Setup Instructions

### 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com/) and create a new spreadsheet
2. Rename the sheet to something meaningful (e.g., "Terminal Login Data")

### 2. Set up Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any code in the script editor and paste the code from the `google-sheets-script.txt` file
3. Save the project with a name (e.g., "Terminal Login Script")
4. Click on **Deploy > New deployment**
5. Select type: **Web app**
6. Set the following options:
   - Execute as: **Me**
   - Who has access: **Anyone** (or "Anyone, even anonymous" in older versions)
7. Click **Deploy** and authorize the application when prompted
8. Copy the Web App URL that is displayed after deployment

### 3. Update the JavaScript File
1. Open the `script.js` file
2. Replace `YOUR_GOOGLE_SCRIPT_WEB_APP_URL` with the URL you copied from the Apps Script deployment

## How It Works
1. When a user submits their name and email in the terminal interface, the data is sent to your Google Apps Script web app
2. The script processes the data and adds it as a new row in your Google Sheet
3. The terminal interface continues with its animation and redirects to the portfolio page

## Troubleshooting
- If data isn't being saved to your Google Sheet, check the browser console for errors
- Make sure your Google Apps Script is properly deployed and accessible
- Verify that you've replaced the placeholder URL in the script.js file

## Security Note
This implementation uses a public web app URL. While convenient for development, in a production environment you might want to implement additional security measures like API keys or OAuth authentication.