

module.exports = {
  //
  checkValidText: function(objIn) {
    //trim whitespace
    for(text in objIn) {
      let string = objIn[text].toString();
      objIn[text] = string.trim();
      if(objIn[text].length < 1) {
        return false;
      }
    }
    return true;
  },
  encodeText: function (objIn) {
    for(text in objIn) {
      objIn[text] = String(objIn[text]).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    return objIn;
  },
  makeFullUrl: function(urlIn) {
    if(!/(https?:\/\/)/.test(urlIn)) {
      return `http://${urlIn}`;
     }
     return urlIn;
  }
}
