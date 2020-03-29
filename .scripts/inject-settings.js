if (!process.argv || process.argv.length < 3) {
  return;
}

let env = process.argv[2];

var fs = require('fs');

// Read the templated settings.
var settings = {};
readAndApplySettings(`./settings.${env}.json`, settings);

// Write the settings object into index.html
copyAndReplaceIndex('./public/index.html',
  './public/index.html',
  settings);
console.log(`Index template build complete!`);

function readAndApplySettings(filePath, settingsObj) {
  if (!fs.existsSync(filePath)) {
    console.log(`WARNING: ${filePath} not found!`);
    return;
  }

  console.log(`Reading settings from ${filePath}...`);
  Object.assign(settingsObj, JSON.parse(fs.readFileSync(filePath)));
}

function copyAndReplaceIndex(source, dest, settings) {
  console.log(`Reading index.html template...`);
  var oldHtml = fs.readFileSync(source, 'utf8');

  var newHtml = oldHtml.replace('<head>',
    `<head>\n <!-- Injected settings -->\n <script>\nwindow.__settings = ${JSON.stringify(settings, null, 1)}\n</script>\n`);

  newHtml = newHtml.replace(/__hostDir/g, settings.hostDir);

  console.log(`Writing index.html with settings...`);
  fs.writeFileSync(dest, newHtml);
}