
const { middlewareModel } = require('../models/midlwaresModel')
const {sendResponse}=require('../utils/dataHandler')
const getMiddlewareController=async(req,res)=>{
    try {
          const data=await middlewareModel.findOne({user:req.user.id})
          if(data){
            sendResponse(res,200,"data fetch successfully",data)
          }else{
            sendResponse(res,404,"data Not Found")
          }
    } catch (error) {
     console.error(error)
    }
  }
const getMiddlewareControllerForClient=async(req,res)=>{
    try {
      if(req.query.appid){
        const data=await middlewareModel.findOne({appid:req.query.appid})
        if(data){
          sendResponse(res,200,"data fetch successfully",data)
        }else{
          sendResponse(res,404,"Your App id Not matched")
        }
      }else{
        return sendResponse(res,404,"Please enter appid")
      }
       
    } catch (error) {
     console.error(error)
    }
  }
const findAndUpdateMiddlewareController=async(req,res)=>{
  console.log(req.body)
  const body=req.body
    try { 
          const data=await middlewareModel.updateOne({user:req.user.id},{$set:body})
          if(data){
            const message=Object.keys(req.body).toString().replace('Middlware','')+" "+"updated successfully"
            sendResponse(res,200,message,data)
            setTimeout(() => {
              process.exit()
            }, 5000);
          }else{
            sendResponse(res,404,"data Not Found")
          }

    } catch (error) {
     console.error(error)
    }
  }
  const middlwareController={
    findAndUpdateMiddlewareController,
    getMiddlewareController,
    getMiddlewareControllerForClient
  }
  module.exports=middlwareController