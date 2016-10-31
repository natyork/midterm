
$(function() {

  function createResourceElement(resource, modalid) { //params are objects for info required
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

    $caption = $caption.append($title).append($description).append($iconHeart).append($visit).append($user).append($category);
    $thumbnail = $thumbnail.append($img).append($caption);
    $resource = $resource.append($thumbnail);
    //insert comment button

      $(`<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal${modalid}"">
        Comment
      </button>   <div class="modal fade" id="myModal${modalid}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">


            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title" id="myModalLabel">Comments for ${resource.title}</h4>
            </div>
            <div class="modal-body thumbnail">
                <section>
                  <div class="form-group">
                    <input type="comment" class="form-control" name = "comment" placeholder="Your comment here...">
                    <button type="button" class="comment-submit btn btn-default">Comment</button>
                  </div>
                </section>

              <section class='comment-container'></section>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
      </div>
    </div>`).insertAfter($category);

    return $resource;
  }

  function createCommentElement(resource){
    var $comment = $("<div>").addClass("comment").text(resource.content);
    return $comment;
  }

  function renderComments(arr) {

    for (i in arr) {
      var comment = arr[i];
      var $comment = createCommentElement(comment);
      $('.comment-container').prepend($comment);
    }
  }


  function renderResources(arr) {
    var modalid = 0;
    for (i in arr) {
      var resource = arr[i];
      var $resource = createResourceElement(resource, modalid);
      $('.resource-row').prepend($resource);
      // var $comment = createCommentElement (resource);
      // $('.comment-container').prepend($comment);
      modalid++;

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


// ***********************************************


 // const commentMethods =require('../../lib/database/comment-insert-remove-edit.js')

 $(document).on("click", '.comment-submit', function(event) {
    console.log("made it into the onclick function");
    event.preventDefault();
    var resourceidParent = $(this).closest('article')
    var resourceid = resourceidParent.data('resourceid');
    var content = $(this).siblings('input').val();
    var commentSubmit = $.ajax({
      method: 'get',
      url: '/api/resources/comment',
      data: {
        content: content,
        resourceid: resourceid }
    });

    commentSubmit.done(function(data){
        console.log(data)
        renderComments(data);
    });
  });


// ************************************************************






});

