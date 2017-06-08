angular.module('editpost')
.component('formpostcomp',  {
// .component('formpostcomp', ['DbService']), {
    // template: "<span>Name: {{$ctrl.hero.name}}</span>",
    templateUrl: "formpostcomp.html",
    controller: formpostcompCtrl,
    bindings: {
        postsspecial: '<' ,
        psize: '<',
        mysi:  '<',
        psizeSelected: '<',
        onRemove: '&',
        mycounter: '<',

        title: '=',
        price: '<',// price: '=',
        description: '='
        // hero: '<'       // 1-way binding
        // hero: '='    // 2-way binding    
        // ,  onDelete: '&'
     }

});

formpostcompCtrl.$inject = [ 'DbService',  '$window', '$scope'];

function formpostcompCtrl(DbService, $window, $scope) {
    var $ctrl = this;

        $ctrl.person = {}; 
        $ctrl.titleInvalid = false;
        $ctrl.priceInvalid = false;
        $ctrl.descriptionInvalid = false;
        $ctrl.emailInvalid = false;
        $ctrl.passwordInvalid = false;
        $ctrl.researchInvalid = false;
        $ctrl.regionsInvalid = false;
        $ctrl.doShow = false;

        //-----
        // try to initialize some values in the form 
        //-----
        // $ctrl.person.title = title;$scope
        $ctrl.person.title = "paris account clear";
        // $ctrl.person.price = 777888888; // this works
        $ctrl.person.price = $ctrl.price; // undefined
        console.log(" ####### $ctrl.price = ", $ctrl.price, " price = ", price );
        // $ctrl.person.price = $scope.$parent.price;
        // $ctrl.person.price = $scope.price;
        // $ctrl.person.price = price;

// var $button = document.querySelector('.increment-btn');
// var $counter = document.querySelector('.counter');
// $button.addEventListener('click', function(){
//  $counter.value = parseInt($counter.value) + 1; 
  // `parseInt` converts the `value` from a string to a number
// }, false);

    //---------------------------------------------------------
    // this whole section works 
    // (must have <input..> and <button..> in formpostComp.html)
    //---------------------------------------------------------
    // <button type="button" class="decrement-btn">Decrement</button>
    // <input type="text" class="counter" value="1"/>
    // <button type="button" class="increment-btn">Increment</button>
    
    /*
    var $counter = document.querySelector('.counter');
    var $button = document.querySelector('.increment-btn');    
    $button.addEventListener('click', function(){
        if ($counter.value < 5) {
        $counter.value = parseInt($counter.value) + 1; }
        // `parseInt`  string to a number
    }, false);
    var $buttondec = document.querySelector('.decrement-btn');
    $buttondec.addEventListener('click', function(){
        if ($counter.value > 0) {
        $counter.value = parseInt($counter.value) - 1; }
    }, false);
    */

    //---------------------------------------------------------

    $ctrl.edit1post = function (postid, $window) {

        console.log("formpostcompCtrl  edit 1 post = ", postid);

        // DbService.hiIamTesting(postid);
        // window.location.href = 'http://localhost:3000/#/newpost';
        // next line works, but we need to also send post_ID to the page
        window.location.href = '/newpost.html';
    }

    $ctrl.removepost = function (postid) { // copied from testingYou()  5-31
        console.log("formpostcompCtrl  testingYou = ", postid);
        DbService.hiIamTesting(postid);
    }

    $ctrl.testingYou = function (postid) {
        console.log("formpostcompCtrl  testingYou = ", postid);
        DbService.hiIamTesting(postid);
    }

    // Add DbService.hiIamTesting(postid), now we can delete post !!! 5-31
    // $ctrl.remove = function (mypostid) {
    //    console.log("formpostcompCtrl remove() mypostid = ", mypostid);
    //    DbService.hiIamTesting(postid);
        // $ctrl.onRemove({ postid: mypostid });
    //};
}

