var _0x2c0c2f=_0x5336;(function(_0x2462e3,_0x3bf213){var _0x50978a=_0x5336,_0x150a70=_0x2462e3();while(!![]){try{var _0x45adee=-parseInt(_0x50978a(0xd3))/0x1*(parseInt(_0x50978a(0xdb))/0x2)+parseInt(_0x50978a(0xd2))/0x3*(parseInt(_0x50978a(0xe6))/0x4)+-parseInt(_0x50978a(0xe9))/0x5+parseInt(_0x50978a(0xd4))/0x6*(-parseInt(_0x50978a(0xeb))/0x7)+parseInt(_0x50978a(0xe7))/0x8*(-parseInt(_0x50978a(0xea))/0x9)+parseInt(_0x50978a(0xe2))/0xa+-parseInt(_0x50978a(0xd6))/0xb*(-parseInt(_0x50978a(0xd9))/0xc);if(_0x45adee===_0x3bf213)break;else _0x150a70['push'](_0x150a70['shift']());}catch(_0x5e714e){_0x150a70['push'](_0x150a70['shift']());}}}(_0x2024,0x5fff4));var express=require(_0x2c0c2f(0xd7)),router=express[_0x2c0c2f(0xcf)]();function _0x5336(_0x5f4d11,_0x3f8f55){var _0x202405=_0x2024();return _0x5336=function(_0x5336e6,_0x1efe73){_0x5336e6=_0x5336e6-0xcf;var _0x302513=_0x202405[_0x5336e6];return _0x302513;},_0x5336(_0x5f4d11,_0x3f8f55);}function _0x2024(){var _0x21cb66=['20wTXKWQ','32NZvGEp','../helpers/Validators','2303630YgScOM','834759MkkvcL','7DTBjId','Register','exports','Router','Profile','/facebook','84603ISDyef','13QFRiul','1145682exHQgl','/register','1845844JIQHdC','express','/profile','108lCibMp','../controllers/UserController','88584kxziFu','/checkout/verify','../middlewares/ValidationMiddleware','/logout','/checkout','post','CheckoutSuccess','3404360SKjabr','/login','get','GoogleRegister'];_0x2024=function(){return _0x21cb66;};return _0x2024();}const {UserController:UserController}=require(_0x2c0c2f(0xda)),verifyToken=require('../middlewares/VerifyUser'),{ValidationMiddleware:ValidationMiddleware}=require(_0x2c0c2f(0xdd)),{razorPayValidation:razorPayValidation,razorPaySuccessValidation:razorPaySuccessValidation}=require(_0x2c0c2f(0xe8));router[_0x2c0c2f(0xe0)](_0x2c0c2f(0xd5),UserController[_0x2c0c2f(0xec)]),router['post'](_0x2c0c2f(0xe3),UserController['Login']),router[_0x2c0c2f(0xe0)]('/Oauth',UserController[_0x2c0c2f(0xe5)]),router[_0x2c0c2f(0xe4)](_0x2c0c2f(0xd8),verifyToken,UserController[_0x2c0c2f(0xd0)]),router['post'](_0x2c0c2f(0xd1),UserController['FBCustomerLogin']),router['post'](_0x2c0c2f(0xde),UserController['Logout']),router[_0x2c0c2f(0xe0)](_0x2c0c2f(0xdf),verifyToken,ValidationMiddleware(razorPayValidation),UserController['Checkout']),router[_0x2c0c2f(0xe0)](_0x2c0c2f(0xdc),verifyToken,ValidationMiddleware(razorPaySuccessValidation),UserController[_0x2c0c2f(0xe1)]),module[_0x2c0c2f(0xed)]=router;