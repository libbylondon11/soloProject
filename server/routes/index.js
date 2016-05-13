var express=require('express');
var router=express.Router();
var path=require('path');
var session=require('express-session');
var passport=require('passport');
var bodyParser=require('body-parser');
var pg=require('pg');

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/login.html'))
  console.log('index.js loading');
});
router.get('/logout', function(request, response){
  request.logout();
  response.redirect('/');
})
router.post('/', passport.authenticate('local',
{ successRedirect: '/home',
  failureRedirect: '/'
})
);

module.exports=router;
