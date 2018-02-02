var config = require('config/db.json')
  , Q = require('q')
  , mongo = require('mongoskin')
  , db = mongo.db(config.connectionString, { native_parser: true });
db.bind('tags');

var service = {};

service.getAll = getAll;
service.updateTag = updateTag;
service.addTag = addTag;
service.resetTags = resetTags;

module.exports = service;

function resetTags(data) {
    var deferred = Q.defer();
    db.tags.remove({}, function(err, res) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else {
            db.tags.insertMany(data.tags, function(err, docs){
                if (err) {
                    deferred.reject(err.name + ': ' + err.message);
                } else {
                    deferred.resolve(docs);
                }
            })
        }
    })
    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();
    db.tags.find().toArray(function(err, tags) {
       if (err) {
           deferred.reject(err.name + ': ' + err.message);
       } else {
           deferred.resolve(tags);
       }
    });
    return deferred.promise;
}

function updateTag(data) {
    var deferred = Q.defer();
    db.tags.findAndModify(
        {name: data},
        [],
        {$inc: {uses: 1}},
        {upsert: true, new: true},
        function(err, docs) {
            if (err) {
                deferred.reject(err.name + ': ' + err.message);
            } else {
                deferred.resolve(docs);
            }
    })
    // db.collection('tags', function(err, collection){
    //     var bulk = collection.initializeUnorderedBulkOp();
    //     for (var tag in data.tags) {
    //         bulk.find({name:tag}).upsert().updateOne({$inc: {uses:1}});
    //     }
    //     bulk.execute(function(err, res) {
    //     });
    // })


    return deferred.promise;
}

function addTag() {
    var deferred = Q.defer();

    return deferred.promise;
}