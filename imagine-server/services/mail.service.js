var config = require('config/db.json')
,   express = require('express')
,   router = express.Router()
,   Q = require('q')
,   userService = require('services/user.service')
,   aws = require('aws-sdk');

aws.config.loadFromPath('config/aws.json');

var ses = new aws.SES({apiVersion: '2010-12-01'})
//,   to =[ 'flashcrow2000@gmail.com']
,   from = "Imagine all the people <noreply@imagineallthepeople.world>";

var service = {};

service.sendForgotPassword = sendForgotPassword;

module.exports = service;

function sendForgotPassword(email, resetId) {
    var deferred = Q.defer()
    ,   to = [email]
    ,   text = 'https://www.imagineallthepeople.world/reset/'+resetId;

    ses.sendEmail( {
        Source: from,
        Destination: { ToAddresses: to },
        Message: {
            Subject: {
                Data: 'Reset your ImagineAllThePeople password'
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data:
                        'This message body contains HTML formatting, like <a class="ulink" href="'+text+'" target="_blank">Reset your password</a>.'
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: 'You can reset yourpassword here: '+text
                }
            }
        }
    }
    , function(err, data) {
        if(err) deferred.reject(err.name+': '+err.message)
        deferred.resolve(data);
    });
    return deferred.promise;
}

