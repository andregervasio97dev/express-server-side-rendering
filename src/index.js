// Local imports
import { PORT } from "../config/local.js";
import { landingPageBuilder } from "../src/html/landing_page/landing_page_builder.js";

// Libraries\Frameworks
import express from "express";
var app = express();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.get("/", async (_req, res) => {
    try {
        landingPageBuilder(_req, res);
    } catch (error) {
        console.log(error);
    }
});
