/**
 * Created by hadoh on 6/8/2016.
 */

//angular.module('customDirApp', [])
//    .controller('customDirAppCtrl', ['$scope', function ($scope) {
angular.module('browsepostselective', [])
    .controller('browsepostselectiveCtrl', ['$scope','$http',  function ($scope, $http) {
        console.log("Hi There from angular controller");
        $scope.selection =  {} ;

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
//  console.log('The original string is: "' + stringToSplit + '"');
//  console.log('The separator is: "' + separator + '"');
//  console.log('The array has ' + arrayOfStrings.length + ' elements: ' + arrayOfStrings.join(' / '));
}
var space = ' ';
// var comma = ',';

// timestamp =  2017-03-19T05:42:57.000Z
//              2017-03-19    T    05:42:57    .000Z
// var t = .split(/[- : T]/);
// var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

// Split timestamp into [ Y, M, D, h, m, s ]
// var t = "2010-06-09 13:12:01".split(/[- :]/);
// Apply each element to the Date function
// var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
// console.log(d);
// -> Wed Jun 09 2010 14:12:01 GMT+0100 (BST)



$scope.getDataUsingPost = function () {
     $http.post('/postcontactlistselective', $scope.selection)
                .success(function (data, status, headers, config, statusText) {
                    $scope.contactlist = data;
                //  $scope.contactlist = response;
                $scope.size = $scope.contactlist.length;
                // console.log("size = ", $scope.size);
               //  document.getElementById("col1").innerHTML = "New text!  size = " + $scope.size;
                mycol0 = "";
                mycol1 = "";
                mycol2 = "";
                // mycol3 = "";
                for (j = 1; j<= $scope.size; j++) {
                    i = j - 1;

        tstamp =   $scope.contactlist[i].TimeStamp;
        t = tstamp.split(/[- : . T]/);
        d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        // d = new Date(Date.UTC(t[0], t[1]-1));

         month = d.getUTCMonth() + 1; //months from 1-12
         day   = d.getUTCDate();
         year  = d.getUTCFullYear();
         console.log("month = ", month, "day = ", day, "year = ", year);
        console.log("New date ", d);
        // New date  Sat Mar 18 2017 22:44:33 GMT-0700 (PDT)
        // d2 = d.split[/[" "]/];
        // d2 = splitString(d, space);
        // d2 = d.split(space);
        // console.log("d[1] and d[2] ", d[1], d[2]);

        console.log("timestamp = ", $scope.contactlist[i].TimeStamp);
        // console.log("Day = ", timeConverter($scope.contactlist[i].TimeStamp) );


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


                }
                
                document.getElementById("col0bs").innerHTML = mycol0;
                document.getElementById("col1bs").innerHTML = mycol1;
                document.getElementById("col2bs").innerHTML = mycol2;

        


                }).error(function (message, data, status, headers, config, statusText) {
                    console.log('Oops we ran into an error ' + message);
                })
}


        

}])




