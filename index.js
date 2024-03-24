/* const res = x("https://pl.indeed.com/jobs?q=junior+javascript&l=&vjk=09cb655136ebc397", 'title')
    .write('results.json'); */

import puppeteer from 'puppeteer'

parsePage("https://www.pracuj.pl/praca/junior%20javascript;kw");

async function parsePage(url) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url, { 
        waitUntil: "domcontentloaded"
    });
    const popupCloseSelector = '.popup_p1c6glb0';
    const cookieButtonSelector = '[data-test="button-submitCookie"]';
    const positionedOfferSelector = '[data-test="positioned-offer"]';
    await page.click(popupCloseSelector);
    await page.click(cookieButtonSelector);

    const defaultOffers = await page.evaluate(async () => {
        return Array.from(document.querySelectorAll('[data-test="link-offer"]'))
        .map(link => link.getAttribute('href'));
    });

    console.log(defaultOffers);
}

