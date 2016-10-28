

module.exports = {
  checkValidText: function(stringIN) {
    //trim whitespace
    stringIN = stringIN.trim();
    return stringIN.length > 0;
  },
  encodeText: function (str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}
