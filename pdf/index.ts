#!/usr/bin/env ts-node

import puppeteer, { Browser } from "puppeteer";

import serveHandler from "serve-handler";
import * as http from "http";
import { mkdirSync, writeFileSync } from "fs";
import { publicInfo } from "@/src/content/public-info";
import { Constant } from "@/src/model/constant";

const basePath = process.argv[2] || "";

const BUILD_PATH = "./out";
const PDF_OUTPUT_PATH = `${BUILD_PATH}/pdf`;
const PREVIEW_OUTPUT_PATH = `${BUILD_PATH}`;
const PORT = 3001;
const APPLICATION_URL = `http://localhost:${PORT}/${basePath}`;

function serveApplication() {
  const basePathRegex = new RegExp(`^/${basePath}(/|$)`);
  const server = http.createServer((request, response) => {
    request.url = request.url?.replace(basePathRegex, "/");
    return serveHandler(request, response, {
      public: BUILD_PATH,
    });
  });

  server.listen(PORT, () => {
    console.log(`Running at ${APPLICATION_URL}`);
  });

  return server;
}

async function makePDF(browser: Browser, url: string, pdfPath: string) {
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

async function makePreview(browser: Browser, url: string, imagePath: string) {
  console.log(`Creating preview of url ${url}`);
  const page = await browser.newPage();

  const renderScale = 0.9;
  await page.setViewport({
    // Recommended Open Graph image size
    width: Constant.openGraphImageWidth * renderScale,
    height: Constant.openGraphImageHeight * renderScale,
    deviceScaleFactor: 1 / renderScale,
  });
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  await page.addStyleTag({
    content: `
      html {
        margin-top: 25px !important;
      }
    
      menu {
        display: none !important;
      }
    `,
  });

  const buffer = await page.screenshot({
    type: "png",
    encoding: "binary",
    captureBeyondViewport: true,
  });

  writeFileSync(imagePath, buffer, { encoding: "binary" });

  await page.close();
}

(async () => {
  mkdirSync(PDF_OUTPUT_PATH, { recursive: true });
  mkdirSync(PREVIEW_OUTPUT_PATH, { recursive: true });

  const server = serveApplication();

  const browser = await puppeteer.launch({
    headless: "new",
  });

  await makePDF(
    browser,
    `${APPLICATION_URL}#resume`,
    `${PDF_OUTPUT_PATH}/${publicInfo.resumePdfName}`,
  );

  await makePreview(
    browser,
    `${APPLICATION_URL}#resume`,
    `${PREVIEW_OUTPUT_PATH}/preview.png`,
  );

  await makePDF(
    browser,
    `${APPLICATION_URL}#cv`,
    `${PDF_OUTPUT_PATH}/${publicInfo.cvPdfName}`,
  );

  await browser.close();

  server.close();
})().catch((error) => {
  console.error(error);
});
