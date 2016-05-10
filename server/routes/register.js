var express=require('express');
var router=express.Router();
var passport=require('passport');
var path=require('path');
var bourbon = require('node-bourbon');
var pg=require('pg');
var connectionString='postgres://localhost:5432/white';
var encryption=require("../../modules/encryption");//deal with encryption later.

router.get('/', function(request, response, next){
  response.sendFile(path.join(__dirname, '../public/views/registerView.html'));
});

router.post('/', function(request, response, next){
  console.log(request.body);
  pg.connect(connectionString, function(err, client){

  var user={
    username: request.body.username,
    // password: bcrypt.encryptPassword.request.body.password
    password: encryption.encryptPassword(request.body.password)//use this instead of above for encryption
  }
  console.log('Creating user with these values:', user);
  var query=client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [user.username, user.password]);
    query.on('error', function(err){
      console.log(err);
    })
    query.on('end', function(){
      response.redirect('/');
      client.end();
      })
    })
})
module.exports=router;
