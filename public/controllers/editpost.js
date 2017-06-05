angular.module('editpost', [])
.controller('editpostCtrl', editpostCtrl);

editpostCtrl.$inject = ['$scope','$http', 'DbService'];

// .controller('editpostCtrl', ['$scope','$http',  
function editpostCtrl($scope, $http, DbService) {
    console.log("Hi There from angular controller");
    var menu  = this;  // <----------------- IMPOTANT, MUST HAVE
    $scope.person =  {} ;
    // $scope.selection =  {} ;

    this.hero = { name: 'Spawn' }; 
    this.book = { booktitle: 'architect'};

    this.wonderwoman = { name2: "wonderkind", title2: "super"};
    // this.postlist = ["abc", "what"];
    this.postlist = [{a: "aa"}, {b: "bb"}];
    //  this.postsspecial = [{a: "special"}, {b: "ivka"}];
    // dont use $scope, it's will not display the 'Spawn'  
    // $scope.hero = { name: 'Spawn' };

    $scope.editpost = function () {
        console.log ("Dummy editpost button ");
    }

    // $scope.getDataUsingPost = function (DbService) {
    $scope.getDataUsingPost = function () {
    // ----- http promise ------------------
    // var promise = postPosts($scope.person); // error postPosts not defined
    // var promise = DbService.postPosts($scope.person);
    var promise = DbService.postPostsdummy();
    promise.then(function (response) {
    //this.postsspecial = response.data;
    //console.log("this.postsspecial = ", this.postsspecial);
    menu.postsspecial = response.data;
    console.log("keys = ", Object.keys(menu.postsspecial[0]));
    console.log("postsspecial = ", menu.postsspecial);
    })
    .catch(function (error) {
        console.log("Something went terribly wrong, no posts !!!");
    });
    }

    //=======================================
    //
    //=======================================
    $scope.deletePost = function (postid) {
        // ----- http promise ------------------
        var promise = DbService.deletePost(postid);
        promise.then(function (response) {
            menu.postsspecial = response.data;
            console.log("keys = ", Object.keys(menu.postsspecial[0]));
            console.log("postsspecial = ", menu.postsspecial);
        })
        .catch(function (error) {
            console.log("Something went terribly wrong, can not posts !!!");
        });
    }

}


// ]);


// function displaypostcompCtrl() {
// 
// }
// 
// angular.module('editpost')
// .component('displaypostcomp', {
//     // template: "<span>Name: {{$ctrl.hero.name}}</span>",
//     templateUrl: "displaypostcomp.html",
//     controller: displaypostcompCtrl,
//     bindings: {
//         postsspecial: '<',
//         postlist: '=',
//         wonderwoman: '<',
//         book: '<',
//         hero: '<'       // 1-way binding
//         // hero: '='    // 2-way binding
//         ,  onDelete: '&'
//      }
// });



