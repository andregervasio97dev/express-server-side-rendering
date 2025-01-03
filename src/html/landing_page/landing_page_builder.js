import * as config from "../../../config/local.js";
import { databaseStatus } from "../../scripts/database_status.js";

import fs from "fs";

export function landingPageBuilder(_req, res) {
	const prodDatabases = databaseStatus(config.PROD_DIRECTORY);
	const testDatabases = databaseStatus(config.TEST_DIRECTORY);
	const devDatabases = databaseStatus(config.DEV_DIRECTORY);

	let cssFile = fs.readFileSync("./src/html/landing_page/landing_page.css");

	let htmlHead = "<head>"
		+ "<meta charset='UTF-8' />"
		+ "<meta name='viewport' content='width=device-width', initial-scale=1.0/>"
		+ "<title>Database Controller</title>"
		+ "<style>"
		+ cssFile
		+ "</style>"
		+ "</head>"

	let htmlBody = "<body>"
		+ createTagString(
			"div",
			"Teste"
		)
		+ createTagString(
			"div",
			createTagString(
				"h1",
				"Teste H1"
			)
		)
		+ "</body>"

	const fullHtmlString = `<html>${htmlHead}${htmlBody}</html>`
	res.set("Content-Type", "text/html");
	res.send(fullHtmlString);
}

function createTagString(tag, tagContents = "", tagClass = "", tagId = "") {
	let fullTagString = `<${tag}`
		+ ((tagClass !== "") ? `class='${tagClass}'` : "")
		+ ((tagId !== "") ? `id='${tagId}'` : "")
		+ ">"
		+ ((tagContents !== "") ? `${tagContents}` : "")
		+ `</${tag}>`

	return fullTagString;
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
