var pg=require('pg');

var connectionString;

if(process.env.DATABASE_URL) {
  pg.default.ssl=true;
  connectionString=process.env.DATABASE_URL;
}else{
  connectionString='postgres://localhost:5432/white';
}
function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('error connecting to DB!', err);
      process.exit(1);
    }else{
      var query=client.query('CREATE TABLE IF NOT EXISTS coops (coop_id serial PRIMARY KEY, coop_name varchar(80) NOT NULL)');

      query.on('end', function(){
        console.log('successfully created schema');
        done();
      });

      query.on('error', function(error){
        console.log('error creating schema', error);
        process.exit(1);
      });
    }
  });
}

function initializeSewardDB(){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('error connecting to DB!', err);
      process.exit(1);
    }else{
      var query=client.query('CREATE TABLE IF NOT EXISTS coops (coop_id serial PRIMARY KEY, coop_name varchar(80) NOT NULL)');

      query.on('end', function(){
        console.log('successfully created schema');
        done();
      });

      query.on('error', function(error){
        console.log('error creating schema', error);
        process.exit(1);
      });
    }
  });
}
module.exports.connectionString=connectionString;
module.exports.initializeSewardDB=initializeSewardDB;
