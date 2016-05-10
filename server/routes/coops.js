var express=require('express');
var router=express.Router();
var path=require('path');
var pg=require('pg');
var connection=require('../db/connection');
var connectionString=connection.connectionString;
// router.get('/*', function(request, response){
//   console.log('home *');
//   response.sendFile(path.join(__dirname, '../public/views/home.html'));
// })
router.get('/:id', function(request, response){
  console.log('getting the plu s and names');
  var id=request.params.id;
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      console.log('else coop');
      // var product_name=request.body.product_name;
      // var product_id_plu=request.body.product_id_plu;
     client.query('SELECT product_id_plu, product_name from products WHERE coop_id = $1', [id], function(err, result){
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
