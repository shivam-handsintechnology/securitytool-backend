const mongoose = require("mongoose");

const AllowedDomainsModelSchema=mongoose.Schema({
    domain:{type:String, unique:true}
}, {timestamps:false,
    versionKey: false,
  
}
)
const AllowedDomainsModel=mongoose.model("AllowedDomainsModel",AllowedDomainsModelSchema)
module.exports={AllowedDomainsModel}