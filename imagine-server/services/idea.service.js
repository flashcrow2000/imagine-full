var config = require('config/db.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var ObjectId = require('mongodb').ObjectID;
var userService = require('./user.service')
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('ideas');

var service = {};

service.saveNewIdea = saveNewIdea;
service.getIdeas = getIdeas;
service.getIdeaById = getIdeaById;
service.getIdeasCount = getIdeasCount;
service.getLatestIdeas = getLatestIdeas;
service.searchIdeas = searchIdeas;
service.addFollower = addFollower;
service.addShare = addShare;
service.uploadImage = uploadImage;
service.getFollowedIdeas = getFollowedIdeas;
service.update = update;

service.getHashtags = getHashtags;


module.exports = service;

function getHashtags() {
    var deferred = Q.defer();

    db.ideas.find({}, {hashtags: 1, _id: 0}).toArray(
        function(err, docs) {
            if (err) { deferred.reject('Error while getting tags from ideas:', err.name, err.message)};
            deferred.resolve({ideas: docs});
        }
    );
    return deferred.promise;
}

function saveNewIdea(ideaParams) {
	// no checks necessary at this time
	var deferred = Q.defer();
	//findFollowed('7');
	userService.getById(ideaParams.user_id)
		.then(function (user){
			if (user !== undefined) {
				saveIdeaToDb(ideaParams)
			} else {
				deferred.reject('No such user')
			}
		})
		.catch(function (err) {
			deferred.reject('Unable to validate user')
		});
	
	function saveIdeaToDb(ideaData) {
		if (!ideaData.followers){
			ideaData.followers = [];
		}
		if (ideaData.hashtags == undefined) {
			ideaData.hashtags = [];
		}
		console.log(ideaData);
		db.ideas.insert(
			ideaData, 
			function(err, doc) {
				if (err) deferred.reject(err.name + ': ' + err.message);
                //user.token = jwt.sign({ sub: user._id }, config.secret);
                deferred.resolve(doc);
			}
		);
		if (ideaData.hashtags.length > 0) {
			saveHashtags(ideaData.hashtags)
		}

        function saveHashtags(hashtags) {
			// new db for hashtags
			// hashtag had id, hashtag, and usage-number
			// if hashtag exists, increase usage-number
			// if not, add and set usage-number to 1
        }
	}

	return deferred.promise;

}

function update(_id, ideaParams) {
    var deferred = Q.defer();
	var set = {
		title: ideaParams.title,
		description: ideaParams.description,
		typeSelect: ideaParams.typeSelect,
        typeSelectId: ideaParams.typeSelectId,
		hashtags: ideaParams.hashtags,
		imgURL: ideaParams.imgURL,
        imgType: ideaParams.imgType,
        imgBuffer: ideaParams.imgBuffer,
	};


	db.ideas.update(
		{ _id: mongo.helper.toObjectID(_id) },
		{ $set: set },
		function (err, doc) {
			if (err) deferred.reject(err.name + ': ' + err.message);

			deferred.resolve(doc);
	});

    return deferred.promise;
}

function uploadImage(imgParams) {
    var deferred = Q.defer();

    db.ideas.findOne(
        { _id : mongo.helper.toObjectID(imgParams.ideaId) },
        function (err, idea) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (idea) {
                updateIdeaImage()
            } else {
                deferred.reject('Idea doesn\'t exist');
            }
        });

    function updateIdeaImage() {
        var set = {
            imgBuffer: imgParams.img,
            imgType: imgParams.contentType
        }
        db.ideas.findOneAndUpdate (
            { _id: mongo.helper.toObjectID(imgParams.ideaId) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve(doc);
            });
    }

    return deferred.promise;
}

function getIdeas(userId) {
	var deferred = Q.defer();
	db.ideas.find({user_id:userId.id}).toArray(
		function(err, docs) {
			if (err) { deferred.reject('Error while loading ideas:', err.name, err.message)};
			deferred.resolve({ideas:docs})
		});
	return deferred.promise;
}

