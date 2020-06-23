const fs = require("fs");
const path = require("path");
const HTMLParser = require("node-html-parser");

function runCommand() {

  // Put in some safe guards
  if (process.argv[3] == undefined) return -1;
  if (process.argv[4] == undefined) return -1;
  if (!fs.existsSync(path.join(process.cwd(), process.argv[3]))) return -1;
  if (!fs.existsSync(path.join(process.cwd(), process.argv[4]))) return -1;

  // Parse the data in each of the files
  var fileData = HTMLParser.parse(fs.readFileSync(path.join(process.cwd(), process.argv[3])).toString());
  var castData = JSON.parse(fs.readFileSync(path.join(process.cwd(), process.argv[4])).toString());

  var head = fileData.querySelector("head");

  var twitterCard = HTMLParser.parse(`<meta name="twitter:card" content="summary"/>`);
  var ogType = HTMLParser.parse(`<meta property="og:type" content="website" />`);

  head.appendChild(twitterCard);
  head.appendChild(ogType);

  for (var metaTag in castData.meta) {

    switch (metaTag) {
      case "title":

      // twitter title
      var tempItem = HTMLParser.parse(`<meta name="twitter:title" content="${castData.meta[metaTag]}"/>\n`);
      head.appendChild(tempItem);

      // opengraph title
      var tempItem2 = HTMLParser.parse(`<meta property="og:title" content="${castData.meta[metaTag]}" />\n`);
      head.appendChild(tempItem2);

        break;
      case "twitter":

      // Site Twitter Account
      var tempItem = HTMLParser.parse(`<meta name="twitter:site" content="${castData.meta[metaTag]}"/>\n`);
      head.appendChild(tempItem);

      // Creator Twitter Account
      var tempItem2 = HTMLParser.parse(`<meta name="ttwitter:creator" content="${castData.meta[metaTag]}"/>\n`);
      head.appendChild(tempItem2);

        break;
      case "description":

      // twitter description
      var tempItem = HTMLParser.parse(`<meta name="twitter:description" content="${castData.meta[metaTag]}"/>\n`);
      head.appendChild(tempItem);

      // opengraph description
      var tempItem2 = HTMLParser.parse(`<meta property="og:description" content="${castData.meta[metaTag]}" />\n`);
      head.appendChild(tempItem2);

        break;
      case "image":

      // twitter image
      var tempItem = HTMLParser.parse(`<meta name="twitter:image" content="${castData.meta[metaTag]}"/>\n`);
      head.appendChild(tempItem);

      // opengraph image
      var tempItem2 = HTMLParser.parse(`<meta property="og:image" content="${castData.meta[metaTag]}" />\n`);
      head.appendChild(tempItem2);

        break;
      case "alt":

      // twitter alt image
      var tempItem = HTMLParser.parse(`<meta name="twitter:image:alt" content="${castData.meta[metaTag]}"/>\n`);
      head.appendChild(tempItem);

      // opengraph alt image
      var tempItem2 = HTMLParser.parse(`<meta property="og:image:alt" content="${castData.meta[metaTag]}" />\n`);
      head.appendChild(tempItem2);

        break;
      case "url":

      // opengraph url
      var tempItem = HTMLParser.parse(`<meta name="og:url" content="${castData.meta[metaTag]}"/>\n`);
      head.appendChild(tempItem);

        break;
      default:

    }

  }

  // return the output
  return fileData.toString();

}

exports.run = runCommand;
