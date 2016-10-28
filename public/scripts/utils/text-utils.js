

//santize text
function encodeText(arrayIN) {
  arrayIN.forEach(function(string) {
    let stringText = string.val();
    stringText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    return string.val(stringText);
  });
  return arrayIN;
}

function checkValidText(arrayIN) {
  //trim whitespace
  arrayIN.forEach(function(string) {
    return string.val(string.val().trim());
    if(string.val() < 1) {
      return false;
    }
  });
  return true;
}

function clearFieldByVal(arrayIN) {
    arrayIN.forEach(function(string) {
      return string.val("");
    });
}
