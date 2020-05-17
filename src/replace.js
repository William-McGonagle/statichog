const fs = require("fs");
const path = require("path");
const HTMLParser = require("node-html-parser");

function runCommand() {

  // Put in some safe guards
  if (process.argv[3] == undefined) return -1;
  if (process.argv[4] == undefined) return -1;
  if (!fs.existsSync(path.join(process.cwd(), process.argv[3]))) return -1;
  if (!fs.existsSync(path.join(process.cwd(), process.argv[4]))) return -1;

  var fileData = HTMLParser.parse(
    fs.readFileSync(path.join(process.cwd(), process.argv[3])).toString()
  );
  var castData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), process.argv[4])).toString()
  );

  for (var item in castData) {
    var itemType = typeof castData[item];

    switch (itemType) {
      case "object":
        var domItem = fileData.querySelector("#body");

        if (domItem !== null) {
          for (var i = 0; i < castData[item].length; i++) {
            var domAppend = HTMLParser.parse(castData[item][i]);
            domItem.appendChild(domAppend);
          }
        }

        break;

      case "string":
        fileData.querySelector("#" + item).set_content(castData[item]);
        fileData.querySelector("title").set_content(
          fileData
            .querySelector("title")
            .childNodes[0].rawText.split("%" + item + "%")
            .join(castData[item])
        );

        break;
      default:
    }
  }

  return fileData.toString();
}

exports.run = runCommand;
