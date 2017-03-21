const mongoose = require('mongoose');

const SoldierFinger = mongoose.Schema({
    name: {type: String, required: false, trim: true},
    finger_id: {type: String, unique: true, required: true, trim: true},
    rfid: {type: String, required: true, trim: true},

    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},  { collection: 'fingers' });

module.exports = mongoose.model('fingers', SoldierFinger);

