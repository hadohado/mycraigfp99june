
<!-- Hi, javascript component name = myComp  and html's comp instantiation = my-comp. -->

<div ng-app="myApp"> 
  <my-comp name="'John'" var1="' var for 1way binding'"> </my-comp>
</div>


<script src="../../bower_components/angular/angular.min.js"></script>

<script>
angular.module("editpostmodule", [])
  .component("editpostcomp",{
      bindings: {
         name:    '@',  // @ binding used for transmitting strings
         var1:    '<',  // < is for one-way binding
         varbidi: '='   // = binding is for two-way model binding. 
                        // The model in parent scope is linked to 
                        // the model in the directive's isolated scope.
       },
      template: 'Hi {{$ctrl.name}}! {{$ctrl.var1}} 
      <input type="text" ng-model=varbidi>{{varbidi}}</input>',     
  });
</script>
