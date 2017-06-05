/**
 * Created by hadoh on 6/8/2016.
 */

// angular.module("registerApp", [])
angular.module("page4newpost", [])
    .controller("page4newpostCtrl",['$scope','$http', function ($scope, $http) { //regCtrl
        $scope.person = {}; // will contain title, email, password, channels, hearFromUs
        $scope.titleInvalid = false;

        $scope.priceInvalid = false;
        $scope.descriptionInvalid = false;

        $scope.emailInvalid = false;
        $scope.passwordInvalid = false;
        $scope.researchInvalid = false;
        $scope.regionsInvalid = false;
        $scope.hearFromUsInvalid = false;
        $scope.doShow = false;

            $scope.person.channels = [
                { value: "software", label: "software" },
                { value: "accouting", label: "accounting" },
                { value: "business", label: "business" },
                { value: "apartment", label: "apartment" },
                { value: "office", label: "office"},
                { value: "vacation_rental", label: "vacation_rental"},
                { value: "jewelry", label: "jewelry" },
                { value: "household", label: "household"},
                { value: "electronics", label: "electronics"}
            ];

        $scope.person.regions = [
            { value: "san francisco", label: "san francisco" },
            { value: "LA", label: "LA" },
            { value: "washington", label: "washington" },
            { value: "paris", label: "paris" },
            { value: "rome", label: "rome"},
            { value: "london", label: "london"},
            { value: "saigon", label: "saigon" },
            { value: "tokyo", label: "tokyo"},
            { value: "delhi", label: "delhi"}
        ];

        $scope.person.hearFromUs = true; // false;


        $scope.register =  function(){  // register variable of $scope is defined as a function()
          
            if ( (!$scope.registrationForm.title.$valid))     {
                $scope.titleInvalid = true;
            }



            if(!$scope.registrationForm.price.$valid){
                $scope.priceInvalid = true;
            }
            if(!$scope.registrationForm.description.$valid){
                $scope.descriptionInvalid = true;
            }



            if(!$scope.registrationForm.email.$valid){
                $scope.emailInvalid = true;
            }

            if(!$scope.registrationForm.password.$valid){
                $scope.passwordInvalid = true;
            }
            if(!$scope.registrationForm.hearFromUs.$valid){
                $scope.hearFromUsInvalid = true;
            }
            if(!$scope.registrationForm.channels.$valid){
                $scope.researchInvalid = true;
            }
            if(!$scope.registrationForm.regions.$valid){
                $scope.regionsInvalid = true;
            }
         
            //==============

            // console.log("DEBUG     Hey I am writing to database ");
            // $http.post('/newpost', {Title: $scope.person.title , Email: $scope.person.email}).success(function(response) {
            //    console.log("App controller SEND newthigns");
            //   $scope.contactlist = response;
            // });


            if($scope.registrationForm.$valid){
                $scope.doShow = true;
                
                console.log("Hey I am writing to database ");
               // JUNK $http.setRequestHeader("Content-type", "application/json charset=UTF-8");
                //$http.post('/newpost').success(function(response) {
                // GOOD           $http.post('/newpost', {Title: "newthigns", Email: "giant_mail@yahoo.com"}).success(function(response) {
                $http.post('/newpost', {Title: $scope.person.title , Email: $scope.person.email}).success(function(response) {
                //   $http.post('/newpost', {Title: $scope.registrationForm.title , Email: $scope.registrationForm.email}).success(function(response) {
                    
                    console.log("App controller SEND newthigns");
                    $scope.contactlist = response;
                });

            }
            
            // console.log("Hey I am writing to database ");
            // $http.post('/newpost').success(function(response) {
            //    console.log("App controller get data I request");
            //    $scope.contactlist = response;
            // });


        };
    }
    ]
    );

