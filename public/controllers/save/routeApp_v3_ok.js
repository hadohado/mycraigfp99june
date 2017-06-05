/**
 * Created by hadoh on 6/8/2016.
 */

// angular.module('routeApp', ['route', 'page1', 'page2', 'myDirective'])
// angular.module('routeApp', ['ngRoute', 'page1', 'page2', 'page3Ctrl'])
// angular.module('your main angular module name', [ name of other angular modules this angular module depends on]  )
angular.module('routeApp', ['ngRoute', 'page1', 'page2', 'page3angularmodule', 'page4newpost', 'page5browsePost'])
    .config(function($routeProvider) {
        $routeProvider.when('/page1', {
            controller: 'page1Ctrl',
            templateUrl: 'page1.html'  //   ../page1.html
        });
         $routeProvider.when('/page2', {
             controller: 'page2Ctrl',
            templateUrl: 'page2.html'

        });
        $routeProvider.when('/page3view', {
            controller: 'page3Ctrl',
            templateUrl: 'page3.html'
        });

        $routeProvider.when('/page4newpost', {
            controller: 'page4newpostCtrl',
            templateUrl: 'page4newpost.html'
        });

        $routeProvider.when('/page5browsePost', {
            controller: 'page5browsePostCtrl',
            templateUrl: 'postUser/page5browsePost.html'
        });


         $routeProvider.otherwise( {
           redirectTo: '/page1'
        })


});
