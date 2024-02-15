const { default: mongoose } = require('mongoose')
const { Project_Security_Logs } = require('../models/Project_Security_Logs')
const { sendResponse } = require('../utils/dataHandler')
const { errorHandler } = require('../utils/errorHandler')
const getAllSqllLogs=async(req,res)=>{
   try {
    const data=await Project_Security_Logs.find({}).where({type:"SQLI"})
    sendResponse(res,200,"data fetch successfully",data)
   } catch (error) {
    errorHandler(res,error)
   }
}
const getSingleSqllLogs=async(req,res)=>{
  try {
    const ip=req.body.ip
    if(ip){
        const data=await Project_Security_Logs.findOne({ip}).where({type:"SQLI"})
        sendResponse(res,200,"data fetch successfully",data)
    }else{
        sendResponse(res,404,"plesae enter valid id")
    }
  } catch (error) {
    errorHandler(res,error)
  }
}
const getSingleSqllLogsCount=async(req,res)=>{
  try {
        const data=await Project_Security_Logs.find().where({type:"SQLI"}).count()
        if(data){
            sendResponse(res,200,"data fetch successfully",data)
        }else{
            errorHandler(res,404,"data not found")
        }
    
  } catch (error) {
    errorHandler(res,error)
  }
}
const deleteSingleSqllLogs=async(req,res)=>{
    try {
            const ip=req.body.ip
            console.log(ip)
            
            const data=await Project_Security_Logs.findOneAndDelete({ip}).where({type:"SQLI"})
            if(data){
               sendResponse(res,200,"data deleted successfully",data)
            }  else{
                sendResponse(res,404,"please enter valid id",data)
            }
      
    } catch (error) {
        errorHandler(res,error)
    }
}
    const deleteAllSqllLogs=async(req,res)=>{
     const ip=req.body.ip
     if(req.body.ip==""){
        console.log("empty")
     }
     console.log(ip)
    try {
        if(ip){
            const data=await Project_Security_Logs.deleteMany({ip:ip}).where({type:"SQLI"})
            sendResponse(res,200,"data deleted  successfully",data)
        }else{
            errorHandler(res,404,"data not found")
        }
    } catch (error) {
        errorHandler(res,error)
    }
}

const Sqllogs={
    deleteAllSqllLogs,
    getAllSqllLogs,
    getSingleSqllLogs,
    deleteSingleSqllLogs,
    getSingleSqllLogsCount,
}
module.exports=Sqllogs