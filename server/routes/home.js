var express=require('express');
var router=express.Router();
var path=require('path');
var pg=require('pg');
var connectionString='postgres://localhost:5432/white';

router.get('/*', function(request, response, next){
  if(request.isAuthenticated()){
    next();
  } else {
    response.send('404 not found');
  }
})
router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/homeView.html'));
  console.log('home.js');
})
module.exports=router;
