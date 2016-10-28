
$(function() {

  function createResourceElement(resource) {
    var $resource = $("<article>").addClass("resource");
    var $header = $("<header>");
    var $thumbnail = $("<img>").addClass("thumbnail").attr("src", resource.thumbnail);
    var $iconHeart = $("<i>").attr({"class": "fa fa-heart", "aria-hidden": "true"});
    var $visit = $("<h2>").addClass("user").text(resource.url);
    var $user = $("<h2>").addClass("user").text(resource.created_by); //part of user database....
    var $handle = $("<span>").addClass("handle").text(td.user.handle);
    var $title = $("<div>").text(td.content.text);
    var $category = $("<div>").text(td.content.text);

    var $footer = $("<footer>");


    $header = $header.append($avatar).append($user).append($handle);
    $footer = $footer.append($createdAt).append($iconHeart).append($iconRetweet).append($iconFlag);

    $tweet = $tweet.append($header).append($content).append($footer);

    return $tweet;
  }


$.ajax({
    method: "GET",
    url: "/api/resources"
  }).done((users) => {
    for(resource of resources) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;


});

