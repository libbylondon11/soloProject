var express=require('express');
var passport=require('passport');
var bourbon = require('node-bourbon');
var session=require('express-session');
var bodyParser=require('body-parser');
var pg=require('pg');
var localStrategy=require('passport-local').Strategy;
//local//
var home=require('./routes/home');
var coops=require('./routes/coops');
var userPage=require('./routes/userPage');
var index=require('./routes/index');
var add=require('./routes/add');
var register=require('./routes/register');
var encryption=require('../modules/encryption');
var connectionString='postgres://localhost:5432/white';
var connection=require('./db/connection');

var app=express();
var port = process.env.PORT || 3000;

connection.initializeUserDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('server/public'));
//express session
app.use(session({
  secret: 'teal walls',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 60000, secure: false}
}));
//initializing passport//
app.use(passport.initialize());
app.use(passport.session());
//passport happening
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
},
function(request, username, password, done){
  console.log('CHECKING PASSWORD');
  pg.connect(connectionString, function(err, client){
    var user={};
    var query=client.query("SELECT * FROM users WHERE username = $1", [username]);
    if(err){
      console.log(err);
    }

    query.on('row', function(row){
      console.log('user ob', row);
      user=row;
      console.log(password, user.password, 'password');
      if(encryption.comparePassword(password, user.password)){
        console.log('a user has been found');
        done(err, user);
      }else{
        console.log('no matches found');
        done(null, false);
      }
    });
    query.on('end', function(){
      client.end();
      // response.send(results);
    });
    if(err){
      console.log(err);
    }
  });
}));
//authenticate users//
passport.serializeUser(function(user, done){
  console.log('hit serializeUser', user);
  done(null, user.user_id);
});
passport.deserializeUser(function(user_id, passportDone){
  console.log('hit deserializeUser');

  pg.connect(connection.connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }
    var user={};
    var query=client.query('SELECT * FROM users where user_id=$1', [user_id]);

    query.on('row', function(row){
      user=row;
      passportDone(null, user);
    })
    query.on('end', function(){
      client.end();
    });
    if(err){
      console.log(err);
    }
  });
});
//routes//
app.use('/userPage', userPage);
app.use('/coops', coops);
app.use('/home', home);
app.use('/', index);
app.use('/register', register);
app.use('/add', add);


var server=app.listen(3000, function(){
  var port=server.address().port;
  console.log('listening on port', port);

})
