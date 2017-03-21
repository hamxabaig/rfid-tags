/**
 * Created by uzysjung on 2016. 10. 18..
 */
'use strict';
const userController = require('../controllers/user');
const validation = require('../validations/user');
const middleware = require('../middleware/userInfo');

module.exports = function() {
    return [
        {
            method: 'POST',
            path: '/api/login',
            config : {
                auth: false,
                description: 'USER LOGIN',
                notes: 'API LOGIN  ',
                tags :['api'],
                handler: userController.login,
                validate : validation.login
            }
        }
    ];
}();
