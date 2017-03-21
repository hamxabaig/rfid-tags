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
                auth : 'jwt',
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
                auth : 'jwt',
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
                auth : 'jwt',
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
                auth : 'jwt',
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
                auth : 'jwt',
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
                auth : 'jwt',
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
                auth : 'jwt',
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
                auth : 'jwt',
                handler: ApiController.putFingers,
                validate : ApiValidate.validatePutFingers
            }
        },
        {
            method: 'DELETE',
            path: '/api/solider_finger/{fingerID}',
            config : {
                description: 'ABTestConfig channels',
                notes: 'add fingers soldiers',
                tags :['api'],
                auth : 'jwt',
                handler: ApiController.removeSoldierFinger,
                validate : ApiValidate.validateSoldierRemoveFinger
            }
        },
        {
            method: 'GET',
            path: '/api/solider_finger',
            config : {
                description: 'ABTestConfig channels',
                notes: 'get fingers soldiers',
                tags :['api'],
                auth : 'jwt',
                handler: ApiController.getSoldierFingers,
                validate : ApiValidate.validateSoldierGetFingers
            }
        },
        {
            method: 'PUT',
            path: '/api/solider_finger/{fingerID}',
            config : {
                description: 'ABTestConfig channels',
                notes: 'put fingers soldiers',
                tags :['api'],
                auth : 'jwt',
                handler: ApiController.putSoldierFingers,
                validate : ApiValidate.validateSoldierPutFingers
            }
        },
        {
            method: 'POST',
            path: '/api/soldier_finger',
            config : {
                description: 'ABTestConfig channels',
                notes: 'add fingers soldiers',
                tags :['api'],
                auth : 'jwt',
                handler: ApiController.addSoldierFinger,
                validate : ApiValidate.validateSoldierAddFingers
            }
        }
    ];
}();
