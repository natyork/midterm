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
    //set heading for webpage
    $(".jumbotron-heading").html(user.handle);
    $.ajax({
      method: "get",
      url: "/api/resources/user/" + user.id
    }).then(function (responseObj) {
       renderUserResources(responseObj.resources, ".resource-row", false, responseObj.admin);
    })
  });
}

function getLikedResources() {
  var userid = $(".user").data("id");
  $.ajax({
    method: "get",
    url: "/api/resources/like/" + userid,
  }).then(function (resources) {
      renderUserResources(resources, ".likes-row", true);

  });
}


});

//inserts a resource dom element into a parent with class of
//parentClass
function renderUserResources(arr, parentClass, toggleState, admin) {
  var modalid = 0;
  for (i in arr) {
    var resource = arr[i];
    var $resource = createResourceElement(resource, toggleState, admin, modalid);
    setHeartColorStyle($resource);
    $(parentClass).prepend($resource);
    modalid++;
  }
}
function createResourceElement(resource, toggleState, admin, modalid) {
  var $resource = $(`<article class="col-sm-6 col-md-4"></article>`);
  $resource.attr({"data-resourceid" : resource.id});
  $resource.append(`
    <div class="thumbnail">
      <h3> ${resource.name}  <p class="handle"></p></h3>
      <img src="${resource.path}" >
      <div class="caption">
        <h3>${resource.title}</h3>
        <p>${resource.description}</p>
        <span class="glyphicon glyphicon-heart" aria-hidden="true" data-istoggled=${toggleState} onclick="setLike(event)"></span>
        <a href="${resource.url}" class="btn btn-primary" role="button">${resource.url}</a>
      </div>
    </div>`
  );
  //adds a handle to liked elements only
  if(resource.handle) {
    $resource.find(".handle").html(resource.handle);
  }
  if(admin === true) {
    var imgElm = $resource.find("img");
    $(`<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal${modalid}"">
        edit
      </button>
      <div class="modal fade" id="myModal${modalid}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-resourceid="{resource.id}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">


            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title" id="myModalLabel">Edit</h4>
            </div>
            <div class="modal-body thumbnail">
            <h5 class="modal-title"> current image </h5>
              <img src="${resource.path}">
            </div>
              <section>
              <div class="form-control">
                  <label for="title">Title</label>
                  <input id="title" type="text" value="${resource.title}">
              </div>
              <div class="form-control">
                  <label for="title">Url</label>
                  <input id="url" type="text" value="${resource.url}">
                  <span class="errorMessage alert alert-caution">Please Enter Valid Url!</span>
              </div>
              <div class="form-control">
                  <label for="title">Thumbnail Url</label>
                  <input id="thumburl" type="text" value="${resource.path}">
                  <span class="errorMessage alert alert-caution">Please Enter Valid Url!</span>
              </div>
              <div class="form-control">
                  <label for="title">Description</label>
                  <input id="description" type="text" value="${resource.description}">
              </div>
              <div class="modal-footer">
                <button class="btn btn-primary resource-edit" onclick="editResource(event, ${resource.id})">Save changes </button>
                <button class="btn btn-danger resource-delete" onclick="deleteResource(event, ${resource.id})">Delete Card</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </section>
        </div>
      </div>
    </div>`).insertAfter(imgElm);
  }
  return $resource;
}


