/**
 * Created by hadoh on 6/8/2016.
 */

//angular.module('customDirApp', [])
//    .controller('customDirAppCtrl', ['$scope', function ($scope) {
angular.module('browsepost', [])
    .controller('browsepostCtrl', ['$scope','$http',  function ($scope, $http) {
        console.log("Hi There from angular controller");

        //$http.get('/contactlist').success(function(response) {
        //		console.log("App controller get data I request");
        //		$scope.contactlist = response;
        //});

        // function getData() {
        $scope.getData = function() {
            // $scope.getData = function($http) {
            console.log("Hey I am here your controller ");
            $http.get('/contactlist').success(function(response) {
                console.log("App controller get data I request");
                $scope.contactlist = response;
                $scope.size = $scope.contactlist.length;
                // console.log("size = ", $scope.size);
               //  document.getElementById("col1").innerHTML = "New text!  size = " + $scope.size;
                mycol0 = "";
                mycol1 = "";
                mycol2 = "";
                // mycol3 = "";
                for (j = 1; j<= $scope.size; j++) {
                    i = j - 1;
                    // $scope.contactlist[i].title;
                    // $scope.contactlist[i].Price;
                    // $scope.contactlist[i].Description;
                    // $scope.contactlist[i].email;

                    // 0 1 2 
                    // 3 4 5
                    // 6 7 8
                    // if ( (i == 0) || ((i % 3) == 0)) {
// + "<a href= /images/" + $scope.contactlist[i].Image_1 + "> <img src=" + 'images/$scope.contactlist[i].Image_1' + "></a>"
//  + "<a href= images/$scope.contactlist[i].Image_1 > <img src='images/$scope.contactlist[i].Image_1' width='140' height='80'></a>"

// next line works !!!
// + "<a href= /images/" + $scope.contactlist[i].Image_1 + "> <img src='images/" + $scope.contactlist[i].Image_1 + "'></a>"

                    if ((j % 3) == 1) {
                        mycol0 += "<div class='container'>" 
                        + "<br>" 
                        + "title: " + $scope.contactlist[i].title 
                        + "<br>"
                        + "price: " + $scope.contactlist[i].Price
                        + "<br>" 
                        + "email: "+ $scope.contactlist[i].email
                        + "<br>"
                        + "location: " + $scope.contactlist[i].Location_ID 
                        + "<br>"
                        + "date: " + $scope.contactlist[i].TimeStamp 
                        + "<br>"

                        + "<a href= /images/" + $scope.contactlist[i].Image_1 + "> <img src='images/" 
                        + $scope.contactlist[i].Image_1 + "' width='280' height='160'></a>"
                        // + $scope.contactlist[i].Image_1 + "' width='140' height='80'></a>"
                        + "</div>" ;
                    }
                    
                    if ((j % 3) == 2) {
                        mycol1 += "<div class='container'>" 
                        + "<br>" 
                        + "title: " + $scope.contactlist[i].title 
                        + "<br>" 
                        + "price: " + $scope.contactlist[i].Price 
                        + "<br>" 
                        + "email: "+ $scope.contactlist[i].email
                        + "<br>"
                        + "location: " + $scope.contactlist[i].Location_ID 
                        + "<br>"
                        + "date: " + $scope.contactlist[i].TimeStamp 
                        + "<br>"
                        + "<a href= /images/" + $scope.contactlist[i].Image_1 + "> <img src='images/" 
                        + $scope.contactlist[i].Image_1 + "' width='280' height='160'></a>"
                        // + $scope.contactlist[i].Image_1 + "' width='140' height='80'></a>"
                       + "</div>" ;
                    }

                    if ((j % 3) == 0) {
                        mycol2 += "<div class='container'>" 
                        + "<br>" 
                        + "title: " + $scope.contactlist[i].title 
                        + "<br>"
                        + "price: " + $scope.contactlist[i].Price
                        + "<br>" 
                        + "email: "+ $scope.contactlist[i].email
                        + "<br>"
                        + "location: " + $scope.contactlist[i].Location_ID 
                        + "<br>"
                        + "date: " + $scope.contactlist[i].TimeStamp 
                        + "<br>"
                        + "<a href= /images/" + $scope.contactlist[i].Image_1 + "> <img src='images/"                  
                        + $scope.contactlist[i].Image_1 + "' width='280' height='160'></a>"

                        // + $scope.contactlist[i].Image_1 + "' width='140' height='80'></a>"
                       + "</div>" ;
                    }


                    // if ((i % 1) == 1) {
                    //if ((i % 1) == 0) {
                    //    mycol1 += $scope.contactlist[i].title + " " + $scope.contactlist[i].Price + "<br>" ;
                    //    //document.getElementById("col1").innerHTML = mycol1;
                    //}
                    //if ((i % 2) == 0) {
                    //    mycol2 += $scope.contactlist[i].title + " " + $scope.contactlist[i].Price + "<br>" ;
                    //    //document.getElementById("col2").innerHTML = mycol2;
                    //}
                    //if ((i % 3) == 0) {
                    //    mycol3 += $scope.contactlist[i].title + " " + $scope.contactlist[i].Price + "<br>" ;
                    //    //document.getElementById("col3").innerHTML = mycol3;
                    //}
                }
                document.getElementById("col0").innerHTML = mycol0;
                document.getElementById("col1").innerHTML = mycol1;
                document.getElementById("col2").innerHTML = mycol2;
                // document.getElementById("col3").innerHTML = mycol3;

            });
        }
        

}])




