

module.exports = {
  checkValidText: function(stringIN) {
    //trim whitespace
    stringIN = stringIN.trim();
    return stringIN.length > 0;
  },
  encodeText: function (objIn) {
    for(text in objIn) {
      objIn[text] = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    return objIn;
  }

}
