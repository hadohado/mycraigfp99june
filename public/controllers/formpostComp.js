angular.module('editpost')
.component('formpostcomp',  {
// .component('formpostcomp', ['DbService']), {
    // template: "<span>Name: {{$ctrl.hero.name}}</span>",
    templateUrl: "formpostcomp.html",
    controller: formpostcompCtrl,
    bindings: {
        postsspecial: '<' ,
        onRemove: '&'
        // hero: '<'       // 1-way binding
        // hero: '='    // 2-way binding    
        // ,  onDelete: '&'
     }

});

formpostcompCtrl.$inject = [ 'DbService',  '$window'];

function formpostcompCtrl(DbService, $window) {
    var $ctrl = this;

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

