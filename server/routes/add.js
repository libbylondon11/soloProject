var express=require('express');
var router=express.Router();
var path=require('path');
var pg=require('pg');
var connection=require('../db/connection');
var connectionString=connection.connectionString;

router.get('/', function(request, response){
  console.log('adding');
  var user=request.user;
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      console.log('else adding');
      var resulsts =[];
     client.query('SELECT user_cupboard.product_name, username WHERE username = $1', [user.username], function(err, result){
       if(err){
         console.log(err);
         response.sendStatus(500);
       }else{
        response.send(result.rows)
      }});
    }
  })
})
router.post('/', function(request, response){
  console.log('posting');
  var user=request.user;//from session
  console.log(user);
  console.log(request.body);
  var username=request.body.username;
  var product_name=request.body.product_name;
  var product_id_plu=request.body.product_id_plu;
  var coop_name=request.body.coop_name;
  var user_id=request.body.user_id;

  pg.connect(connectionString, function(err, client, done){

    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      console.log('router post');

     client.query('INSERT INTO user_cupboard (username, product_name, product_id_plu, coop_name, user_id) VALUES ($1, $2, $3, $4, $5) ', [user.username, product_name, product_id_plu, coop_name, user.user_id], function(err, result){
       if(err){
         console.log(err);
         response.sendStatus(500);
       }else{
        response.send(result.rows)
        console.log('Did it make it here?')
      }});
    }
  })
})
  router.get('/*', function(request, response, next){
  response.redirect('/home');
})
module.exports=router;
