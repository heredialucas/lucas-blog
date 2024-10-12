import { NextResponse } from "next/server";
import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export async function POST(req) {
  const { url } = await req.json();

  let browser;
  try {
    // Usar chrome-aws-lambda para obtener la ruta de Chromium en entornos serverless
    const executablePath = await chrome.executablePath;

    browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: executablePath, // Utiliza el ejecutable de chrome-aws-lambda
      headless: chrome.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });

    const content = await page.evaluate(() => {
      const title = document.querySelector("h1#content")?.innerText || "";
      const articleContent = document.querySelector("article")?.innerHTML || "";

      const links = Array.from(document.querySelectorAll("article a")).map(
        (a) => ({
          text: a.innerText,
          href: a.href,
        })
      );

      return {
        title,
        content: articleContent,
        links,
      };
    });

    // Devuelve la respuesta exitosa con los datos scrapeados
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error al hacer scraping:", error);
    // Devuelve una respuesta de error
    return NextResponse.json(
      { error: "Error al hacer scraping" },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