function getLatestIdeas(sortQuery) {
	var deferred = Q.defer(),
		sortBy = sortQuery.sort,
		count = sortQuery.count
		sortTerm = sortBy == 'last' ? {_id : -1} : {followersTotal: -1};
	// The 1 will sort ascending (oldest to newest) and -1 will sort descending
	// (newest to oldest.)
	// If you use the auto created _id field it has a date embedded in it ... so
	// you can use that to order by
    db.ideas.find().limit(count).sort(sortTerm).toArray(
    	function(err, docs) {
    		if (err) { deferred.reject('Error while getting ideas:', err.nme, err.message)};
    		deferred.resolve({ideas: docs});
		}
	);
    return deferred.promise;
}

function getFollowedIdeas(data) {
	var deferred = Q.defer();
	db.ideas.find({
    followers: { $in: [
        data.id ]}
    }).toArray( 
    function(err, docs){
		if (err) deferred.reject(err.name+':'+err.message);

		if (docs) {
			deferred.resolve(docs)
        } else {
			deferred.resolve('no joined ideas');
		}
	});
	return deferred.promise;
}

function getIdeaById(ideaId) {
	 var id = ideaId['id'];
	 var deferred = Q.defer();
	 db.ideas.find({_id : mongo.helper.toObjectID(id)}).toArray(
	 	function (err, idea) {
			if (err) deferred.reject(err.name+':'+err.message);

			if (idea) {
				deferred.resolve(idea);
			} else {
				deferred.reject('Invalid idea id');
			}
	 	}
	 );

	 return deferred.promise;
}

function getIdeasCount(obj) {
    var deferred = Q.defer();
    db.ideas.count(function(err, count) {
    	if (err) deferred.reject(err.name+':'+err.message);
    	if (count) {
    		deferred.resolve(JSON.stringify({count: count}));
		} else {
    		deferred.reject('An unknown error has occurred');
		}
	});
    return deferred.promise;
}

function addShare(data) {
    var deferred = Q.defer();
	db.ideas.findOneAndUpdate(
		{_id:mongo.helper.toObjectID(data.idea)},
		{
			$inc: {shares: 1}
		},
		function (err, doc) {
			if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve('shares updated');
		}
	)
    return deferred.promise;
}

function addFollower(data) {
	// { idea: '59c28a67648a79000f057e58', user: '59c28653eeca65000f052620' }
	var deferred = Q.defer();
	db.ideas.findById(data.idea, function(err, idea) {
		if (err) deferred.reject('idea not found');
		if (idea) {
			updateIdea(data.idea, data.user);
		}
	})

	function updateIdea(ideaId, userId) {
		//TODO find a better syntax for this
		db.ideas.findOneAndUpdate(
			{_id: mongo.helper.toObjectID(ideaId)},
            //{ $push : {followers : userId}},
			{
				$inc : {followersTotal: 1},
				$push : {followers : userId}
			},
			function (err, doc) {
				if (err) deferred.reject(err.name + ': ' + err.message);
				deferred.resolve('followers updated');
			}
		);
        // db.ideas.findOneAndUpdate(
        //     {_id: mongo.helper.toObjectID(ideaId)},
        //     { $push : {followers : userId}},
        //     //{ $inc : {followersTotal: 1}},
        //     function (err, doc) {
        //         if (err) deferred.reject(err.name + ': ' + err.message);
        //         deferred.resolve('followers updated');
        //     }
        // );
	}
	return deferred.promise;
}

function searchIdeas(query) {
	// query is of type { query : searchTerm }
    var deferred = Q.defer();
	var searchTerm = query.query;

	db.ideas.createIndex({'title':'text', 'description':'text'},
		function() {
			db.ideas.find({$text: {$search: searchTerm}},
				  		  {score: {$meta: "textScore"}})
				.sort({score: {$meta:"textScore"}}).toArray(
                function(err, docs) {
                    if (err) { deferred.reject('Error while getting ideas:', err.nme, err.message)};
                    deferred.resolve({ideas: docs});
                }
			)
		});
	return deferred.promise;
}