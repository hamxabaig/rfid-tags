/**
 * Created by uzysjung on 2016. 10. 18..
 */

'use strict';

const UzysDB    = require('../helpers/UzysDB');
const Bcrypt    = require('bcryptjs');
const Jwt       = require('jsonwebtoken');
const Co        = require('co');
const _         = require('lodash');
const Joi       = require('joi');
const Config  = require('../../config');

class DashUser extends UzysDB {
    constructor(tableName) {
        super(tableName);
    }

    fetch({login_email}) {
        if (login_email === 'admin@test.com') {
            return {login_pw: 'admin@12345', id: '123456789'};
        } else {
            return null;
        }
    }

    login(email,password) {

        const self = this;
        return Co(function*(){
            const data = self.fetch({ login_email:email });
            if (data === null) {
                throw new Error('bad userEmail');
            }
            const isValid = password === data.login_pw;

            if (isValid === false) {
                throw new Error('wrong password');
            }
            return self.token(data.id, 'admin');

        });
    }

    token(userId , role) {
        return { token: Jwt.sign({ id: userId }, Config.SECRET_KEY, { expiresIn: '48h' }) ,userID : userId , role};
    }

    validate(decoded, request, callback) {
        console.log(decoded, 'validated');
        if (decoded.id == '123456789') {
            return callback(null, true);
        } else {
            console.log('error==========');
            return callback(null, false);
        }
    }

}
module.exports = new DashUser('USER');
