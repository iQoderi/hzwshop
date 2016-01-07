var express = require('express');
var dbHelper = require('../common/dbHelper');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
    res.render('register');
});

router.post('/register', function (req, res, next) {
    var User = dbHelper.getModel('user');
    uname = req.body.username;
    User.findOne({name: uname}, function (err, doc) {
        if (doc) {
            req.session.error = '用户已经存在!';
            res.send(500);
        } else {
            User.create({
                name: uname,
                password: req.body.password
            }, function (err, doc) {
                if (err) {
                    res.send(500);
                } else {
                    req.session.error = '用户创建成功';
                    res.send(200);
                    console.log(doc);
                }
            })

        }
    });
});

//用户登陆
router.get('/login', function (req, res, next) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    var User = dbHelper.getModel('user');
    var uname = req.body.username;
    User.findOne({name: uname}, function (err, doc) {
        if (err) {
            req.session.error = '用户不存在';
            res.send(404);
        } else if (req.body.password !== doc.password) {
            req.session.error = '密码错误';
            res.send(404);
        } else {
            console.log(doc);
            req.session.user = doc;
            res.send(200);
        }
    });
});

module.exports = router;
