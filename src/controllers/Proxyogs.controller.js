const { default: mongoose } = require('mongoose')
const { sendResponse } = require('../utils/dataHandler')
const { errorHandler } = require('../utils/errorHandler')
const { Project_Security_Logs } = require('../models/Project_Security_Logs')
const getAllProxylLogs=async(req,res)=>{
   try {
    const data=await Project_Security_Logs.find({}).where({type:"VPN"})
    sendResponse(res,200,"Proxy fetch successfully",data)
   } catch (error) {
    errorHandler(res,error)
   }
}
const getSingleProxylLogs=async(req,res)=>{
  try {
    const ip=req.body.ip
    if(ip){
        const data=await Project_Security_Logs.findOne({ip,type:"VPN"})
        sendResponse(res,200,"data fetch successfully",data)
    }else{
        sendResponse(res,404,"plesae enter valid id")
    }
  } catch (error) {
    errorHandler(res,error)
  }
}
const getSingleProxylLogsCount=async(req,res)=>{
  try {
    
        const data=await Project_Security_Logs.find({type:"VPN"}).count()
        if(data){

            sendResponse(res,200,"data fetch successfully",data)
        }else{
            errorHandler(res,404,"data not found")
        }
    
  } catch (error) {
    errorHandler(res,error)
  }
}
const deleteSingleProxylLogs=async(req,res)=>{
    try {
            const ip=req.body.ip
            console.log(ip)
            
            const data=await Project_Security_Logs.findOneAndDelete({ip,type:"VPN"})
            if(data){
               sendResponse(res,200,"data deleted successfully",data)
            }  else{
                sendResponse(res,404,"please enter valid id",data)
            }
      
    } catch (error) {
        errorHandler(res,error)
    }
}
    const deleteAllProxylLogs=async(req,res)=>{
     const ip=req.body.ip
     if(req.body.ip==""){
        console.log("empty")
     }
     console.log(ip)
    try {
        if(ip){
            const data=await Project_Security_Logs.deleteMany({ip:ip,type:"VPN"})
            sendResponse(res,200,"data deleted  successfully",data)
        }else{
            errorHandler(res,404,"data not found")
        }
    } catch (error) {
        errorHandler(res,error)
    }
}

const Proxylogs={
    deleteAllProxylLogs,
    getAllProxylLogs,
    getSingleProxylLogs,
    deleteSingleProxylLogs,
    getSingleProxylLogsCount,
}
module.exports=Proxylogs