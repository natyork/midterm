
  function submitDatatoPath(path, obj, resourceid) {
    var testObj = {
      title:    $(obj).find("#title"),
      url: $(obj).find("#url"),
      thumburl: $(obj).find("#thumburl"),
      description: $(obj).find("#description")
    }
    var category = $(obj).find("#category");
    if(category.length > 0) {
      testObj.category = category;
    }
    if(checkValidText(testObj)) {
      encodeText(testObj);
      //check valid url submissions
      if(checkValidUrl(testObj.url.val()) && checkValidImgUrl(testObj.thumburl.val())) {
        var params = new Object();
        if(category.length > 0) {
          params.category = testObj.category.val();
        }
        params.title = testObj.title.val();
        params.url = testObj.url.val();
        params.thumburl = testObj.thumburl.val();
        params.description = testObj.description.val();
        if(resourceid) {
          params.id = resourceid;
        }
        //post to database with params object
        $.ajax({
          method: "POST",
          url: path,
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
      clearFieldByVal(testObj)
    }
  }
