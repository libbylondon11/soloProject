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
//this get is in charge of on each coop views, the button next to them that allows
//the user to "add it to their cupboard."
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
     client.query('SELECT products.product_name, users.username, user_cupboard.product_id_plu from users ' +
     'JOIN user_cupboard ON users.username = user_cupboard.username JOIN products '+
    'ON products.product_name=user_cupboard.product_name WHERE users.username = $1', [user.username], function(err, result){
       if(err){
         console.log(err);
         response.sendStatus(500);
       }else{
         console.log('result', result);
        response.send(result.rows);
        console.log('queried!');
      }});
    }
  })
});
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
//delete specific products from users cupboard///
router.delete("/:id", function(request, response){
  console.log('delete hit');

  var user=request.user;
  var id=request.params.id;
  console.log('ID to delete', request.params.id);
  console.log('User requesting delete', request.user);
  console.log('Query created', 'DELETE FROM user_cupboard WHERE product_id_plu=' +  id + 'AND user_cupboard.user_id='+ user.user_id);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      var results=[];
      // var id=request.params.id;
      var query=client.query('DELETE FROM user_cupboard WHERE product_id_plu= $1 AND user_cupboard.user_id= $2; ', [id, user.user_id] );


      query.on('error', function(error){
        console.log(error);
        console.log('error?');
        response.sendStatus(500);
        done();
      });

      // query.on('row', function(rowData){
      //   results.push(rowData);
      // });

      query.on('end', function(){
        response.send(200);
        done();
        console.log('done');
      });
    }
  });
});
router.get('/*', function(request, response, next){
response.redirect('/home');
})
module.exports=router;
