            $scope.uploadPic = function (files) {
                $scope.files = files;
                // $scope.title = title; // <-- dont do assign to title here either !!!
                // $scope.errFiles = errFiles;
                // data: {title: $scope.title};

                if (files && files.length) {
                    console.log("newpost $scope.person = ", $scope.person);

                    Upload.upload({
                        //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                        url: './newpost2',
                        data: {
                            post_id: 155,
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