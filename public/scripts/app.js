
$(function() {

  function createResourceElement(resource) { //params are objects for info required
    var $resource = $("<article>").addClass("resource grid-item col-sm-6 col-md-4"); //
    var $thumbnail = $("<div>").addClass("thumbnail");
    var $img = $("<img>").addClass("thumbnail-img").attr("src", resource.path);
    // var $iconHeart = $("<i>").attr({"class": "fa fa-heart", "aria-hidden": "true"});
    // var $visit = $("<a>").attr("href", resource.url).text("Link");
    // var $content = $("<section>").addClass("content");
    var $caption = $("<div>").addClass("caption")
    var $title = $("<h3>").text(resource.title);
    var $description = $("<p>").addClass("description").text(resource.description);
    var $iconHeart = $("<span>").attr({"class": "glyphicon glyphicon-heart", "aria-hidden": "true"});
    // var $user = $("<div>").addClass("user").text(resource.handle);
    // var $category = $("<div>").addClass("category").text(resource.name);
    // var $footer = $("<footer>");
    // var $comments = $("<section>").addClass("comment-container"); //need to pull in comments

    $caption = $caption.append($title).append($description).append($iconHeart);
    $thumbnail = $thumbnail.append($img).append($caption);
    $resource = $resource.append($thumbnail);



    // $header = $header.append($thumbnail).append($iconHeart).append($visit);
    // $content = $content.append($title).append($description).append($user).append($category)
    // // $footer = $footer.append($comments);

    // $resource = $resource.append($header).append($content).append($footer);

    return $resource;
  }

// <div class="row"> y
//   <div class="col-sm-6 col-md-4"> y
//     <div class="thumbnail">
//       <img src="..." alt="...">
//       <div class="caption">
//         <h3>Thumbnail label</h3>
//         <p>...</p>
//         <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
//       </div>
//     </div>
//   </div>
// </div>



  function renderResources(arr) {


  // Masonry has been initialized, okay to call methods

    // console.log(arr);
    for (i in arr) {
      var resource = arr[i];
      var $resource = createResourceElement(resource);
  //     $('.grid').masonry({
  //   columnWidth: 200,
  //   itemSelector: '.grid-item'
  // });
      // $grid.append( $resource)
      // .masonry( 'appended', $resource );
      // $grid.masonry( 'prepended', $resource);
      $('.resource-row').prepend($resource);
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

