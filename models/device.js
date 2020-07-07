const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true },
    owner: { type: String, required: true },
    price: { type: Number, required: true }, 
    imagePath:{ type: String, required: true }, 
    ownerId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true 
     }  
});
 


module.exports = mongoose.model("Device", deviceSchema);
