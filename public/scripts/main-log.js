
$(document).ready(function () {

  $(".login").on("submit", function(event) {
    event.preventDefault();
    var email = $(this).find("input[type='email']");
    var pw = $(this).find("input[type='password']");

    if(checkValidText(pw.val()) && checkValidText(email.val())) {
      //encode text and send to ajax;
      email.val(encodeText(email.val()));
      pw.val(encodeText(pw.val()));
      var params = {
        email: email.val(),
        pw: pw.val()
      }
      $.ajax({
        url: "/login",
        method: "POST",
        data: params
      }).then(function (response) {
          if (response.resStatus !== 200) {
            $("#errorMessage")
            .toggle().children()
            .text(response.msg);
          } else {
            console.log(response, "success");
            window.location.assign(response.url);
          }
        });
    }

    clearFieldByVal(pw);
    clearFieldByVal(email);

  });
  //sorts the cards loaded at /home according the the query string










});
