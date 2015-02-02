/* */ 
var createCompounder = require("../internal/createCompounder");
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return index ? (result + word.charAt(0).toUpperCase() + word.slice(1)) : word;
});
module.exports = camelCase;
