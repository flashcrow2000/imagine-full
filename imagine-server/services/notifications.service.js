var config = require('config/db.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var ObjectId = require('mongodb').ObjectID;
var userService = require('./user.service');
var ideaService = require('./idea.service');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('notifications');

var service = {};

service.saveNotification = saveNotification;
service.getNotificationsForUser = getNotificationsForUser;

module.exports = service;

function saveNotification(notifParams) {
    var deferred = Q.defer();
    db.notifications.find({$and : [
                    {target_id: {$eq : notifParams.target_id}},
                    {by_user_id: {$eq : notifParams.by_user_id}}]}).toArray(
        function(err, notification) {
            //if (notification.length > 0) {
                // TODO this shouldn't happen. From app the 'join' button should be
                // hidden for users who followed an idea.

                // user can leave and join same idea later, so the
                // notification will be correctly doubled
                //deferred.reject('User already followed this idea');
            //} else {
                userService.getById(notifParams.by_user_id)
                    .then(function (user) {
                        if (user !== undefined) {
                            getIdeaOwnerId(notifParams);
                        } else {
                            deferred.reject('No such user');
                        }
                    })
                    .catch(function (err) {
                        deferred.reject('Unable to validate user')
                    });
            //}
        });

    function getIdeaOwnerId(params) {
        ideaService.getIdeaById({id : params.target_id})
            .then(function(idea) {
                if (idea.length > 0) {
                    params.for_user_id = idea[0].user_id;
                    saveNotificationToDb(params);
                } else {
                    deferred.reject('No idea with that id');
                }
            })
            .catch(function (err) {
                deferred.reject('Idea not found')
            });
    }
    function saveNotificationToDb(notifParams) {

        db.notifications.insert(
            notifParams,
            function(err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                //user.token = jwt.sign({ sub: user._id }, config.secret);
                deferred.resolve(doc);
            });
    }

    return deferred.promise;

}

function getNotificationsForUser(data) {
    var deferred = Q.defer();
    db.notifications.find({for_user_id:data.id, read:false}).toArray(
        function(err, docs) {
            if (err) {
                deferred.reject('Error while loading ideas:', err.name, err.message)
            } else {

                if (data.type == 'count') {
                    deferred.resolve({notifications: docs.length})
                } else {
                    deferred.resolve({notifications: docs})
                    db.notifications.update(
                        {for_user_id:data.id, read:false},
                        {$set: {read: true}}, {multi: true});
                }

            }
        });
    return deferred.promise;
}