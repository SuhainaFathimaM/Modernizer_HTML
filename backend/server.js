const express = require("express");
const cheerio = require("cheerio");
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/modernize", (req, res) => {
  const { html } = req.body;

  // Load the HTML into Cheerio
  const $ = cheerio.load(html);

  // Add modern tags, such as <header> and <footer>
  $("body").prepend("<header><h1>Modernized Header</h1></header>");
  $("body").append("<footer><p>Modernized Footer</p></footer>");

  // Modify some styles or content here

  // Send back the modified HTML
  res.json({ modernizedHtml: $.html() });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
