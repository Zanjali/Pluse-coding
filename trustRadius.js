const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const { delay } = require('./utils');

puppeteer.use(StealthPlugin());

async function scrapeTrustRadius(startDate, endDate, company) {
  const name = company.trim().split(" ").join("-");  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let f = 0;  
  let reviews = [];
  let hasMorePages = true;

  while (hasMorePages) {
    const url = `https://www.trustradius.com/products/${name}/reviews?f=${f}#reviews`;

    await page.goto(url, { waitUntil: 'networkidle2' });
    await delay(2000);

    const newReviews = await page.evaluate(() => {
      const reviews = document.querySelectorAll('article.ReviewNew_article__IlReR');
      if (reviews.length === 0) return [];

      const reviewData = [];
      reviews.forEach(review => {
        const title = review.querySelector('h4.Header_heading__v0wt8 a')?.innerText.trim() || '';
        const rating = review.querySelector('div._sr-only_12icv_21')?.innerText.trim() || '';
        const date = review.querySelector('div.Header_date__bW46N')?.innerText.trim() || '';
        const body = review.querySelector('div.ReviewAnswer_longForm__wwyHy')?.innerText.trim() || '';
        const reviewerName = review.querySelector('div._text_1ol12_29 a.Byline_name__csm_H')?.innerText.trim() || '';

        reviewData.push({ title, rating, date, body, reviewerName });
      });

      console.log('Extracted Reviews:', reviewData);  
      return reviewData;
    });

    if (newReviews.length === 0 && f === 0) {
      console.log('Invalid company name or no reviews found.');
      await browser.close();
      return;
    }

    reviews = reviews.concat(newReviews);
    await delay(2000);

    const nextButton = await page.$('a.page-link[aria-label="Next"]');
    if (nextButton) {
        // Move to the next page
      f += 25;  
    } else {
      hasMorePages = false; 
    }
  }

  // Filter review bt dates
  const filteredReviews = reviews.filter(review => {
    const reviewDate = new Date(review.date);
    return reviewDate >= new Date(startDate) && reviewDate <= new Date(endDate);
  });

  if (filteredReviews.length === 0) {
    console.log('No reviews found in the given date range.');
  } else {
    fs.writeFileSync('data.json', JSON.stringify(filteredReviews, null, 2));
    console.log('Reviews have been saved to data.json');
  }

  await browser.close();
}

module.exports = { scrapeTrustRadius };
