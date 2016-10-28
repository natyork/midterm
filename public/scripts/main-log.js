
$(document).ready(function () {

  $(".login").on("submit", function(event) {
    event.preventDefault();
    var email = $(this).find("input[type='email']");
    var pw = $(this).find("input[type='password']");
    var testArray = [email, pw];
    if(checkValidText(testArray)) {
      //encode text and send to ajax;
      var encodedArr = encodeText(testArray);
      // email.val(encodeText(email.val()));
      // pw.val(encodeText(pw.val()));
      var params = {
        email: encodedArr[0].val(),
        pw: encodedArr[1].val()
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

    clearFieldByVal(testArray);


  });
  //sorts the cards loaded at /home according the the query string










});
