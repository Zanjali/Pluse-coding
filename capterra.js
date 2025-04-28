const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const { delay } = require('./utils');

puppeteer.use(StealthPlugin());

async function scrapeCapterra(companyName, startDate, endDate) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.capterra.com/', { waitUntil: 'networkidle2' });
    
    await delay(2000);
    await page.type('input[name="q"]', companyName, { delay: 100 });
    await delay(2000);
    await page.keyboard.press('Enter');
    await delay(5000);

    const productCards = await page.$$('[data-testid="search-product-card"]');
    if (productCards.length === 0) {
      console.log('Invalid Company Name or no product found.');
      await browser.close();
      return;
    }

    const firstCard = productCards[0];
    const viewAllReviewsLink = await firstCard.$('a[href*="/reviews/"]');
    if (!viewAllReviewsLink) {
      console.log('No reviews available for this product.');
      await browser.close();
      return;
    }

    await viewAllReviewsLink.click();
    await delay(5000);

    let clickCount = 0;
    const maxClicks = 10;
    while (clickCount < maxClicks) {
      const showMoreButton = await page.$('button[data-testid="show-more-reviews"]');
      if (!showMoreButton) break;
      
      await showMoreButton.click();
      await delay(1500);
      clickCount++;
    }

    const reviews = await page.evaluate(() => {
      const reviewElements = document.querySelectorAll('[data-testid="review"]');
      return Array.from(reviewElements).map(element => {
        const reviewerName = element.querySelector('[data-testid="reviewer-full-name"]')?.innerText.trim() || 'Unknown';
        const overallContent = element.querySelector('[data-testid="overall-content"]')?.innerText.trim() || 'No content';
        const reviewDateText = element.querySelector('[data-testid="review-written-on"]')?.innerText.trim() || 'Unknown';
        
        const reviewDate = new Date(reviewDateText);
        return { reviewerName, overallContent, reviewDate };
      });
    });

    const filteredReviews = reviews.filter(review => review.reviewDate >= new Date(startDate) && review.reviewDate <= new Date(endDate));

    if (filteredReviews.length === 0) {
      console.log('No reviews found in the given date range.');
    } else {
      fs.writeFileSync('data.json', JSON.stringify(filteredReviews, null, 2));
      console.log('Reviews have been saved to data.json');
    }

    await browser.close();
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

module.exports = { scrapeCapterra };
