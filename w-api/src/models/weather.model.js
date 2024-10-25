const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true
    },
    datetime: {
        type: Date,
        required: true
    },
    main: {
        type: String,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    feels_like: {
        type: Number,
        required: true
    },
    low_temp: {
        type: Number,
        required: true
    },
    high_temp : {
        type: Number,
        required: true
    },
    pressure : {
        type: Number,
        required: true
    },
    humidity : {
        type: Number,
        required: true
    },
    visibility : {
        type: Number,
        required: true
    },
    wind_speed : {
        type: Number,
        required: true
    },
    sunrise : {
        type : Number,
        required : true
    },
    sunset : {
        type : Number, 
        required : true
    }
});

const Weather = mongoose.model('Weather', weatherSchema, 'weather');

module.exports = Weather;