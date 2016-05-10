var express=require('express');
var router=express.Router();
var path=require('path');
var pg=require('pg');
var bourbon = require('node-bourbon');
var connection=require('../db/connection');
var connectionString=connection.connectionString;
// router.get('/*', function(request, response){
//   console.log('home *');
//   response.sendFile(path.join(__dirname, '../public/views/home.html'));
// })
router.get('/', function(request, response){
  console.log('getting the usernames and products');
  var user=request.user;

  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      console.log('else users');
      // var product_name=request.body.product_name;
      // var product_id_plu=request.body.product_id_plu;
     client.query('SELECT products.product_name, users.username from users ' +
     'JOIN user_cupboard ON users.username = user_cupboard.username JOIN products '+
    'ON products.product_name=user_cupboard.product_name WHERE users.username = $1', [user.username], function(err, result){
       if(err){
         console.log(err);
         response.sendStatus(500);
       }else{
        response.send(result.rows)
      }});
    }
  })
})
module.exports=router;
