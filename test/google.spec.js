import "@babel/polyfill";
import puppeteer from "puppeteer";

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

describe("Google page tests", () => {
  test.each(["Почта", "Картинки"])(
    "test content on Google page",
    async text => {
      await page.goto("https://www.google.com/");
      const result = await page.evaluate(
        () =>
          document.querySelector(
            "#gbw > div > div > div.gb_9d.gb_i.gb_yg.gb_pg"
          ).textContent
      );
      expect(result).toContain(text);
      //await page.close();
    },
    60000
  );
});