var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BSON = require('../../models/bson');

router.get('/', function(req, res){

  if(!req.query.id){
    res.status(400);
    res.json({
      'success': false,
      'message': 'parameter `id` is required'
    });
    return;
  }

  var id;

  // cast to mongoose id
  try{

    id = mongoose.Types.ObjectId(req.query.id);

  } catch (e){

    res.status(400);
    res.json({
      'success': false,
      'message': 'id was not valid',
      'exception': e.message
    });
    return;

  }

  BSON.findById(id, function(err, doc){

    if(err){

      res.status(400);
      res.json({
        'success': false,
        'message': 'no bson exists with that id'
      });
      return;

    }

    res.json({
      'bson': doc
    });

  });

});

router.post('/', function(req, res){

  var bson = req.body.bson;

  if(!bson){

    res.status(400);
    res.json({
      'success': false,
      'message': 'Missing parameter, `bson` is required'
    });
    return;

  }

  var b = new BSON({
    bson: bson
  });

  b.save(function(err){

    if(err){

      res.status(500);
      res.json({
        success: false,
        message: 'There was an error while creating bson',
        error: err.message
      });
      return;

    }

    res.json({
      success: true,
      bson: b
    });


  });

});

router.put('/', function(req, res){

  var bson = req.body.bson;
  var id = req.body.id;

  if(!bson || !id){

    res.status(400);
    res.json({
      'success': false,
      'message': 'Missing parameter, `bson` and `id` are required'
    });
    return;

  }

  // cast to mongoose id
  try{

    id = mongoose.Types.ObjectId(id);

  } catch (e){

    res.status(400);
    res.json({
      'success': false,
      'message': 'id was not valid',
      'exception': e.message
    });
    return;

  }

  BSON.findById(id, function(err, doc){

    if(err){

      res.status(400);
      res.json({
        'success': false,
        'message': 'no bson exists with that id'
      });
      return;

    }

    doc.bson = bson;

    doc.save(function(err){

      if(err){

        res.status(500);
        res.json({
          success: false,
          message: 'There was an error while updating bson',
          error: err.message
        });
        return;

      }

      res.json({
        success: true
      });


    });

  });

});

module.exports = router;
