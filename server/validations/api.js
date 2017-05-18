/**
 * Created by uzysjung on 15. 7. 9..
 */

'use strict';
const Joi = require('joi');

module.exports = {

    authInfo : {
        query: {
            token: Joi.string().description('token')
        }
    },
    validatePersons : {
        payload: {
            name: Joi.string().required(),
            army_number: Joi.string().required(),
            dob: Joi.string().required(),
            rank: Joi.string().required(),
            batch_no: Joi.string().required(),
            med_cat: Joi.string().required(),
            trade: Joi.string().required(),
            current_unit: Joi.string().required(),
            mil_courses: Joi.array().required(),
            children: Joi.array(),
            parents: Joi.array()
        }
    },
    validateUpdatePerson : {
        payload: {
            name: Joi.string(),
            army_number: Joi.string(),
            dob: Joi.string(),
            rank: Joi.string(),
            batch_no: Joi.string(),
            med_cat: Joi.string(),
            trade: Joi.string(),
            current_unit: Joi.string(),
            mil_courses: Joi.array(),
            children: Joi.array(),
            parents: Joi.array()
        }
    },
    validateGetPersons: {

    },
    validateRemovePerson: {
        params: {
            personID: Joi.string().required()
        }
    },
    validateRemoveFinger: {
        params: {
            fingerID: Joi.number().required()
        }
    },
    validateAddFingers: {
        payload: {
            rfid: Joi.string().required(),
            finger_id: Joi.number().required()
        }
    },
    validateGetFingers: {
    },
    validatePutFingers: {
        params: {
          fingerID: Joi.string().required()
        },
        payload: {
            rfid: Joi.string(),
            name: Joi.string(),
            finger_id: Joi.number()
        }
    },
    validateSoldierRemoveFinger: {
        params: {
            fingerID: Joi.number().required()
        }
    },
    validateSoldierAddFingers: {
        payload: {
            name: Joi.string(),
            finger_id: Joi.number().required()
        }
    },
    validateSoldierGetFingers: {
    },
    validateSoldierPutFingers: {
        params: {
            fingerID: Joi.string().required()
        },
        payload: {
            name: Joi.string(),
            finger_id: Joi.number()
        }
    }
};
