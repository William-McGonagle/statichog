var fs = require("fs");
var util = require('util');
var vm = require('vm');
var fs = require('fs');
var path = require('path');
// var HTMLParser = require('node-html-parser');

function runCommand() {

  if (process.argv[3] == undefined) return -1;
  if (process.argv[4] == undefined) return -1;
  if (!fs.existsSync(path.join(process.cwd(), process.argv[3]))) return -1;
  if (!fs.existsSync(path.join(process.cwd(), process.argv[4]))) return -1;

  var fileData = fs.readFileSync(path.join(process.cwd(), process.argv[3])).toString();
  var castData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), process.argv[4])).toString()
  );

/*

  <?blog

    var a = f;

  ?>

*/

  var split = fileData.split("<?hog");
  var sandbox = {
    cast: castData,
    output: undefined
  };

  var out = "";
  var n = 0;

  out += split[0];

  for (var i = 1; i < split.length; i++) {

    sandbox["output"] = undefined;
    vm.runInNewContext(split[i].slice(0, split[i].indexOf("?>")), sandbox);

    if (sandbox["output"] !== undefined) out += sandbox["output"];

    out += split[i].slice(split[i].indexOf("?>") + 2);

  }

  return out;

}

exports.run = runCommand;
