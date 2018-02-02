var config = require('config/db.json')
, express = require('express')
, router = express.Router()
, ideaService = require('services/idea.service')
, multer = require('multer')
, fs = require('fs')
, upload = multer({dest:'/uploads/'});

//routes
router.post('/new', saveNewIdea);
router.post('/fromUser', getIdeasFromUser);
router.post('/byId', getIdeaById);
router.post('/count', getIdeasCount);
router.post('/latest', getLatestIdeas);
router.post('/followed', getFollowedIdeas);
router.post('/search', searchIdeas);
router.put('/:_id', update);
router.post('/addFollower', addFollower);
router.post('/addShare', addShare);
router.post('/upload', upload.single('photo'), uploadPicture);

router.get('/hashtags',  getHashtags);

module.exports = router;

function getHashtags(req, res) {
    ideaService.getHashtags()
        .then(function (data) {

            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function saveNewIdea(req, res) {
	ideaService.saveNewIdea(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getFollowedIdeas(req, res) {
    ideaService.getFollowedIdeas(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function addFollower(req, res) {
    ideaService.addFollower(req.body)
       .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    ideaService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function addShare(req, res) {
    ideaService.addShare(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getIdeasFromUser(req, res) {
    ideaService.getIdeas(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function uploadPicture(req, res) {
    if (req.file == null) {
        // If Submit was accidentally clicked with no file selected...
        res.status(200).send('No image selected');
    } else {
        var newImg = fs.readFileSync(req.file.path);
        fs.unlinkSync(req.file.path);
        // encode the file as a base64 string.
        var encImg = newImg.toString('base64');
        var newImg = {
            ideaId: req.body.ideaId,
            contentType: req.file.mimetype,
            size: req.file.size,
            img: Buffer(encImg, 'base64')
        };
        ideaService.uploadImage(newImg)
            .then(function (idea) {
                if (idea) {
                    res.status(200).send(idea);
                } else {
                    res.status(404);
                }
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
    }
}

function getIdeaById(req, res) {
    ideaService.getIdeaById(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getIdeasCount(req, res) {
    ideaService.getIdeasCount(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getLatestIdeas(req, res) {
    ideaService.getLatestIdeas(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function searchIdeas(req, res) {
    ideaService.searchIdeas(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}