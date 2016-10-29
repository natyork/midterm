$(document).ready(function () {

  $(".resource-submit").on("submit", function(event) {
    event.preventDefault();
    //reset error Messages
    $(".errorMessage").css("display", "none");
    // creates a test Obj to do basic validation for each dom element
    //note **specific validation will be required at a later time!
    var testObj = {
      category: $(this).find("#category"),
      title:    $(this).find("#title"),
      url: $(this).find("#url"),
      thumburl: $(this).find("#thumburl"),
      description: $(this).find("#description")
    }
    if(checkValidText(testObj)) {
      encodeText(testObj);
      //check valid url submissions
      if(checkValidUrl(testObj.url.val()) && checkValidImgUrl(testObj.thumburl.val())) {
        var params = new Object();
        params.category = testObj.category.val();
        params.title = testObj.title.val();
        params.url = testObj.url.val();
        params.thumburl = testObj.thumburl.val();
        params.description = testObj.description.val();
        //post to database with params object
        $.ajax({
          method: "POST",
          url: "/home/resources/new",
          data: params
        }).then(function (response) {
          if (response.resStatus !== 200) {
            //need to have this modify a dom element on page****
            console.log(response.msg);
          } else {
            //on success window is redirected back to home page
            console.log(response, "success");
            window.location.assign(response.url);
          }
        });
      }
      //needs to be more specifc but for now both error messages for thumburl
      //field and url field will toggle
      $(".errorMessage").toggle();
      console.log("fail");
      clearFieldByVal(testObj)
    }


  });

})
