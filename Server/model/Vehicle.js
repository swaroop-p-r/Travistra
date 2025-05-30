const mongoose=require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicle_name: {type:String,required:true,trim:true},
    registration_no: {type:String,required:true,trim:true},
    model: {type:String,required:true,trim:true},
    type: {
        type:String,
        required:true,
        trim:true,
        enum:['Traveller','Bus','Car','Suv','Jeep']
    },
    seat: {type:Number,required:true,min:1},
    status: {
        type:Boolean,
        default:true
    },
    image:{type:String,required:true}
},{timestamps:true})

const Vehicle = mongoose.model('vehicle_tbl',vehicleSchema);

module.exports=Vehicle;
