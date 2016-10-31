$(document).ready(function () {

  $(".resource-submit").on("submit", function(event) {
    event.preventDefault();
    //reset error Messages
    $(".errorMessage").css("display", "none");
    submitDatatoPath("/home/resources/new", this);
  });

})
