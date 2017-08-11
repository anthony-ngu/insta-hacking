var fs = require('fs');
var logger = fs.createWriteStream('output.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log(data);
  var index = data.indexOf('<span><span>') + 12;
  var stopIndex = data.indexOf('</span></span>');
  var resultString = data.substring(index, stopIndex);
  var regexp = /(?![ABCDabcd]\b)\b\w+/g;
  var extraneousCharacterRegEx = /(\W)/g;
  var strippedString = resultString.replace(regexp, '');
  var doubleStrippedstring = strippedString.replace(extraneousCharacterRegEx, '')
  if(!(index == -1 || stopIndex == -1) && doubleStrippedstring != '') {logger.write(doubleStrippedstring + '\n');}
}

var input = fs.createReadStream('commentlist.html');
readLines(input, func);