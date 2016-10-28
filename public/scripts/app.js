
$(function() {

  function createResourceElement(resource) { //params are objects for info required
    var $resource = $("<article>").addClass("resource item col-md-3");
    var $header = $("<header>");
    var $thumbnail = $("<img>").addClass("thumbnail").attr("src", resource.path);
    var $iconHeart = $("<i>").attr({"class": "fa fa-heart", "aria-hidden": "true"});
    var $visit = $("<a>").attr("href", resource.url).text("Link");
    var $content = $("<section>").addClass("content");
    var $title = $("<div>").addClass("title").text(resource.title);
    var $description = $("<div>").addClass("description").text(resource.description);
    var $user = $("<div>").addClass("user").text(resource.handle);
    var $category = $("<div>").addClass("category").text(resource.name);
    var $footer = $("<footer>");
    // var $comments = $("<section>").addClass("comment-container"); //need to pull in comments


    $header = $header.append($thumbnail).append($iconHeart).append($visit);
    $content = $content.append($title).append($description).append($user).append($category)
    // $footer = $footer.append($comments);

    $resource = $resource.append($header).append($content).append($footer);

    return $resource;
  }

  function renderResources(arr) {

  // $('.grid').masonry({
  //   columnWidth: 200,
  //   itemSelector: '.grid-item'
  // });
  // Masonry has been initialized, okay to call methods

    // console.log(arr);
    for (i in arr) {
      var resource = arr[i];
      var $resource = createResourceElement(resource);
      // $grid.append( $resource)
      // .masonry( 'appended', $resource );
      $('.resource-container').prepend($resource);
    }
  }

  function loadResources(allResources) {
    var allOfTheResources = $.ajax({
      method: 'get',
      url: "/api/resources",
      data: $(this).serialize(),
      dataType: 'json'
    });

    allOfTheResources.done(function(data) {
      var dL = data.length;
      console.log(data);
      // var start = dL-1;
      var singleResource = [data[data.length-1]];
      console.log('single resource', singleResource);
      console.log("the data",data);
      if (allResources === true) {
      renderResources(data);
      } else if (allResources === false){
      renderResources(singleResource);
      }
    });
  }



  loadResources(true);

});

