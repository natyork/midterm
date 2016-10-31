
function deleteResource(event, resourceid) {
  var formContainer = event.target.closest("section");
    event.preventDefault();
    //reset error Messages
    console.log(formContainer)
    $.ajax({
      method: "POST",
      url: `/home/resources/${resourceid}/delete`,
      data: {id: resourceid}
    }).then(function(data) {
        if (response.resStatus !== 200) {
          $(".errorMessage")
          .toggle().children()
          .text(response.msg);
        } else {
          console.log(response, "success");
          window.location.assign(response.url, (count) => {

          });
        }
    });
}

