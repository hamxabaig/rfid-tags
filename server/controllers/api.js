/**
 * Created by uzysjung on 15. 7. 9..
 */
'use strict';
const DEBUG     = require('debug')('api');
const ModelAPI  = require('../models/api');
const Person = require('../models/Persons');
const SoldierFinger = require('../models/SoldierFinger');
const Finger = require('../models/Finger');
const Axios     = require('axios');
const Co    = require('co');
const Boom          = require('boom');
const helperAuth                = require('../helpers/auth');

 module.exports = exports = {

     authInfo: function (request,reply) {

         reply( request.pre.authInfo );
    },

    addPersons : function (request, reply) {
        const person = request.payload;
        Person.create(person).then(function (person) {
            return reply(person);
        })
        .catch(function () {
            return reply(Boom.internal('WRITE_ERR'));
        })
    },
     removePerson: function (request, reply) {
         const personID = request.params.personID;
         Person.remove({_id: personID}).then(function () {
             return reply({result: 'success'});
         })
         .catch(function () {
             return reply(Boom.internal('WRITE_ERR'));
         })
     },
     updatePerson: function (request, reply) {
         const personID = request.params.personID;
         const person = request.payload;
         Person.findByIdAndUpdate(personID, { $set: person }).then(function () {
             return reply({result: 'success'});
         })
         .catch(function () {
             return reply(Boom.internal('WRITE_ERR'));
         })
     },
     getPersons: function (request, reply) {
         Person.find().then(function (persons) {
             return reply(persons);
         })
         .catch(function () {
             return reply (Boom.internal('READ_ERR'));
         })
     },
     addFinger: function (request, reply) {
         const fingers = request.payload;
         SoldierFinger.create(fingers).then(function (finger) {
             return reply(finger);
         })
         .catch(function () {
             return reply(Boom.internal('WRITE_ERR'));
         })
     },
     removeFinger: function (request, reply) {
         const fingerID = request.params.fingerID;
         SoldierFinger.remove({finger_id: fingerID}).then(function () {
             return reply({result: 'success'});
         })
         .catch(function () {
             return reply(Boom.internal('WRITE_ERR'));
         })
     },
     getFingers: function (request, reply) {
         SoldierFinger.find().then(function (fingers) {
             return reply(fingers);
         })
             .catch(function () {
                 return reply(Boom.internal('READ_ERR'));
             });
     },
     putFingers: function (request, reply) {
         SoldierFinger.findByIdAndUpdate(request.params.fingerID, { $set: request.payload }).then(function () {
             return reply({result: 'success'});
         })
         .catch(function (e) {
             console.log('============',e);
             return reply(Boom.internal('READ_ERR'));
         });
     },
     addSoldierFinger: function (request, reply) {
         const fingers = request.payload;
         Finger.create(fingers).then(function (finger) {
             return reply(finger);
         })
             .catch(function () {
                 return reply(Boom.internal('WRITE_ERR'));
             })
     },
     removeSoldierFinger: function (request, reply) {
         const fingerID = request.params.fingerID;
         Finger.remove({finger_id: fingerID}).then(function () {
             return reply({result: 'success'});
         })
             .catch(function () {
                 return reply(Boom.internal('WRITE_ERR'));
             })
     },
     getSoldierFingers: function (request, reply) {
         Finger.find().then(function (fingers) {
             return reply(fingers);
         })
             .catch(function () {
                 return reply(Boom.internal('READ_ERR'));
             });
     },
     putSoldierFingers: function (request, reply) {
         Finger.findByIdAndUpdate(request.params.fingerID, { $set: request.payload }).then(function () {
             return reply({result: 'success'});
         })
             .catch(function (e) {
                 console.log('============',e);
                 return reply(Boom.internal('READ_ERR'));
             });
     }

};
