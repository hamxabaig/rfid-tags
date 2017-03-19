/**
 * Created by uzysjung on 15. 7. 9..
 */
'use strict';
const ApiController = require('../controllers/api');
const ApiValidate = require('../validations/api');
const middleware = require('../middleware/userInfo');

module.exports = function () {

    return [
        {
            method: 'GET',
            path: '/api/persons',
            config : {
                description: 'ABTestConfig channels',
                notes: 'get Persons',
                tags :['api'],
                auth : false,
                handler: ApiController.getPersons,
                validate : ApiValidate.validateGetPersons
            }
        },
        {
            method: 'POST',
            path: '/api/persons',
            config : {
                description: 'ABTestConfig channels',
                notes: 'Add Persons',
                tags :['api'],
                auth : false,
                handler: ApiController.addPersons,
                validate : ApiValidate.validatePersons
            }
        },
        {
            method: 'DELETE',
            path: '/api/persons/{personID}',
            config : {
                description: 'ABTestConfig channels',
                notes: 'delete Persons',
                tags :['api'],
                auth : false,
                handler: ApiController.removePerson,
                validate : ApiValidate.validateRemovePerson
            }
        },
        {
            method: 'PUT',
            path: '/api/persons/{personID}',
            config : {
                description: 'ABTestConfig channels',
                notes: 'Update Persons',
                tags :['api'],
                auth : false,
                handler: ApiController.updatePerson,
                validate : ApiValidate.validateUpdatePerson
            }
        },
        {
            method: 'POST',
            path: '/api/fingers',
            config : {
                description: 'ABTestConfig channels',
                notes: 'add fingers soldiers',
                tags :['api'],
                auth : false,
                handler: ApiController.addFinger,
                validate : ApiValidate.validateAddFingers
            }
        },
        {
            method: 'DELETE',
            path: '/api/fingers/{fingerID}',
            config : {
                description: 'ABTestConfig channels',
                notes: 'add fingers soldiers',
                tags :['api'],
                auth : false,
                handler: ApiController.removeFinger,
                validate : ApiValidate.validateRemoveFinger
            }
        },
        {
            method: 'GET',
            path: '/api/fingers',
            config : {
                description: 'ABTestConfig channels',
                notes: 'get fingers soldiers',
                tags :['api'],
                auth : false,
                handler: ApiController.getFingers,
                validate : ApiValidate.validateGetFingers
            }
        },
        {
            method: 'PUT',
            path: '/api/fingers/{fingerID}',
            config : {
                description: 'ABTestConfig channels',
                notes: 'put fingers soldiers',
                tags :['api'],
                auth : false,
                handler: ApiController.putFingers,
                validate : ApiValidate.validatePutFingers
            }
        },
         {
             method: 'GET',
             path: '/api/authInfo',
             config : {
                 description: 'api Authorization Information',
                 notes: 'Role , Email ',
                 tags :['api'], //you must put in 'api' in order to use Swagger-UI.
                 pre : [{ method:middleware.authUserInfo , assign: 'authInfo' }],
                 handler: ApiController.authInfo,
                 validate: ApiValidate.authInfo
             }
         },
    ];
}();
