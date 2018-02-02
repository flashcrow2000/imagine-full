var config = require('config/db.json')
  , _ = require('lodash')
  , jwt = require('jsonwebtoken')
  , bcrypt = require('bcryptjs')
  , Q = require('q')
  , Recaptcha = require('recaptcha-verify')
  , mongo = require('mongoskin')
  , db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.uploadImage = uploadImage;
service.getUsersCount = getUsersCount;
service.validate = validate;
service.getUsername = getUsername;
service.resetAccount = resetAccount;
service.resetPassword = resetPassword;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            user.token = jwt.sign({ sub: user._id }, config.secret);
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // authentication failed
            deferred.resolve('Authentication failed');
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getUsername(data) {
    var deferred = Q.defer();

    db.users.findById(data.id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(
                {username: user.username,
                 firstName: user.fb_first_name,
                 lastName: user.fb_last_name
                });
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function resetAccount(email) {
    var deferred = Q.defer();
    // generate a 10 characters unique id; this will be sent to the user via email
    var set = {
        passwordReset: true,
        resetID: Math.random().toString(36).slice(2) +''+ Math.random().toString(36).slice(2)
    }
    db.users.findOneAndUpdate (
        { username: email },
        { $set: set },
        { upsert:false, returnNewDocument : true },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            if (doc.value == null) deferred.reject ('No such user');
            deferred.resolve(set.resetID);
        }
    );
    return deferred.promise;

}

function resetPassword(data) {
    var deferred = Q.defer();
    var set = {
        passwordReset: false,
        resetID: null,
        hash: bcrypt.hashSync(data.pass, 10)
    }
    db.users.findOneAndUpdate (
        { resetID: data.resetId },
        { $set: set },
        { upsert:false, returnNewDocument : true },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            if (doc.value == null) deferred.reject ('No such user');
            deferred.resolve(doc);
        }
    );
    return deferred.promise;
}

function validate(data) {
    var deferred = Q.defer();
    var recaptcha = new Recaptcha({
        secret: '6Lf9LzEUAAAAANeSgWkOHwvN90AhfdELrXRCiPpf',
        verbose: true
    });
    recaptcha.checkResponse(data.token, function(error, response){
        if(error){
            deferred.reject(error)
            return;
        }
        if(response.success){
            deferred.resolve('human')
            // save session.. create user.. save form data.. render page, return json.. etc.
        }else{
            deferred.resolve('robot')
            //res.status(200).send('the user is a ROBOT :(');
            // show warning, render page, return a json, etc.
        }
    });
    /*
    var secretKey = '6Lf9LzEUAAAAANeSgWkOHwvN90AhfdELrXRCiPpf';
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + data.token;
    request.get(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
            deferred.reject({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
        }
        deferred.resolve({"responseCode" : 0,"responseDesc" : "Sucess"});
    });
    /*
    request.post(
        'https://www.google.com/recaptcha/api/siteverify',
        {json: {
            secret:'6Lf9LzEUAAAAANeSgWkOHwvN90AhfdELrXRCiPpf',
            token: data.token
        }},
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                deferred.resolve(body)
            } else {
                deferred.reject(error);
            }
        }
    )*/
    return deferred.promise;
}

function uploadImage(imgParams) {
    var deferred = Q.defer();

    db.users.findOne(
        { username: imgParams.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                updateUserImage()
            } else {
                deferred.reject('User doesn\'t exist');
            }
        });

    function updateUserImage() {
        var set = {
            imgBuffer: imgParams.img,
            imgType: imgParams.contentType
        }
        db.users.findOneAndUpdate (
            { username: imgParams.username },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve({imgType:set.imgType, imgBuffer:set.imgBuffer.toString('base64')});
            });
    }

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();
    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            // check if the username has only numbers
            if (user) {
                if (!(/^\d+$/.test(user.username))) {
                // username already exists, and is not social network account
                    deferred.reject('Username "' + userParam.username + '" is already taken');
                } else {
                    // username already exists, and is social network account
                    user.token = jwt.sign({ sub: user._id }, config.secret);
                    deferred.resolve(user);
                }
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password

        var user = _.omit(userParam, ['password', 'password2']);
        //user = _.omit(user, 'password2');

        // add hashed password to user object
            if (userParam.password) {
                user.hash = bcrypt.hashSync(userParam.password, 10);
            }

            db.users.insert(
                user,
                function (err, doc) {
                    
                    if (err) deferred.reject(err.name + ': ' + err.message);
                    user.token = jwt.sign({ sub: user._id }, config.secret);
                    deferred.resolve(user);
                });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();
    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            email: userParam.email,
            manifestoAccepted: userParam.manifestoAccepted,
            location_lat: userParam.location_lat,
            location_long: userParam.location_long,
            location_label: userParam.location_label,
            following: userParam.following,
            imgURL: userParam.imgURL,
            fb_first_name: userParam.fb_first_name,
            fb_last_name: userParam.fb_last_name,
            fbAccountName: userParam.fbAccountName,
            twitterAccountName: userParam.twitterAccountName,
            instagramAccountName: userParam.instagramAccountName,
            webPage: userParam.webPage
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function checkHasOnlyNumber(val) {
    return /^\d+$/.test(val);
}

function getUsersCount(obj) {
    var deferred = Q.defer();
    db.users.count(function(err, count) {
        if (err) deferred.reject(err.name+':'+err.message);
        if (count) {
            deferred.resolve(JSON.stringify({count: count}));
        } else {
            deferred.reject('An unknown error has occurred');
        }
    });
    return deferred.promise;
}