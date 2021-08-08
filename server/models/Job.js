const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const JobSchema = new mongoose.Schema({
    fileName: {
        type: 'String',
        required: true
    },
    jobName: {
        type: 'String',
        required: true,
        trim: true,
        maxLength: 100
    },
    jobDesc: {
        type: 'String',
        required: true,
        trim: true
    },
    jobPrice: {
        type: Number,
        required: true
    },
    jobCategory: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    jobQty: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;

