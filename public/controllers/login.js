/**
 * Created by hadoh on 6/8/2016.
 */

// angular.module("registerApp", [])
// angular.module("page2", [])
 //   .controller("page2Ctrl", function ($scope) { //regCtrl
angular.module("login", [])
    .controller("loginCtrl", function ($scope, $http) { //regCtrl
 
    // state: 1- initial
    // state: 2- form filled out & submit
    // state: 3- server response: (login = invalid / valid) 
    //
    //              regFValid  serverResponse   loginValid
    // state: 1     0          0                x 
    // state: 2     1          0                x
    // state: 3     1          1                0/1

        $scope.person = {}; // will contain name, email, password
        // $scope.nameInvalid = false;
        $scope.emailInvalid = false;
        $scope.passwordInvalid = false;
        $scope.loginValid = false;
        //$scope.researchInvalid = false;
        // $scope.hearFromUsInvalid = false;
        $scope.registrationFormValid = false;
        $scope.doShow = false;

        $scope.login =  function(){  // register variable of $scope is defined as a function()
            // if ( (!$scope.registrationForm.name.$valid))     {
            //    $scope.nameInvalid = true;
            // }

            if(!$scope.registrationForm.email.$valid){
                $scope.emailInvalid = true;
            }
            if(!$scope.registrationForm.password.$valid){
                $scope.passwordInvalid = true;
            }
            if($scope.registrationForm.$valid){
                $scope.registrationFormValid = true;
            }
            data = {
                    email: $scope.person.email,
                    password: $scope.person.password
                }
                console.log("User type this ",data);

            $http.get('/loginList').success(function(response) {
                console.log("App controller get data I request");
                $scope.contactlist = response;
                console.log("Login return ", $scope.contactlist);
                for (i=0; i< $scope.contactlist.length; i++) {
                    if ( (data.email == $scope.contactlist[i].email) &&
                        (data.password == $scope.contactlist[i].password)  ) {
                        console.log("email match email = ", data.email, "password = ", data.password);
                        $scope.loginValid = true;
                        // $scope.doShow = false;
                        break;
                    } else {
                        console.log("email not matched yet");
                        $scope.loginValid = false;
                        // $scope.doShow = false;
                    }
                }
                console.log("loginValid = ", $scope.loginValid );
            });

// $http.post("/customer/data/autocomplete", {term: searchString}, {headers: {'Content-Type': 'application/json'} })
//        .then(function (response) {
 //           return response;
 //       })


/*
    // var parameter = JSON.stringify({type:"user", username:user_email, password:user_password});
    var parameter = JSON.stringify(data);
    // $http.post(url, parameter).
    $http.post('/loginServer', parameter).
    success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("login.js GET THIS   ", data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    */

        };
    });

