/**
 * Created by uzysjung on 2016. 10. 18..
 */
'use strict';
const DEBUG         = require('debug')('user');
const Co            = require('co');
const modelUser     = require('../models/user');
const Config        = require('../../config');
const Jwt           = require('jsonwebtoken');
const Boom          = require('boom');
const _             = require('lodash');

module.exports = {

    login : function (request,reply) {

        const email = request.payload.login_email;
        const pass = request.payload.login_pw;

        Co( function*(){

            const loginPromise = modelUser.login(email,pass);
            const data = yield loginPromise;
            reply(data);

        }).catch(function(err){
            request.log('login err:',err.stack);
            reply(Boom.badData(err.message));

        });

    }
};
