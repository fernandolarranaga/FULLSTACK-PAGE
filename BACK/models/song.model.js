// song.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: String,
    artist: String,
    genre: String,
    album: String,
    photo:String, // eliminar esto si no funciona
    duration: Number,
    year: Number,
    trackNumber: Number,
    isExplicit: Boolean,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
