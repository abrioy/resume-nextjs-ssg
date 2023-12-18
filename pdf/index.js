#!/usr/bin/env node

import puppeteer from "puppeteer";

import serveHandler from "serve-handler";
import * as http from "http";
import { mkdirSync } from "fs";
import { publicInfo } from "../src/content/public-info.js";

const BUILD_PATH = "./out";
const OUTPUT_PATH = `${BUILD_PATH}/pdf`;
const PORT = 3001;
const APPLICATION_URL = `http://localhost:${PORT}`;

function serveApplication() {
  const server = http.createServer((request, response) => {
    return serveHandler(request, response, {
      public: BUILD_PATH,
    });
  });

  server.listen(PORT, () => {
    console.log(`Running at ${APPLICATION_URL}`);
  });

  return server;
}

async function makePDF(browser, url, pdfPath) {
  console.log(`Creating pdf of url ${url}`);
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  await page.pdf({
    displayHeaderFooter: false,
    printBackground: true,
    format: "A4",
    preferCSSPageSize: true,
    path: pdfPath,
    omitBackground: false,
  });
  await page.close();
}

mkdirSync(OUTPUT_PATH, { recursive: true });

const server = serveApplication();

const browser = await puppeteer.launch({
  headless: "new",
});

await makePDF(
  browser,
  `${APPLICATION_URL}#resume`,
  `${OUTPUT_PATH}/${publicInfo.resumePdfName}`,
);

await makePDF(
  browser,
  `${APPLICATION_URL}#cv`,
  `${OUTPUT_PATH}/${publicInfo.cvPdfName}`,
);

await browser.close();

server.close();
