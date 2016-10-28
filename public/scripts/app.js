
$(function() {

  function createResourceElement(resource) { //params are objects for info required
    var $resource = $("<article>").addClass("resource");
    var $header = $("<header>");
    var $thumbnail = $("<img>").addClass("thumbnail").attr("src", resource.thumbnail);
    var $iconHeart = $("<i>").attr({"class": "fa fa-heart", "aria-hidden": "true"});
    // var $visit_div = $("<div>").addClass("visit").text("visit");
    // var $visit = $("<a>").attr("href"=resource.url).append($visit_div);
    var $content = $("<section>").addClass("content");
    var $title = $("<div>").addClass("title").text(resource.title);
    var $user = $("<div>").addClass("user").text(resource.created_by); //(id) ref user database....
    var $category = $("<div>").addClass("category").text("Learning"); // need to pull in categor (id) ref category database
    var $footer = $("<footer>");
    var $comments = $("<div>").addClass("comments").text("awesome resource"); //need to pull in comments


    $header = $header.append($thumbnail).append($iconHeart) //.append($visit);
    $content = $content.append($title).append($user).append($category)
    $footer = $footer.append($comments);

    $resource = $resource.append($header).append($content).append($footer);

    return $resource;
  }

  function renderResources(arr) {
    // console.log(arr);
    for (i in arr) {
      var resource = arr[i];
      var $resource = createResourceElement(resource);
      $('#resource-container').prepend($resource);
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

