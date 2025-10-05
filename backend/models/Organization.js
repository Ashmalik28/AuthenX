import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId =  mongoose.Types.ObjectId;

const organizationSchema = new Schema ({
    walletAddress : {type : String , unique : true , required : true},
    nonce : {type : String , default : () => Math.floor(Math.random() * 1000000).toString()},
    kycDetails : {type : Object},
    iskycVerified : {type : Boolean , default : false},
},{ timestamps: true });

const OrganizationModel = mongoose.model('organizationSchema' , organizationSchema)

export default OrganizationModel;