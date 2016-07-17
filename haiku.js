var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
   var lines = data.toString().split("\n"),
       lineSplit
       syllablearray = []
   lines.forEach(function(line){
    if (line != undefined) {
      lineSplit = line.split("  ");
      if ((/\d/).test(lineSplit[1])) {
        syllablearray[lineSplit[1].match(/\d/g).length] += lineSplit[0] + " ";
      }
      else {
        syllablearray[0] += lineSplit[0]
      }
    }
  });
  for (var i = 0; i < syllablearray.length; i++) {
    if (syllablearray[i] !== undefined) {
      syllablearray[i] = syllablearray[i].split(' ')
    }
  }
  return syllablearray
}

function createHaiku(structure){
  var haikuarray = [];
  var syllablearray = formatData(cmudictFile)
  for (var i = 0; i < structure.length; i++) {
    var linestructure = structure[i];
    var line = []
    for (var j = 0; j < linestructure.length; j++) {
      line.push(syllablearray[linestructure[j]][Math.floor(Math.random() * syllablearray[linestructure[j]].length)])
    }
    haikuarray[i] = line.join(' ')
  }
  return haikuarray.join('\n')
}
module.exports = {
  createHaiku: createHaiku,
};