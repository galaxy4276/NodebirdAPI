const express = require('express');
const uuid = require('uuid');
const { User, Domain } = require('../models');


const router = express.Router();

router.get('/', (req, res, next) => {
  User.findOne({
    where: { id: req.user && req.user.id || null },
    include: { model: Domain },
  })
    .then(user => {
      res.render('login', {
        user,
        loginError: req.flash('loginError'),
        domains: user && user.domains,
      })
    })
    .catch(err => {
      next(err);
    });
});


router.post('/domain', (req, res, next) => {
  console.log('req.user.id', req.user);
  console.log(uuid);
  Domain.create({
    userId: req.user.id,
    host: req.body.host,
    type: req.body.type,
    clientSecret: uuid.v4(),
  })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;
