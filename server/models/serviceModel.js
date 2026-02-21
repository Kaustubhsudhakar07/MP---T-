const {Schema, model} = require("mongoose");

const serviceSchema = new Schema({
    service: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    provider: { type: Number, required: true } // in minutes
    
});

const Service = model("Service", serviceSchema);

module.exports = Service;