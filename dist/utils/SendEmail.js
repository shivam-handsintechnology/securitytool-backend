const _0x1c9fbc=_0xaabe;function _0xaabe(_0x49b8fe,_0x3dcc6a){const _0x2184e7=_0x2184();return _0xaabe=function(_0xaabee1,_0x40920c){_0xaabee1=_0xaabee1-0x128;let _0x47d1ea=_0x2184e7[_0xaabee1];return _0x47d1ea;},_0xaabe(_0x49b8fe,_0x3dcc6a);}(function(_0x5327db,_0x3e8469){const _0x557371=_0xaabe,_0x4df9e7=_0x5327db();while(!![]){try{const _0xe75401=-parseInt(_0x557371(0x12f))/0x1+parseInt(_0x557371(0x131))/0x2*(-parseInt(_0x557371(0x132))/0x3)+-parseInt(_0x557371(0x129))/0x4+parseInt(_0x557371(0x133))/0x5*(parseInt(_0x557371(0x12b))/0x6)+parseInt(_0x557371(0x12d))/0x7+parseInt(_0x557371(0x12c))/0x8*(-parseInt(_0x557371(0x128))/0x9)+parseInt(_0x557371(0x12e))/0xa;if(_0xe75401===_0x3e8469)break;else _0x4df9e7['push'](_0x4df9e7['shift']());}catch(_0x13a586){_0x4df9e7['push'](_0x4df9e7['shift']());}}}(_0x2184,0x9ea76));const nodemailer=require(_0x1c9fbc(0x130)),{email:email,password:password}=require('../config/email'),transporter=nodemailer[_0x1c9fbc(0x12a)]({'service':'gmail','auth':{'user':email,'pass':password}}),SendEmail=async(_0x5d77fc,_0x5c89f3,_0x6a554a,_0x58676c)=>{try{const _0x2fcc52={'from':email,'to':_0x5d77fc,'subject':_0x5c89f3,'text':_0x6a554a,'html':_0x58676c};return await transporter['sendMail'](_0x2fcc52),!0x0;}catch(_0x2d7d2a){return!0x1;}};function _0x2184(){const _0x5e7147=['1755RzQFmo','287965GApSLb','9ELsMJg','2947912xAAzta','createTransport','6tdVnwU','9973336qMqyqt','8785406VgwOtG','31759870BpRuCG','1156072THxtfX','nodemailer','2390ailAMl'];_0x2184=function(){return _0x5e7147;};return _0x2184();}module['exports']={'SendEmail':SendEmail};