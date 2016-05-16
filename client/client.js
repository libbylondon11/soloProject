var app=angular.module('whiteApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    remplateUrl: 'views/homeView.html',
    controller: 'HomeController',
    controllerAs: 'home'
  })
  .when('/eastsideView', {
    templateUrl: 'views/eastsideView.html',
    controller: 'EastsideController',
    controllerAs: 'eastside'
  })
  .when('/sewardView', {
    templateUrl: 'views/sewardView.html',
    controller: 'SewardController',
    controllerAs: 'seward'
  })
  .when('/wedgeView', {
    templateUrl: 'views/wedgeView.html',
    controller: 'WedgeController',
    controllerAs: 'wedge'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'login'
  })
  .when('/registerView', {
    templateUrl: 'views/registerView.html',
    controller: 'RegisterController',
    controllerAs: 'register'
  })
  .when('/userCupboard', {
    templateUrl: 'views/userCupboard.html',
    controller: 'UserController',
    controllerAs: 'user'
  })
  $locationProvider.html5Mode(true);

}])

app.controller('LoginController', function(){
  this.message="log in";
})

app.controller('HomeController', function(){
  this.message="select your coop";
})

app.controller('SewardController', ['$http', function($http){
  var vm=this;
  vm.name="Seward Friendship Co-op";
  vm.id=2;
  // this.coopArray=[];
  this.coopArray={};
  // this.message="Select your white powder(s):";
  $http.get("/coops/" + vm.id).then(function(response){
    vm.coopArray=response.data;
    console.log(response);
  })
  vm.addToUserCupboard=function(item){
    console.log('item added to user cupboard');
    item.coop_name = vm.name;
    $http.post('/userPage', item).then(function(response){
      console.log('add to user', response);
    })
  };

}])
app.controller('EastsideController', ['$http', function($http){
  var vm=this;
  vm.name = "Eastside Co-op";
  vm.id=1;
  this.coopArray={};
  // this.message="Select your white powder(s):";
  $http.get("/coops/" + vm.id).then(function(response){
    vm.coopArray=response.data;

    console.log(response);
  })
  vm.addToUserCupboard=function(item){
    console.log('item added to user cupboard');
    item.coop_name = vm.name;
    $http.post('/userPage', item).then(function(response){
      console.log('add to user', response);
    })
  };
}])

app.controller('WedgeController', ['$http', function($http){
  var vm=this;
  vm.name="Wedge Co-op";
  vm.id=3;
  this.coopArray={};
  // this.message="Select your white powder(s)";
  $http.get("/coops/"+ vm.id).then(function(response){
    vm.coopArray=response.data;

    console.log(response);
  })
  vm.addToUserCupboard=function(item){
    console.log('item added to user cupboard');
    item.coop_name = vm.name;
    $http.post('/userPage', item).then(function(response){
      console.log('add to user', response);
    })
  };
}])

app.controller('UserController', ['UserService', '$http', function(UserService, $http){
  var vm=this;

  vm.cupboardContentsArray={};

  //Binding service data
  vm.data=UserService.user;

  UserService.getUserData();

  vm.message="Here is your cupboard full of white powders. Consider labeling them!";
  // $http.get("/userPage").then(function(response){
  //   console.log('userPage', response);
  //   vm.cupboardContentsArray=response.data;
  //
  // })
  vm.deleteItem = function(product){
    console.log(product);
    UserService.deleteItemFromCupboard(product.product_id_plu)
  };

  // function init(){
  //   UserService.getUserData();
  //   //more things here
  // }

}])
app.factory('UserService', ['$http', function($http){

  var user={};

  var deleteItemFromCupboard=function(id){
    console.log('hit service');
    $http.delete('/userPage/'+ id).then(function(response){
      console.log(response);
      getUserData();
    })
  }
  var getUserData=function(){
    $http.get('/userPage').then(function(response){
      console.log(response);
      user.cupboardContentsArray = response.data;
      console.log('user is', user.cupboardContentsArray);
    });
  };
  return {
    user: user,
    getUserData: getUserData,
    deleteItemFromCupboard: deleteItemFromCupboard
  };

  // var deleteItem=function(){
  //   $http.delete('/userPage').then(function(response){
  //     console.log(response)
  //     user.infor=response.data;
  //     console.log('deleting...')
  //   });
  // };
  //
  // return {
  //   user: user,
  //   deleteItem: deleteItem
  // };

}]);
