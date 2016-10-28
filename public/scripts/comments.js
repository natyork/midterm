$(function() {

  function createCommentElement(comment) { //params are objects for info required
    var $comment = $("<article>").addClass("comment");
    return $comment;
  }

  function renderComments(arr) {
    // console.log(arr);
    for (i in arr) {
      var comment = arr[i];
      var $comment = createCommentsElement(comment);
      $('#comments-container').prepend($comment);
    }
  }

  function loadComments(allComments) {
    var allOfTheComments = $.ajax({
      method: 'get',
      url: "/api/resources/comments/:id",
      data: $(this).serialize(),
      dataType: 'json'
    });

    allOfTheComments.done(function(data) {
      var dL = data.length;
      console.log(data);
      // var start = dL-1;
      var singleComment = [data[data.length-1]];
      console.log('single comment', singleComment);
      console.log("the data",data);
      if (allComments === true) {
      renderComments(data);
      } else if (allComments === false){
      renderComments(singleComment);
      }
    });
  }

});
