angular.module('editpost')
.constant('ApiBasePath', "");

angular.module('editpost')
.service('DbService', DbService);
// .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com"),

// DbService = database access service
DbService.$inject = ['$http', 'ApiBasePath'];
function DbService($http, ApiBasePath) {
  var service = this;

  service.hiIamTesting = function (postid_input) {
    // var postid = { post_ID: "94" };
    var postid = { post_ID: postid_input };
    console.log("hiIamTesting postid_input = ", postid_input);

    console.log("DbService  hiIamTesting !!! ", postid);
    var response = $http.post('/editpostdelete', postid);
  }

  service.getPosts = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/editpost")
    });
    return response;
  };
  
  service.postPosts = function (person) {
  var response = $http.post('/editpost', person);
    // var response = $http({ method: "POST", url: (ApiBasePath + "/editpost") });
    return response;
  };
  service.postPostsdummy = function () {
    var person = {email: "year43@gmail.com", password: "year43"};
  var response = $http.post('/editpost', person);
    // var response = $http({ method: "POST", url: (ApiBasePath + "/editpost") });
    return response;
  };

  // service.getMenuForCategory = function (shortName) {
  //  var response = $http({
  //    method: "GET",
  //    url: (ApiBasePath + "/menu_items.json"),
  //    params: { category: shortName }
  //  });
  //  return response;
  // };

}