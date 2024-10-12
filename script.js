const puppeteer = require("puppeteer");

module.exports = async function (req, res) {
  const { url } = JSON.parse(req.payload);

  if (!url) {
    return res.json({
      success: false,
      message: "Se requiere una URL en el payload.",
    });
  }

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

    return res.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("Error al hacer scraping:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
