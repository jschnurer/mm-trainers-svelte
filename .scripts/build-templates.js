if (!process.argv || process.argv.length < 3) {
  return;
}

var fs = require('fs');
var path = require('path');

let env = process.argv[2];
var settings = {};
readAndApplySettings(`./settings.${env}.json`, settings);

var noCacheFileList = [
  /service-worker.js/,
  /manifest.json/,
  /.map$/
  // example of no-caching an entire folder:
  // /\\manifest-icons\\/
];

copyTemplate('./templates/index.html', './public/index.html');
handleServiceWorkerTemplate();

function handleServiceWorkerTemplate() {
  // Read the sw template.
  var template = fs.readFileSync('./templates/service-worker.js', 'utf8');
  var hash = new Date().getTime().toString();

  // Inject current datetime as cache name.
  var newSW = template.replace(/__uid__/g, hash);

  // Discovery list of files to cache and inject.
  var cacheableFiles = walk('./public/')
    .filter(fn => !noCacheFileList.find(filter => fn.match(filter)))
    .map(fn => fn.replace(/\\/g, '/').replace('public/', settings.hostDir ? settings.hostDir + "/" : "/"));

  newSW = newSW.replace(/__fileArray__/g, JSON.stringify(cacheableFiles, null, 1));

  fs.writeFileSync('./public/service-worker.js', newSW);
}

function walk(dir) {
  let files = fs.readdirSync(dir);
  files = files.map(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) return walk(filePath);
    else if (stats.isFile()) return filePath;
  });

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

function copyTemplate(source, dest) {
  fs.writeFileSync(dest, fs.readFileSync(source, 'utf8'));
}

function readAndApplySettings(filePath, settingsObj) {
  if (!fs.existsSync(filePath)) {
    console.log(`WARNING: ${filePath} not found!`);
    return;
  }

  console.log(`Reading settings from ${filePath}...`);
  Object.assign(settingsObj, JSON.parse(fs.readFileSync(filePath)));
}
