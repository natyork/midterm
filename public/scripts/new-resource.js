$(document).ready(function () {

  $(".resource-submit").on("submit", function(event) {
    event.preventDefault();
    var inputFields = $(this).find("input[type='text']");
  });

})
