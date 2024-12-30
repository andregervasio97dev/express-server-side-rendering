import * as config from "../../../config/local.js";
import { databaseStatus } from "../../scripts/database_status.js";

import { JSDOM } from "jsdom";
import fs from "fs";

export function landingPageBuilder(_req, res) {
    const prodDatabases = databaseStatus(config.PROD_DIRECTORY);

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

		createDatabaseInfoCard(doc, prodDatabases);

    prodDatabases.forEach((database) => {
        const card = doc.createElement("div");
        const text = doc.createTextNode(
            `Database Name: ${database.name}. Database Status: ${database.status}`
        );
        card.classList.add("card");
        card.appendChild(text);
        doc.body.querySelector("#card-container").appendChild(card);
    });

    // Get entire Html document as a String
    const fullHtmlString = doc.documentElement.outerHTML;
    res.set("Content-Type", "text/html");
    res.send(fullHtmlString);
}

function createDatabaseInfoCard(doc, databaseList) {
		const card = doc.createElement("div");
		const numberOfDatabases = databaseList.length;
		const numberOfOnlineDatabases = getNumberOfOnlineDatabases(databaseList);
		const text = doc.createTextNode(
				`Database total (online): ${numberOfDatabases} (${numberOfOnlineDatabases})`
		);
		
		card.classList.add("card");
		card.appendChild(text);
		doc.body.querySelector("#database-info-card").appendChild(card);

}
function getNumberOfOnlineDatabases(databaseList) {
		// Todo: Implement the getter of online databases
		return databaseList.length
}
