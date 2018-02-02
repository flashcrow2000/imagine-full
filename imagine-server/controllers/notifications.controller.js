var config = require('config/db.json')
, express = require('express')
, router = express.Router()
, notifService = require('services/notifications.service');

// routes
router.post('/new', saveNotification);
router.post('/forUser', getNotificationsForUser);

module.exports = router;

function saveNotification(req, res) {
    notifService.saveNotification(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        })
}

function getNotificationsForUser(req, res) {
    notifService.getNotificationsForUser(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        })
}