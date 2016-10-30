
  //called when the heart button is clicked on the tweet
//the color is toggled via a data element attribute on the heart icon element
//called isToggled. This  attribute is repsonsible for the respective ajax call to server
//when the heart is clicked
function setLike(event) {
  var resourceid = $(event.target).closest("article").data("resourceid");
  var params = new Object();
    params["resource-id"] = resourceid;
    params["isLiked"] = $(event.target).data("istoggled");
    $.ajax({
        url: `/home/resources/${resourceid}/like`,
        method: "POST",
        data: params,
        success: function(data) {
          if($(event.target).data("istoggled")) {
            $(event.target).css("color", "black");
            $(event.target).data("istoggled", false);
          } else {
            $(event.target).css("color", "red");
            $(event.target).data("istoggled", true);
          }
        }
    });

}
