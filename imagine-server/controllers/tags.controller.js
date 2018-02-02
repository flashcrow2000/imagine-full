var express = require('express')
  , router = express.Router()
  , tagsService = require('services/tags.service')

//routes
router.post('/all', getAll);
router.post('/update', updateTag);
router.post('/add', addTag);

router.post('/reset', resetTags);

module.exports = router;

function getAll(req, res) {
    tagsService.getAll(req)
        .then(function(data){
            if (data) {
                res.send(data);
            } else {
                // authentication failed
                res.status(401).send('Error fetching hashtags collection');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateTag(req, res) {
    tagsService.updateTag(req.body.tag)
        .then(function(data){

        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function resetTags(req, res) {
    tagsService.resetTags(req.body)
        .then(function(data){
            res.send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        })
}

function addTag(req, res) {
    tagsService.addTag(req)
        .then(function(data){

        })
}