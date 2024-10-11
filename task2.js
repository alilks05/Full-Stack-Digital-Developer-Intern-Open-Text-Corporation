const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeProducts() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.microfocus.com/en-us/products?trial=true', {
            waitUntil: 'networkidle0', // Wait until the page has fully loaded
        });

        // Scrape the product details
        const products = await page.evaluate(() => {
            const productCards = document.querySelectorAll('.uk-card');
            let productList = [];

            productCards.forEach((card) => {
                const productName = card.querySelector('.title')?.innerText.trim() || "No title";
                const description = card.querySelector('.description')?.innerText.trim() || "No description";
                const trialLink = card.querySelector('.cta-section a')?.href || "No Free Trial";
                const supportLink = card.querySelector('.footer a')?.href || "No Support Link";

                // Extract the first letter of the product name for the "Starting Letter"
                const startingLetter = productName.charAt(0).toUpperCase();

                // Assuming there's no community link in the current structure
                const communityLink = "No Community Link"; 

                productList.push({
                    productName,
                    startingLetter,
                    description,
                    trialLink,
                    supportLink,
                    communityLink
                });
            });

            return productList;
        });

        // Save the result to products.json file
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

        console.log('Data successfully saved to products.json');
        await browser.close();
    } catch (error) {
        console.error(error);
    }
}

scrapeProducts();
