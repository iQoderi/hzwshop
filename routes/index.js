var express = require('express');
var dbHelper = require('../common/dbHelper');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.get('/home', function (req, res, next) {
    if (req.session.user) {
        var Commodity = dbHelper.getModel('commodity');
        Commodity.find({}, function (error, docs) {
            res.render('home', {Commoditys: docs});
        })
    } else {
        req.session.error = '请先登陆';
        res.redirect('/users/login');
    }
});

router.get('/addcommodity', function (req, res, next) {
    res.render('commodity');
});

router.post('/addcommodity', function (req, res, next) {
    var Commodity = dbHelper.getModel('commodity');
    Commodity.create({
        name: req.body.goodsname,
        price: req.body.goodsprice,
        imgSrc: req.body.imgSrc
    }, function (error, doc) {
        if (doc) {
            res.send(200);
        } else {
            res.send(404);
        }
    })
});

module.exports = router;
