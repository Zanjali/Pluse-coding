const readline = require('readline');
const { scrapeTrustRadius } = require('./trustRadius');
const { scrapeCapterra } = require('./capterra');
const { validateAndParseDates } = require('./utils');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestions() {
  try {
    const platform = await new Promise((resolve) => {
      rl.question('Choose the platform (1 for Capterra, 2 for TrustRadius): ', resolve);
    });

    const company = await new Promise((resolve) => {
      rl.question('Enter the company name: ', resolve);
    });

    const startDateStr = await new Promise((resolve) => {
      rl.question('Enter the start date (yyyy/mm/dd): ', resolve);
    });

    const endDateStr = await new Promise((resolve) => {
      rl.question('Enter the end date (yyyy/mm/dd): ', resolve);
    });

    const { isValid, startDate, endDate, message } = validateAndParseDates(startDateStr, endDateStr);

    if (!isValid) {
      console.log(message);
      rl.close();
      return;
    }

    if (platform === '1') {
      await scrapeCapterra(company, startDate, endDate);
    } else if (platform === '2') {
      await scrapeTrustRadius(startDate, endDate, company);
    } else {
      console.log('Invalid platform selection.');
    }

    rl.close();
  } catch (error) {
    console.error('Error during execution:', error);
    rl.close();
  }
}

askQuestions();
