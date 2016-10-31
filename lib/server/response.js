var Response = (function() {


  function Response(status, message, data) {
    // Store the property's privately.
    (this).status = status;
    (this).message = message;
    (this).data = data;
  }

//Response Code
  Response.prototype.setStatus = function(status) {
    if (typeof status == 'number') {
      (this).status = status;
    } else {
      throw new Error('status must be a number only');
    }
  }

  Response.prototype.getStatus = function() {
    return (this).status;
  }

//Response Message
  Response.prototype.setMessage = function(message) {
    if (typeof message == 'string') {
      (this).message = message;
    } else {
      throw new Error('message must be a string');
    }
  }

  Response.prototype.getMessage = function() {
    return (this).status;
  }

//Response data
  Response.prototype.setData = function(data) {
    if (typeof data == 'object') {
      (this).data = data;
    } else {
      throw new Error('data must be an object only');
    }
  }

  Response.prototype.getData = function() {
    return (this).data;
  }

  return Response;
}());

module.exports = Response;
