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
  vm.id=2;
  // this.coopArray=[];
  this.coopArray={};
  this.message="select your white powder:";
  $http.get("/coops/" + vm.id).then(function(response){
    vm.coopArray=response.data;
    // vm.coopArray=response.id;
    console.log(response);
  })
}])
app.controller('EastsideController', ['$http', function($http){
  var vm=this;
  vm.name = "Eastside Co-op";
  vm.id=1;
  this.coopArray={};
  this.message="welcome to eastside; select your white powder";
  $http.get("/coops/" + vm.id).then(function(response){
    vm.coopArray=response.data;

    console.log(response);
  })
  vm.addToUserCupboard=function(item){
    console.log('item added to user cupboard');
    item.coop_name = vm.name;
    $http.post('/add', item).then(function(response){
      console.log('add to user', response);
    })
  };
}])

app.controller('WedgeController', ['$http', function($http){
  var vm=this;
  vm.id=3;
  this.coopArray={};
  this.message="Here are the white powder names";
  $http.get("/coops/"+ vm.id).then(function(response){
    vm.coopArray=response.data;

    console.log(response);
  })
}])
app.controller('UserController', ['UserService', function(UserService, $http){
  var vm=this;
  UserService.getUserData();
  vm.user=UserService.user;
  this.message="Hey user, here is your cupboard full of white powders";
  $http.get("/userPage/" + vm.user).then(function(response){
    console.log(response);
    UserService.getUserData();
  })
}])
app.factory('UserService', ['$http', function($http){

  var user={};

  var getUserData=function(){
    $http.get('/').then(function(response){
      console.log(response);
      user.info=response.data;
      console.log('user is', user.info);
    });
  };
  return {
    user: user,
    getUserData: getUserData
  };
}]);
