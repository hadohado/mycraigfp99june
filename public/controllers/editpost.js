angular.module('editpost', ['ngFileUpload'])
.factory('PostListFactory', PostListFactory)
.controller('editpostCtrl', editpostCtrl);

editpostCtrl.$inject = ['$scope','$http', 'DbService' , 'PostListFactory', 'Upload', '$timeout'];

// .controller('editpostCtrl', ['$scope','$http',  
function editpostCtrl($scope, $http, DbService, PostListFactory, Upload, $timeout) {
    console.log("Hi There from angular controller");
    var menu  = this;  // <----------------- IMPOTANT, MUST HAVE


    menu.showthis = "hey what up";


    // Use factory to create new post list service
    var PostList = PostListFactory();



    $scope.person =  {} ;
    // $scope.selection =  {} ;

    // menu.mycounter = -100; // initial value shown up in html page 

    $scope.price = menu.price; // Add NOW

    var $epcounter = document.querySelector('.epcounter');
    // var dummycounter = 0;
    $scope.dummycounter = 0;
    var $epbuttoninc = document.querySelector('.epincrementbtn');    
    $epbuttoninc.addEventListener('click', function(){
        // if ($scope.dummycounter < 5) { // if ($epcounter.value < 5) {
        if ($scope.dummycounter < menu.psize - 1 ) {
            console.log("epcounter.value before = ", $epcounter.value,
             " dummycounter ", $scope.dummycounter);
            // $scope.dummycounter = parseInt($epcounter.value);
            $scope.dummycounter += 1;
            $epcounter.value = $scope.dummycounter; // dummycounter.toString();
            menu.onepost = menu.postsspecial[$scope.dummycounter];
            console.log("epcounter.value after  = ", $epcounter.value,
                "dummycounter ", $scope.dummycounter);
        }
        // `parseInt`  string to a number
    }, false);

    var $epbuttondec = document.querySelector('.epdecrementbtn');
    $epbuttondec.addEventListener('click', function(){
        if ($scope.dummycounter > 0) { // if ($epcounter.value > 0) {
            $scope.dummycounter -= 1;
            $epcounter.value = $scope.dummycounter; 
            menu.onepost = menu.postsspecial[$scope.dummycounter];
            // $epcounter.value = parseInt($epcounter.value) - 1; 
        }
    }, false);

  //  var $epselectthispost = document.querySelector('.epselectthispostbtn');    
  //  $epselectthispost.addEventListener('click', function(){
  //          console.log("epselectthsipost");
  //          // menu.onepost = menu.postsspecial[$scope.dummycounter];
  //          console.log ("ep select this post menu.onepost  ", menu.onepost,
  //           "$scope.dummycounter ", $scope.dummycounter);
  //  }, false);

            $scope.uploadPic = function (files) {
                $scope.files = files;
                // $scope.title = title; // <-- dont do assign to title here either !!!
                // $scope.errFiles = errFiles;
                // data: {title: $scope.title};

                if (files && files.length) {
                    console.log("newpost $scope.person = ", $scope.person);

                    Upload.upload({
                        //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                        url: './updatepost',
                        data: {
                            post_id: 112,
                            title: $scope.person.title,
                            price: $scope.person.price,
                            description: $scope.person.description,
                            email: $scope.person.email,
                            password: $scope.person.password,
                            subcategory: 1, // subcategory: $scope.person.channels,
                            region: 1, // region: $scope.person.regions,

                            files: files
                        }
                    }).then(function (response) {
                        $timeout(function () {
                            $scope.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0) {
                            $scope.errorMsg = response.status + ': ' + response.data;
                        }
                    }, function (evt) {
                        $scope.progress =
                            Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                }
            };



////////////////////////////////////////

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
        menu.mysi = $scope.dummycounter ;      // 2;
        menu.psizeSelected = $scope.dummycounter ; // 2; // $scope.dummycounter;


        menu.onepost = menu.postsspecial[$scope.dummycounter];

        console.log ("menu.onepost  ", menu.onepost, "$scope.dummycounter ", $scope.dummycounter);

        // *****************************************
        // add to fill out form for each post
        // *****************************************
        // menu.title = "library yo";
        // menu.title = menu.postsspecial[0].title;
        menu.price = menu.postsspecial[$scope.dummycounter].Price;
        console.log("XXXXXx menu.price ", menu.price);

//Description
//Image_1
//Image_2
//Image_3
//Image_4
//Location_ID
//Post_ID
//Price
//SubCategory_ID
//TimeStamp
//email
//title



PostList.addItem(menu.postsspecial[0] );

console.log("PostList.getItems = ", PostList.getItems());

// ti, pri, desc, n, em, pw, sj, loc, p1, p2, p3, p4

        // mycounter range from 0 to psize -1 (f postsspecial array has elements in it)
        // mycounter = -1 if array "postsspecial" size = 0, 
        // which means there are no posts from user, then 
        if (menu.psize == 0) {    menu.mycounter = -1; 
        } else { menu.mycounter = 0;  // start out with 1st post
        }

        console.log("postsspecialsize = ", menu.psize);
        // console.log("keys = ", Object.keys(menu.postsspecial[0]));
        // console.log("psizeSelected  " , menu.psizeSelected);
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



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function PostListFactory() {
  var factory = function () {
    return new PostListService();
  };
 // var factory = function (maxItems) { return new PostListService(maxItems); };
  return factory;
}

function PostListService() {
  var service = this;

  // List of Post items
  var items = []; // items = posts

  service.addItem = function (objpost) {
  // (objpost, ti, pri, desc, n, em, pw, sj, loc, p1, p2, p3, p4) {
 /* dont need this
      var item = {
        title: ti, price: pri,
        description: desc,
        name: n,
        email: em,
        password: pw,
        subject: sj,
        location: loc,
        pic1: p1,
        pic2: p2,
        pic3: p3,
        pic4: p4
        //name: itemName,
        //quantity: quantity
      };
*/
      var item = {};
      item = objpost;
      items.push(item);
  

  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

