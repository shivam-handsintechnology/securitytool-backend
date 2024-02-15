var express = require('express');
const WhitelistModels=require('../models/WhitelistModel');
const BlacklistModel=require('../models/BlacklistModel');
const { sendResponse } = require('../utils/dataHandler');
var router = express.Router();
async function ValidateIPaddress(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return true
    }  
    return false
  } 
router.post('/add',async(req,res)=>{
 
    const {ip} =req.body
   const valid=await ValidateIPaddress(ip)
   if(!valid){
    return sendResponse(res,406,"Please enter valid ip address")
   }
      if(!ip){
        return sendResponse(res,406,"Please enter any ip address")
      }
     const exist=await WhitelistModels.findOne({ip})
     if(exist){
        return sendResponse(res,401,"Enter Ip is Already Exist")
     }
     else if(!exist){
        await WhitelistModels.create({ip})
        return sendResponse(res,200,"Added Successfully")
     }
    // switch(true){
    //     case exist:
    //         return sendResponse(res,401,"Enter Ip is Already Exist")
    //         break;
            
    // }
    console.log()
});
router.get('/all',async(req,res)=>{
   try {
    const data=await WhitelistModels.find({},{_id:0})
    if(data.length===0){
        return sendResponse(res,404,"Records Are not Found")
    }
    if(data.length>0){
        return sendResponse(res,200,"fetch all ips",data)
    }
   } catch (error) {
    console.log(error)
    return sendResponse(res,500,error.message)
   }
    
})
router.delete('/',async(req,res)=>{
   try {
    console.log(req.query)
    const {ip}=req.query
    console.log({delete:ip})
   const deleteselectedip= await WhitelistModels.findOneAndDelete({ip})
   if(deleteselectedip){
    return sendResponse(res,200,"delete ip address")
   }
       return false
        return sendResponse(res,200,"delete ip address")
   } catch (error) {
    console.error(error)
    return sendResponse(res,500,error.message)
   }
    
})
router.post('/blacklist/add',async(req,res)=>{
    const {ip} =req.body
   const valid=await ValidateIPaddress(ip)
   if(!valid){
    return sendResponse(res,406,"Please enter valid ip address")
   }
      if(!ip){
        return sendResponse(res,406,"Please enter any ip address")
      }
     const exist=await BlacklistModel.findOne({ip})
     if(exist){
        return sendResponse(res,401,"Enter Ip is Already Exist")
     }
     else if(!exist){
        await BlacklistModel.create({ip})
        return sendResponse(res,200,"Added Successfully")
     }
    // switch(true){
    //     case exist:
    //         return sendResponse(res,401,"Enter Ip is Already Exist")
    //         break;
            
    // }
    console.log()
});
router.get('/blacklist/all',async(req,res)=>{
   try {
    const data=await BlacklistModel.find({},{_id:0})
    if(data.length===0){
        return sendResponse(res,404,"Records Are not Found")
    }
    if(data.length>0){
        return sendResponse(res,200,"fetch all ips",data)
    }
   } catch (error) {
    console.log(error)
    return sendResponse(res,500,error.message)
   }
    
})
router.delete('/blacklist',async(req,res)=>{
   try {
    console.log(req.query)
    const {ip}=req.query
    console.log({delete:ip})
   const deleteselectedip= await BlacklistModel.findOneAndDelete({ip})
   if(deleteselectedip){
    return sendResponse(res,200,"delete ip address")
   }
       return false
        return sendResponse(res,200,"delete ip address")
   } catch (error) {
    console.error(error)
    return sendResponse(res,500,error.message)
   }
    
})
module.exports = router;