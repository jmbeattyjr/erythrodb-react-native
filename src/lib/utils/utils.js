exports.getDescriptionForBiggId = function(biggId, type, descriptions) {
  let d =
    type === "metabolite" ? descriptions.metabolites : descriptions.reactions;
  for (let i = 0; i < d.length; i++) {
    if (d[i].id === biggId) {
      return d[i];
    }
  }
  return {};
};

// function for converting str to unicode (so that we can subscript numbers in chemical formula)
exports.toSubscripts = function(theString) {
  var unicodeString = "";
  for (var i = 0; i < theString.length; i++) {
    var theUnicode = theString
      .charCodeAt(i)
      .toString(16)
      .toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = "0" + theUnicode;
    }
    theUnicode = "\\u" + theUnicode;
    unicodeString += theUnicode;
  }

  var text = replaceNumbers(unicodeString);
  var r = /\\u([\d\w]{1,})/gi;
  text = unicodeString.replace(r, function(match, grp) {
    return String.fromCharCode(parseInt(grp, 16));
  });
  return unescape(text);
};

// special replace all function (str.replace only replaces first instance)
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

function replaceNumbers(theString) {
  theString = replaceAll(theString, "0030", "2080");
  theString = replaceAll(theString, "0031", "2081");
  theString = replaceAll(theString, "0032", "2082");
  theString = replaceAll(theString, "0033", "2083");
  theString = replaceAll(theString, "0034", "2084");
  theString = replaceAll(theString, "0035", "2085");
  theString = replaceAll(theString, "0036", "2086");
  theString = replaceAll(theString, "0037", "2087");
  theString = replaceAll(theString, "0038", "2088");
  theString = replaceAll(theString, "0039", "2089");

  return theString;
}
