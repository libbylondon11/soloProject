//the point of this page is really just for logging into passport.
var express=require('express');
var router=express.Router();
var path=require('path');
var passport=require('passport');
var pg=require('pg');

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/login.html'))
  console.log('index.js loading');
});
router.post('/', passport.authenticate('local',
{ successRedirect: '/home',
  failureRedirect: '/'
})
);
module.exports=router;
