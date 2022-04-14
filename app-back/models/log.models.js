const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
    action_log : { type : String, required : true },
    message_log : { type : String, required : true },
    create_by : { type : String, required : false }
},
{
    timestamps: { 
        createdAt: 'createdAt', 
        updatedAt: 'updatedAt' 
    },
});

module.exports = mongoose.model('Log', logSchema);