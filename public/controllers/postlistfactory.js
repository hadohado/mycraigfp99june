angular.module('editpost')
.factory('PostListFactory', PostListFactory);

function PostListFactory() {
  var factory = function () {
    return new PostListService();
  };
 // var factory = function (maxItems) { return new PostListService(maxItems); };
  return factory;
}

function PostListService() {
  var service = this;

  // List of Post items
  var items = []; // items = posts

  service.addItem = function (ti, pri, desc, n, em, pw, sj, loc, p1, p2, p3, p4) {
 
      var item = {
      	title: ti,
      	price: pri,
      	description: desc,
      	name: n,
      	email: em,
      	password: pw,
      	subject: sj,
      	location: loc,
      	pic1: p1,
      	pic2: p2,
      	pic3: p3,
      	pic4: p4
        //name: itemName,
        //quantity: quantity
      };

      items.push(item);
  

  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}