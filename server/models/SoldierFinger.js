const mongoose = require('mongoose');

const SoldierFinger = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    finger_id: {type: String, required: true, unique: true, trim: true},

    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},  { collection: 'fingers' });

module.exports = mongoose.model('fingers', SoldierFinger);

