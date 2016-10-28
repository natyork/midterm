

//santize text
function encodeText(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function checkValidText(stringIN) {
  //trim whitespace
  stringIN = stringIN.trim();
    return stringIN.length > 0;
}

function clearFieldByVal(selector) {
  selector.val("");
}
