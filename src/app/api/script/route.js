import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req) {
  const { url } = await req.json();
  
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
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
