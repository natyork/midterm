
$(function() {

  function createResourceElement(resource) { //params are objects for info required
    var $resource = $("<article>").addClass("resource grid-item col-sm-6 col-md-4");
    $resource.attr({"data-resourceid" : resource.id});
    var $thumbnail = $("<div>").addClass("thumbnail");
    var $img = $("<img>").addClass("thumbnail-img").attr("src", resource.path);
    var $caption = $("<div>").addClass("caption")
    var $title = $("<h3>").text(resource.title);
    var $description = $("<p>").addClass("description").text(resource.description);
    var $iconHeart = $("<span>").attr({"class": "glyphicon glyphicon-heart", "aria-hidden": "true", "data-isToggled" : false, "onclick" : "setLike(event)"});
    var $visit = $("<a>").attr("href", resource.url).text("Link");
    var $user = $("<div>").addClass("user").text(resource.handle);
    var $category = $("<div>").addClass("category").text(`Category: ${resource.name}`);
    // var $comments = $("<section>").addClass("comment-container"); //need to pull in comments

    $caption = $caption.append($title).append($description).append($iconHeart).append($visit).append($user).append($category);
    $thumbnail = $thumbnail.append($img).append($caption);
    $resource = $resource.append($thumbnail);


    return $resource;
  }



  function renderResources(arr) {

    for (i in arr) {
      var resource = arr[i];
      var $resource = createResourceElement(resource);
      $('.resource-row').prepend($resource);
    }
  }

  function loadResources() {
    var allOfTheResources = $.ajax({
      method: 'get',
      url: "/api/resources",
      data: $(this).serialize(),
      dataType: 'json'
    });

    allOfTheResources.done(function(data) {
      renderResources(data);
    });
  }

  loadResources();

  function clearResources(){
    $("article").remove();
  }


 $('.search-form').on("submit", function(event) {
    event.preventDefault();

    var searchSubmit = $.ajax({
      method: 'get',
      url: '/api/resources/filter',
      data: $(this).serialize(),
      dataType: 'json'

    });

    searchSubmit.done(function(data){
      clearResources();
      renderResources(data);
    });
  });











});

