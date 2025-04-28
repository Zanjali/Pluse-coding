
# Project Title

A brief description of what this project does and who it's for

A web scraper built with Puppeteer that extracts user reviews from Capterra and TrustRadius. Given a company name and a date range, it fetches the reviews and saves them into a structured data.json file.

## Features

Scrape reviews from Capterra and TrustRadius platforms

✅ Specify a custom date range for filtering reviews

✅ Save reviews automatically in data.json

✅ Simple CLI-based interaction

✅ Date validation to ensure input correctness

✅ Built with stealth mode to avoid bot detection



##  Prerequisites
Node.js (v12 or above)

Make sure Node.js is installed on your system. node -v

## How to Run the Project Clone the Repository
git clone https://github.com/Zanjali/pulse-scraper.git

cd pulse-scraper

Install Dependencies

npm install

Run the Scraper
## This project uses:
puppeteer

puppeteer-extra

puppeteer-extra-plugin-stealth

Built-in Node.js modules: fs, readline

If needed, install manually:

npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth

## Follow the on-screen prompts:
Select platform:

1 → Capterra

2 → TrustRadius

Enter company name: Example: Photoshop

Enter start date: Example: 2021-01-01

Enter end date: Example: 2021-07-01
##  Project Structure
├── index.js            # Main entry file (user input + platform selection)

├── scrapeCapterra.js   # Logic for scraping Capterra reviews

├── scrapeTrustRadius.js # Logic for scraping TrustRadius reviews

├── utils.js            # Utility functions (date validation, delay)

├── data.json           # Output file for reviews

├── package.json        # Project metadata and dependencies

└── README.md           # Project documentation

## Installation

Install my-project with npm

```bash
  npm install 
  cd pulse scraper
  npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
  git clone https:////github.com/Zanjali/Pluse-coding.git
```
    
## Utilities
validateAndParseDates(startDateStr, endDateStr) → Validates if dates are correct and in the right order (start date <= end date).

delay(ms) → Adds a controlled delay between page interactions to prevent detection.

## 🛠 Troubleshooting
Update puppeteer-extra-plugin-stealth to the latest version. → Try adding longer delays between page actions.

No reviews found → Check the company name spelling. → Ensure reviews exist for the selected date range.

Internet unstable → Ensure you have a strong and stable internet connection during scraping.

Wrong date format error → Enter dates strictly in yyyy-mm-dd format (e.g., 2025-04-28).
## 🤝 Contributing Pull requests are welcome!
If you have suggestions, ideas, or improvements, feel free to open an issue or PR.
## 📬 Contact Built with ❤️ by Anjali
 (https://github.com/Zanjali).
 
 For any questions, feel free to raise an Issue.
## 🚀 Happy Scraping!
Happy Coding guys!