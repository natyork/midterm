$(document).ready(function() {


//get user
getUserInfo();
getLikedResources();
function getUserInfo() {
  var userid = $(".user").data("id");
  $.ajax({
    method: "get",
    url: "/api/users/" + userid,
  })
  .then(function(user) {
    $(".jumbotron-heading").html(user.handle);
    console.log(user)
    $.ajax({
      method: "get",
      url: "/api/resources/user/" + user.id
    }).then(function (resources) {
      console.log(resources);
       renderUserResources(resources, ".resource-row");
    })
  });
}
function getLikedResources() {
  var userid = $(".user").data("id");
  $.ajax({
    method: "get",
    url: "/api/resources/like/" + userid,
  }).then(function (resources) {
      renderUserResources(resources, ".likes-row")
  });
}

});

//inserts a resource dom element into a parent with class of
//parentClass
function renderUserResources(arr, parentClass) {

  for (i in arr) {
    var resource = arr[i];
    var $resource = createResourceElement(resource);
    $(parentClass).prepend($resource);
  }
}
function createResourceElement(resource) {
  var $resource = $(`<article class="col-sm-6 col-md-4"></article>`);
  $resource.attr({"data-resourceid" : resource.id});
  $resource.append(`
    <div class="thumbnail">
      <h3> ${resource.name}  <p class="handle"></p></h3>
      <img  src="${resource.path}" >
      <div class="caption">
        <h3>${resource.title}</h3>
        <p>${resource.description}</p>
        <span class="glyphicon glyphicon-heart" aria-hidden="true" data-istoggled=false onclick="setLike(event)"></span>
        <a href="${resource.url}" class="btn btn-primary" role="button">${resource.url}</a>
      </div>
    </div>`
  );
  //adds a handle to liked elements only
  if(resource.handle) {
    $resource.find(".handle").html(resource.handle);
  }
  return $resource;
}
