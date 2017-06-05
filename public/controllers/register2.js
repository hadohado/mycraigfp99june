/**
 * Created by viveksh2 on 6/15/15.
 */

// angular.module("registrationApp", [])
//    .controller("regCtrl", 
//        ["$http", function ($scope, $http) {
 angular.module("register2", ['ngFileUpload'])
    .controller("register2Ctrl",
    ['$scope', 'Upload', '$http', '$timeout',
     function ($scope, Upload, $http, $timeout) {            
        $scope.person = {};
        $scope.nameInvalid = false;
        $scope.passwordInvalid = false;
        $scope.emailInvalid = false;
        
        $scope.doShow = false;

        $scope.register =  function(){
            if(!$scope.registrationForm.name.$valid){
                $scope.nameInvalid = true;
            }

            if(!$scope.registrationForm.password.$valid){
                $scope.passwordInvalid = true;
            }

            if(!$scope.registrationForm.email.$valid){
                $scope.emailInvalid = true;
            }

            if($scope.registrationForm.$valid) { 
                $scope.doShow = true;
                <!-- pending implementation -->
                sendData = $scope.person;
                $http.post('/register', sendData)
                 .then(successCallback, errorCallback);
                function successCallback(response) {
                    console.log("httpPost response.data = ", response.data);   
                };
                function errorCallback(error) {
                };
            }

        };

    }] );
