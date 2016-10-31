

//santize text
function encodeText(objIN) {
  for(property in objIN) {
    var string = objIN[property].val();
    string = string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    objIN[property].val(string);
  }
  return objIN;
}

function checkValidText(objIN) {
  //trim whitespace
  for(property in objIN) {
    objIN[property].val(objIN[property].val().trim())
    if(objIN[property].length < 1) {
      return false;
    }
  }
  return true;
}

function clearFieldByVal(objIN) {
  for(property in objIN) {
    objIN[property].val("");
  }
}

function checkValidUrl(urlIn) {
  var regex = new RegExp(/(https?:\/\/)?(www)?\w?\w?\.\w+\.\w{2,4}/, 'i');
  var isValid = regex.test(urlIn)
  return isValid
}
function checkValidImgUrl(urlIn) {
  var regex = new RegExp(/[a-z0-9]+\.[\w]{2,4}/, 'i');
  var isValid = regex.test(urlIn)
  return isValid
}
