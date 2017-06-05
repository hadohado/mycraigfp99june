/**
 * Created by hadoh on 6/8/2016.
 */

//angular.module('customDirApp', [])
//    .controller('customDirAppCtrl', ['$scope', function ($scope) {
angular.module('page3', [])
    .controller('page3Ctrl', ['$scope', function ($scope) {

                $scope.logMouseOver = function () {
        console.log("Users hovers mouse over message");
    };
}])
// call directive( ) function to register a custom directive
    .directive('myDirectiveMouseOver', function () {
        return { // return function or config object
            restrict: 'E', // 'E' means  this directive is for a HTML element
            // value of template will replace the custom directive 'myDirectiveMouseOver' in HTML page
            template: '<div>"Console will log a message when user hovers mouse over this message"</div>',
            link: function (scope, element, attr) {
                console.log(attr['onEnter']);
                element.bind("mouseover", function () { // whenever there is mouseover event calls logMouseOver()
                    scope.logMouseOver();
                })
            }
        };
    })

