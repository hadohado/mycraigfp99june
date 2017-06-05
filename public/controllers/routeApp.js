/**
 * Created by hadoh on 6/8/2016.
 */

// angular.module('routeApp', ['route', 'page1', 'page2', 'myDirective'])
// angular.module('routeApp', ['ngRoute', 'page1', 'page2', 'page3Ctrl'])
// angular.module('your main angular module name', [ name of other angular modules this angular module depends on]  )
// angular.module('routeApp', ['ngRoute', 'register', 'login', 'page3angularmodule', 'newpost', 'browsepost'])
// ['ngRoute', 'home',   'login',  'newpost', 'browsepost', 'register2', 'browsepostselective'])
angular.module('routeApp', 
    ['ngRoute',  'login',  'newpost',  'register2', 'browsepostselective', 'editpost'])
    .config(function($routeProvider) {
        
         $routeProvider.when('/login', {
             controller: 'loginCtrl',
            templateUrl: 'login.html'
        });

        $routeProvider.when('/browsepostselective', {
            controller: 'browsepostselectiveCtrl',
            templateUrl: 'browsepostselective.html'
        });

        $routeProvider.when('/newpost', {
            controller: 'newpostCtrl',
            templateUrl: 'newpost.html'
        });

        //$routeProvider.when('/browsepost', {
        //    controller: 'browsepostCtrl',
        //    templateUrl: 'browsepost.html'
        //});
       
       $routeProvider.when('/newpostdelete', {
            controller: 'newpostdeleteCtrl',
            templateUrl: 'newpostdelete.html'
        });

        $routeProvider.when('/register2', {
            controller:  'register2Ctrl',
            templateUrl: 'register2.html'
        });

        $routeProvider.when('/editpost', {
            controller: 'editpostCtrl',
            templateUrl: 'editpost.html'
        });

         $routeProvider.otherwise( {
           redirectTo: '/editpost' 
        })
});


