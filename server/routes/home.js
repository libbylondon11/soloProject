var express=require('express');
var router=express.Router();
var path=require('path');
var bourbon = require('node-bourbon');
var pg=require('pg');
var connectionString='postgres://localhost:5432/white';

var userId='';

router.get('/*', function(request, response, next){
  if(request.isAuthenticated()){
    userId=request.user.user_id;
    next();
  } else {
    response.redirect('/');
  }
})
router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/homeView.html'));
  console.log('home.js');
})

router.get('/list', function(request, response, next){
  console.log('request session info for', request.session);
  // var userId=request.session.passport.user;
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('error connecting to DB!', err);
      process.exit(1);
    }else{
      var results=[];
      var query=client.query('SELECT * FROM users where user_id = $1;', [userId]);

      query.on('row', function(row){
        results.push(row);
      });
      query.on('end', function(){
        client.end();
        console.log(user);
        response.send(results);
        done();
      });
      query.on('error', function(error){
       console.log('Error running query:', error);
       done();
       response.sendStatus(500);
     });
    }
  });
});
module.exports=router;
