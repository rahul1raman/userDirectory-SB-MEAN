var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/users', ['users']);

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.users.find(function(err, users){
    if(err){
      res.send(err);
    }
    res.json(users);
  });
});

// GET single user
router.get('/:id', function(req, res, next) {
  db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
    if(err){
      res.send(err);
    }
    res.json(user);
  });
});

// save user
router.post('/new', function(req, res, next){
  var user = req.body;
  if(!user || user === {}) {
    res.status(400);
    res.json({
      "error": "Bad data"
    });
  }else {
    db.users.save(user, function(err, user){
      if(err){
        res.send(err);
      }
      res.json({'status': 'successful'});
    });
  }
});

// Delete user
router.delete('/:id', function(req, res, next) {
  db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
    if(err){
      res.send({'error': err});
    }
    res.json({'deleted': 'true'});
  });
});

//update user
router.put('/:id', function(req, res, next) {
  var user = req.body;
  var updatedUser = {};
  
  for(var key in user) {
    if(user[key]) {
      updatedUser[key] = user[key];
    }
  }

  if(!updatedUser || updatedUser === null || updatedUser === undefined) {
    res.status(400);
    res.json({
      "error" : "Bad data"
    });
  }else {
    db.users.update({_id: mongojs.ObjectId(req.params.id)}, updatedUser, {}, function(err, user){
      if(err){
        res.send(err);
      }
      res.json({'status': 'Updated'});
    });
  }
});


module.exports = router;
