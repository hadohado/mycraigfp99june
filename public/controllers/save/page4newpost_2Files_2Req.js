/**
 * Created by hadoh on 6/8/2016.
 */

// angular.module("registerApp", [])
angular.module("page4newpost", ['ngFileUpload'])
    .controller("page4newpostCtrl",['$scope', 'Upload', '$http', '$timeout', function ($scope, Upload, $http, $timeout) { //regCtrl
        $scope.person = {}; // will contain title, email, password, channels, hearFromUs
        $scope.titleInvalid = false;

        $scope.priceInvalid = false;
        $scope.descriptionInvalid = false;

        $scope.emailInvalid = false;
        $scope.passwordInvalid = false;
        $scope.researchInvalid = false;
        $scope.regionsInvalid = false;
        $scope.hearFromUsInvalid = false; // agreement
        $scope.doShow = false;

        //-----------------------------------------------
        // 9-5
        // this is latest function uploadPic()
        // it actually send image file and other field like title, email  to server
        //------------------------------------------------
        //  $scope.picFile = picFile;
        $scope.uploadPic = function(files) {

            angular.forEach(files, function(file) {
                file.upload = Upload.upload({
                    url: './newpost2',
                    data: {title: $scope.person.title,
                        price: $scope.person.price,
                        description: $scope.person.description,
                        email: $scope.person.email,
                        password: $scope.person.password,
                        subcategory: $scope.person.channels,
                        region: $scope.person.regions,
                        file: file}
                    //data: {file: file}
                });
            });



            /*
            file.upload = Upload.upload({
                url: '/newpost2', // <--  server will accept image & fields when it get this url request end point (/newpost2)
                // url: 'page4newpost.html',
                //url: './upload',  // url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                
                data: {title: $scope.person.title,
                        price: $scope.person.price,
                        description: $scope.person.description,
                        email: $scope.person.email,
                        password: $scope.person.password,
                        subcategory: $scope.person.channels,
                        region: $scope.person.regions,
                        file: file}
                });
            */

                console.log("person chanel = ", $scope.person.channels);

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log("uploadPic  title = ", $scope.person.title); // My
                        // console.log("file ", file.result);
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });

                console.log("username = ", $scope.person.title);
            }




            $scope.person.channels = [
                { value: "1", label: "software" },
                { value: "2", label: "accounting" },
                { value: "3", label: "business" },
                { value: "4", label: "apartment" },
                { value: "5", label: "office"},
                { value: "6", label: "vacation_rental"},
                { value: "7", label: "jewelry" },
                { value: "8", label: "household"},
                { value: "9", label: "electronics"}
            ];

        $scope.person.regions = [
            { value: "1", label: "san francisco" },
            { value: "2", label: "LA" },
            { value: "3", label: "washington" },
            { value: "4", label: "paris" },
            { value: "5", label: "rome"},
            { value: "6", label: "london"},
            { value: "7", label: "saigon" },
            { value: "8", label: "tokyo"},
            { value: "9", label: "delhi"}
        ];

        $scope.person.hearFromUs = true; // false;

        mytimestampz = new Date().toISOString().slice(0, 19).replace('T', ' ');
        $scope.mytimestamp = mytimestampz;

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

/*
            if($scope.registrationForm.$valid){
                $scope.doShow = true;
                
                console.log("Hey I am writing to database ");
               // JUNK $http.setRequestHeader("Content-type", "application/json charset=UTF-8");
                //$http.post('/newpost').success(function(response) {
                // GOOD           $http.post('/newpost', {Title: "newthigns", Email: "giant_mail@yahoo.com"}).success(function(response) {
                //   $http.post('/newpost', {Title: $scope.registrationForm.title , Email: $scope.registrationForm.email}).success(function(response) {
                // $http.post('/newpost', {Title: $scope.person.title , Email: $scope.person.email}).success(function(response) {

                $http.post('/newpost',
                    {
                        SubCategory_ID: $scope.person.channels,
                        Location_ID: $scope.person.regions,
                        Image1: $scope.person.image1,   // --------------------------- add july 25
                        Title: $scope.person.title ,
                            Price: $scope.person.price,
                            Description: $scope.person.description,
                        Email: $scope.person.email,
                            Agreement: $scope.person.hearFromUs,
                        Timestamp: $scope.mytimestamp
                       //  Timestamp: Date.now().toISOString().slice(0, 19).replace('T', ' ')
                        //toISOString().slice(0, 19).replace('T', ' ');
                            // Timestamp: Math.floor(Date.now() / 1000)
                    }
                          ).success(function(response) {
                    console.log("App controller SEND newthigns");
                    $scope.contactlist = response;
                }


                );

            }
*/
            
            /*
             CREATE TABLE IF NOT EXISTS `posts` (
             `Post_ID` int(11) NOT NULL AUTO_INCREMENT,
             `Title` char(90) NOT NULL,
             `Price` float DEFAULT NULL,
             `Description` text,
             `Email` char(90) DEFAULT NULL,
             `Agreement` tinyint(1) DEFAULT NULL,
             `TimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
             `Image_1` text,
             `Image_2` text,
             `Image_3` text,
             `Image_4` text,
             `SubCategory_ID` int(11) DEFAULT NULL,
             `Location_ID` int(11) DEFAULT NULL,
             PRIMARY KEY (`Post_ID`),
             KEY `SubCategory_ID` (`SubCategory_ID`),
             KEY `Location_ID` (`Location_ID`)
             ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
             */

            // console.log("Hey I am writing to database ");
            // $http.post('/newpost').success(function(response) {
            //    console.log("App controller get data I request");
            //    $scope.contactlist = response;
            // });


        };
    }
    ]
    );

