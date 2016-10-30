


function showMenu(event) {
 event.stopPropagation();
 var article = event.target.closest("article");
 var resourceid = $(article).data("resourceid");
 $.ajax({
  url: "/api/resources/" +resourceid,
  method: "get"
 }).then(function (resource) {
  console.log("worked")
    // renderResourceMenu(resource);
 });
 //disable show menus for other buttons while one menu is up
 $("article").find("img").prop('onclick',null).off('click');
}


// function closeMenu(event) {
//  event.target.closest("#myModal").toggle()

//  $("article > img").attr("onclick", "showMenu(event)");
// }
