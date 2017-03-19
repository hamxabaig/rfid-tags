const mongoose = require('mongoose');


const PersonsSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    army_number: {type: String, required: true, trim: true},
    dob: {type: String, required: true, trim: true},
    rank: {type: String, required: true, trim: true},
    batch_no: {type: String, required: true, trim: true},
    med_cat: {type: String, required: true, trim: true},
    trade: {type: String, required: true, trim: true},
    current_unit: {type: String, required: true, trim: true},
    mil_courses: {type: Array, required: true, trim: true},
    children: {type: Array, required: false, trim: true},
    parents: {type: Array, required: true, trim: true},

    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},  { collection: 'persons' });

module.exports = mongoose.model('persons', PersonsSchema);

