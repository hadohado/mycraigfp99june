$scope.getDataUsingPost = function () {
    // $http.post('/postcontactlistselective', $scope.selection)
    $http.post('/editpost', $scope.person)
    .success(function (data, status, headers, config, statusText) {
        $scope.contactlist = data;
         postlist = data;
         //this.postlist = data;

       // console.log("http.post this.postlist = ", postlist);

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
            mycol0 += "<div class='container'>" 
        + "<br>"
        + "<button ng-click='editpost();'>" + "Edit post" + "</button>"

            + "<br>" 
            + "title: " + $scope.contactlist[i].title 
            + "<br>"
            + "price: " + $scope.contactlist[i].Price
            + "<br>" 
            + "email: "+ $scope.contactlist[i].email
            + "<br>"            
            + "location: " + $scope.contactlist[i].Location_ID 
            + "<br>"
            + "category: " + $scope.contactlist[i].SubCategory_ID 
            + "<br>"
            + "date: " + $scope.contactlist[i].TimeStamp 
            + "<br>"

 + "<a href= /images/" + $scope.contactlist[i].Image_1 + "> <img src='images/" 
 + $scope.contactlist[i].Image_1 + "' width='280' height='160'></a>"
 + "</div>" ;
        }
        document.getElementById("col0bs").innerHTML = mycol0;

        }).error(function (message, data, status, headers, config, statusText) {
            console.log('Oops we ran into an error ' + message);
        })
}
