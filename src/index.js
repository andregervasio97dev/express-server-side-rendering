import express from "express";
import { JSDOM } from "jsdom";
import fs from "fs";
var app = express();

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.get("/", async (_req, res) => {
    let htmlFile = fs.readFileSync("./src/html/landing_page/landing_page.html");
    let cssFile = fs.readFileSync("./src/html/landing_page/landing_page.css");

    // Create a new DOMParser instance
    const parser = new JSDOM(htmlFile);

    // Parse the string into an HTML document
    const doc = parser.window.document;

    const headElement = doc.getElementById("head");

    const styleElement = doc.createElement("style");

    styleElement.textContent = cssFile;

    headElement.appendChild(styleElement);

    // Get entire Html document as a String
    const fullHtmlString = doc.documentElement.outerHTML;
    res.set("Content-Type", "text/html");
    res.send(fullHtmlString);
});
