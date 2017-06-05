/**
 * Created by hadoh on 6/8/2016.
 */

// angular.module("registerApp", [])
angular.module("register2", ['ngFileUpload'])
    .controller("register2Ctrl",['$scope', 'Upload', '$http', '$timeout', function ($scope, Upload, $http, $timeout) { //regCtrl
        $scope.person = {}; 

        $scope.descriptionInvalid = false;

        $scope.emailInvalid = false;
        $scope.passwordInvalid = false;

        $scope.doShow = false;

 
            $scope.registeruploadPic = function (files) {
                $scope.files = files;

                if (files && files.length) {
                    Upload.upload({
                        //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                        url: './registernewpost2',
                        data: {
 
                            description: $scope.person.description,
                            email: $scope.person.email,
                            password: $scope.person.password,

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
        
           

        mytimestampz = new Date().toISOString().slice(0, 19).replace('T', ' ');
        $scope.mytimestamp = mytimestampz;

        $scope.register =  function(){  // register variable of $scope is defined as a function()
          
            //if ( (!$scope.registrationForm.title.$valid))     {
             //   $scope.titleInvalid = true;
            //}
            //if(!$scope.registrationForm.price.$valid){
            //    $scope.priceInvalid = true;
            //}
            if(!$scope.registrationForm.description.$valid){
                $scope.descriptionInvalid = true;
            }
            if(!$scope.registrationForm.email.$valid){
                $scope.emailInvalid = true;
            }
            if(!$scope.registrationForm.password.$valid){
                $scope.passwordInvalid = true;
            }
            //if(!$scope.registrationForm.hearFromUs.$valid){
            //    $scope.hearFromUsInvalid = true;
            //}
            //if(!$scope.registrationForm.channels.$valid){
            //    $scope.researchInvalid = true;
            //}
            //if(!$scope.registrationForm.regions.$valid){
            //    $scope.regionsInvalid = true;
            //}
        };
    }
    ]
    );

