const mongoose = require("mongoose");
const { Schema } = mongoose;
const MiddlewaresSchema=new Schema({
  user: {type:mongoose.Types.ObjectId,unique:true},
  appid: {type:String,unique:true},
  SqlDetectorMiddlware: {type:Boolean,default:true},
  BotMiddleware: {type:Boolean,default:true},
  VpnProtectMiddlware: {type:Boolean,default:true},
  SpamMiddleware: {type:Boolean,default:true},
  xssInjectionDetectorMiddlware: {type:Boolean,default:true},
  checkHTMLMiddlware: {type:Boolean,default:true},
  NosqlDetectorMiddlware: {type:Boolean,default:true},
  commandlineinjectionMiddlware: {type:Boolean,default:true},
  ldapInjectionDetectorMiddlware: {type:Boolean,default:true},
  BlockUserMiddlware: {type:Boolean,default:true},
},{
    timestamps:true
})
const middlewareModel=mongoose.model("middlewares", MiddlewaresSchema);
module.exports ={middlewareModel}
// Create collection of Model
