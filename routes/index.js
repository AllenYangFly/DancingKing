var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('util');
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DancingKing' });
});

/* GET music file*/
router.get( '/get_files', function(req, res) {
    var dir = path.join( __dirname,'../public','music');
    fs.readdir(dir, function(err, files) {
        if (err)    { 
            console.log('error:\n' + err) 
            return;
        }
        res.send( files );
    });
} );

module.exports = router;
