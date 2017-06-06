angular.module('editpost', [])
.controller('editpostCtrl', editpostCtrl);

editpostCtrl.$inject = ['$scope','$http', 'DbService'];

// .controller('editpostCtrl', ['$scope','$http',  
function editpostCtrl($scope, $http, DbService) {
    console.log("Hi There from angular controller");
    var menu  = this;  // <----------------- IMPOTANT, MUST HAVE
    $scope.person =  {} ;
    // $scope.selection =  {} ;

    menu.mycounter = -100; // initial value shown up in html page 

    var $epcounter = document.querySelector('.epcounter');
    // var dummycounter = 0;
    $scope.dummycounter = 0;
    var $epbuttoninc = document.querySelector('.epincrementbtn');    
    $epbuttoninc.addEventListener('click', function(){
        if ($epcounter.value < 5) {
            console.log("epcounter.value before = ", $epcounter.value,
             " dummycounter ", $scope.dummycounter);
            // $scope.dummycounter = parseInt($epcounter.value);
            $scope.dummycounter += 1;
            $epcounter.value = $scope.dummycounter; // dummycounter.toString();
            console.log("epcounter.value after  = ", $epcounter.value,
                "dummycounter ", $scope.dummycounter);
        }
        // `parseInt`  string to a number
    }, false);
    var $epbuttondec = document.querySelector('.epdecrementbtn');
    $epbuttondec.addEventListener('click', function(){
        if ($epcounter.value > 0) {
            $scope.dummycounter -= 1;
            $epcounter.value = $scope.dummycounter; 
            // $epcounter.value = parseInt($epcounter.value) - 1; 
        }
    }, false);


    $scope.editpost = function () {
        console.log ("Dummy editpost button ");
    }

    //----------------------------------------------------
    // getDataUsingPost
    //----------------------------------------------------
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
        menu.psize = menu.postsspecial.length;
    
        // mycounter range from 0 to psize -1 (f postsspecial array has elements in it)
        // mycounter = -1 if array "postsspecial" size = 0, 
        // which means there are no posts from user, then 
        if (menu.psize == 0) {    menu.mycounter = -1; 
        } else { menu.mycounter = 0;  // start out with 1st post
        }

        console.log("postsspecialsize = ", menu.psize);
        console.log("keys = ", Object.keys(menu.postsspecial[0]));
        console.log("postsspecial = ", menu.postsspecial);
        })
        .catch(function (error) {
            console.log("Something went terribly wrong, no posts !!!");
        });
    } // getDataUsingPost

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




