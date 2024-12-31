import * as config from "../../../config/local.js";
import { databaseStatus } from "../../scripts/database_status.js";

import { JSDOM } from "jsdom";
import fs from "fs";

export function landingPageBuilder(_req, res) {
    const prodDatabases = databaseStatus(config.PROD_DIRECTORY);
    const testDatabases = databaseStatus(config.TEST_DIRECTORY);
    const devDatabases = databaseStatus(config.DEV_DIRECTORY);

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

    createDatabaseInfoCard(doc, prodDatabases, "Prod");
    createDatabaseInfoCard(doc, testDatabases, "Test");
    createDatabaseInfoCard(doc, devDatabases, "Dev");

    // Get entire Html document as a String
    const fullHtmlString = doc.documentElement.outerHTML;
    res.set("Content-Type", "text/html");
    res.send(fullHtmlString);
}

function createDatabaseInfoCard(doc, databaseList, context) {
    const card = doc.createElement("div");
    const numberOfDatabases = databaseList.length;
    const numberOfOnlineDatabases = getNumberOfOnlineDatabases(databaseList);

    const infoContainer = doc.createElement("div");
    const infoTextContainer = doc.createElement("p");
    const infoText = doc.createTextNode(
        `Database total (online): ${numberOfDatabases} (${numberOfOnlineDatabases})`
    );

    infoTextContainer.classList.add("info-text");
    infoTextContainer.appendChild(infoText);
    infoContainer.appendChild(infoTextContainer);

    const titleContainer = doc.createElement("h2");
    const title = doc.createTextNode(`${context}`);

    titleContainer.classList.add("card-title");
    titleContainer.appendChild(title);

    card.classList.add("card");
    card.appendChild(titleContainer);
    card.appendChild(infoContainer);

    doc.body.querySelector("#database-info-card").appendChild(card);
}
function getNumberOfOnlineDatabases(databaseList) {
    // Todo: Implement the getter of online databases
    return databaseList.length;
}
