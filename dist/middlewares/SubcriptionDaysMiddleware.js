const _0x562d3f=_0x3cf5;function _0x2c62(){const _0x54ec3f=['_id','772574eaIDnK','endDate','CmHAm','jeRgX','69761bgULrc','jsonwebtoken','header','User\x20not\x20found','4zwwRJi','Subscription\x20not\x20found','TwJcg','1048cvrdZN','JWT_SECRET','findOne','8334iKxdNW','1275261ccFMCS','4440iyhqaa','env','Mrunl','Authorization','16996DalrlQ','../models/UserModel','2643462XmwRsK','verify','108EfYcYO','2225ZdCnlS','replace','../utils/errorHandler','1004oOLZCB','zWzfg','../models/SubscriptionModel'];_0x2c62=function(){return _0x54ec3f;};return _0x2c62();}function _0x3cf5(_0x20b365,_0x4a9b4e){const _0x2c625f=_0x2c62();return _0x3cf5=function(_0x3cf5f9,_0x3b7646){_0x3cf5f9=_0x3cf5f9-0x1b7;let _0x16c964=_0x2c625f[_0x3cf5f9];return _0x16c964;},_0x3cf5(_0x20b365,_0x4a9b4e);}(function(_0x35b848,_0x3c2e1d){const _0x2bcd13=_0x3cf5,_0x3f51ae=_0x35b848();while(!![]){try{const _0x2a3a1b=parseInt(_0x2bcd13(0x1b9))/0x1*(-parseInt(_0x2bcd13(0x1bd))/0x2)+-parseInt(_0x2bcd13(0x1c4))/0x3+-parseInt(_0x2bcd13(0x1d1))/0x4*(parseInt(_0x2bcd13(0x1ce))/0x5)+-parseInt(_0x2bcd13(0x1cb))/0x6+-parseInt(_0x2bcd13(0x1c9))/0x7*(-parseInt(_0x2bcd13(0x1c0))/0x8)+parseInt(_0x2bcd13(0x1c3))/0x9*(parseInt(_0x2bcd13(0x1c5))/0xa)+parseInt(_0x2bcd13(0x1d5))/0xb*(parseInt(_0x2bcd13(0x1cd))/0xc);if(_0x2a3a1b===_0x3c2e1d)break;else _0x3f51ae['push'](_0x3f51ae['shift']());}catch(_0x4704a0){_0x3f51ae['push'](_0x3f51ae['shift']());}}}(_0x2c62,0x3bad5));const jwt=require(_0x562d3f(0x1ba)),{errorHandler:errorHandler}=require(_0x562d3f(0x1d0)),{UserModel:UserModel}=require(_0x562d3f(0x1ca)),{SubscriptionModel:SubscriptionModel}=require(_0x562d3f(0x1d3)),SubscriptionDaysMiddleware=async(_0x15ead5,_0x47d019,_0x44568d)=>{const _0x3eff27=_0x562d3f,_0x414f5f={'zWzfg':_0x3eff27(0x1c8),'jdRBx':'Bearer\x20','jeRgX':_0x3eff27(0x1bc),'oCozW':_0x3eff27(0x1be),'TwJcg':function(_0x485840,_0x526158){return _0x485840>_0x526158;},'vJFCL':'Subscription\x20expired','Mrunl':function(_0x176841){return _0x176841();},'CmHAm':function(_0x42a3bf,_0x3ccfae,_0x58e2b0){return _0x42a3bf(_0x3ccfae,_0x58e2b0);}};try{const _0x394c8d=_0x15ead5[_0x3eff27(0x1bb)](_0x414f5f[_0x3eff27(0x1d2)])[_0x3eff27(0x1cf)](_0x414f5f['jdRBx'],''),_0x483e18=jwt[_0x3eff27(0x1cc)](_0x394c8d,process[_0x3eff27(0x1c6)][_0x3eff27(0x1c1)]);if(!await UserModel['findOne']({'_id':_0x483e18[_0x3eff27(0x1d4)]}))throw new Error(_0x414f5f[_0x3eff27(0x1b8)]);const _0x4c2bf5=await SubscriptionModel[_0x3eff27(0x1c2)]({'userId':_0x483e18[_0x3eff27(0x1d4)]});if(!_0x4c2bf5)throw new Error(_0x414f5f['oCozW']);if(_0x414f5f[_0x3eff27(0x1bf)](new Date(),_0x4c2bf5[_0x3eff27(0x1d6)]))throw new Error(_0x414f5f['vJFCL']);_0x414f5f[_0x3eff27(0x1c7)](_0x44568d);}catch(_0x55b5ce){_0x414f5f[_0x3eff27(0x1b7)](errorHandler,_0x55b5ce,_0x47d019);}};