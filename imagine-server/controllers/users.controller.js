var express = require('express')
, router = express.Router()
, userService = require('services/user.service')
, mailService = require('services/mail.service')
, multer = require('multer')
, fs = require('fs')
, upload = multer({dest:'/uploads/'});

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/count', getUsersCount);
router.post('/username', getUsername);
router.post('/upload', upload.single('photo'), uploadPicture);
router.get('/', getAll);
router.get('/current', getCurrent);
router.post('/validate', validate);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.post('/forgot', sendForgottenEmail);
router.post('/reset', resetPassword)

module.exports = router;

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getUsername(req, res) {
    userService.getUsername(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function validate(req, res) {
    userService.validate(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function uploadTest(req, res) {
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
          username: req.body.username,
          contentType: req.file.mimetype,
          size: req.file.size,
          img: Buffer(encImg, 'base64')
       };
       userService.uploadImage(newImg)
           .then(function (user) {
               if (user) {
                   res.send(user);
               } else {
                   res.sendStatus(404);
               }
           })
           .catch(function (err) {
               res.status(400).send(err);
           });
    }
}

function getCurrent(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getUsersCount(req, res) {
    userService.getUsersCount(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function sendForgottenEmail(req, res) {
    var email = req.body.email;
    userService.resetAccount(email)
        .then(function (data) {
            mailService.sendForgotPassword(email, data)
                .then(function (data) {
                    res.status(200).send(data);
                })
                .catch(function (err) {
                    res.status(400).send(err);
                });
        })
        .catch(function (err) {
            res.status(400).send(err);
        })

}

function resetPassword(req, res) {
    userService.resetPassword(req.body)
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}