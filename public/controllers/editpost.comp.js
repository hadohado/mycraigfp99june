angular.module('editpost')
.component('displaypostcomp',  {
// .component('displaypostcomp', ['DbService']), {
    // template: "<span>Name: {{$ctrl.hero.name}}</span>",
    templateUrl: "displaypostcomp.html",
    controller: displaypostcompCtrl,
    bindings: {
        postsspecial: '<',
        postlist: '=',
        wonderwoman: '<',
        book: '<',
        hero: '<'       // 1-way binding
        // hero: '='    // 2-way binding
        ,  onRemove: '&'
        // ,  onDelete: '&'
     }

});

displaypostcompCtrl.$inject = ['DbService'];

function displaypostcompCtrl(DbService) {
    var $ctrl = this;
    
    $ctrl.testingYou = function (postid) {
        console.log("displaypostcompCtrl  testingYou = ", postid)
        DbService.hiIamTesting(postid);
    }

    $ctrl.remove = function (mypostid) {
    $ctrl.onRemove({ postid: mypostid });
  };
}

