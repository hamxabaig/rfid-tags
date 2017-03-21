const mongoose = require('mongoose');

const Finger = mongoose.Schema({
    name: {type: String, required: false, trim: true},
    finger_id: {type: String, unique: true, required: true, trim: true},

    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},  { collection: 'finger' });

module.exports = mongoose.model('finger', Finger);

