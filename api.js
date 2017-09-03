const request = require("request");
const express = require("express");
const app = express();

const RUBY_GEMS_URL = "https://rubygems.org";
const PORT = 3000;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);

	next();
});

app.get("/api/**/*", (req, res) => {
	const url = `${RUBY_GEMS_URL}${req.originalUrl}`;

	request.get(url, (err, response, body) => {
		if (response.statusCode === 400) {
			res.send([]);
		} else {
			res.send(body);
		}
	});
});

app.listen(PORT);

console.log(`Ruby Gems proxy API is now running at: http://localhost:${PORT}`);
