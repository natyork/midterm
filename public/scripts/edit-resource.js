
function editResource(event, resourceid) {
  var formContainer = event.target.closest("section");
    event.preventDefault();
    //reset error Messages
    console.log(formContainer)
    $(".errorMessage").css("display", "none");
    submitDatatoPath(`/home/resources/${resourceid}/edit`, formContainer, resourceid);
}

