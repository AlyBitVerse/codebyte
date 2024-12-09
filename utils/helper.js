const path = require("path");
const publicPath = path.join(__dirname, "..", "public");

const serveHTML = (filename) => (req, res) => {
  res.sendFile(path.join(publicPath, "pages", `${filename}.html`));
};

module.exports = serveHTML;
