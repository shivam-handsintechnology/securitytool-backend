const _0x2a3f49=_0x440b;(function(_0x28ad65,_0x13cc9a){const _0x548ac9=_0x440b,_0x5a635f=_0x28ad65();while(!![]){try{const _0x49b818=-parseInt(_0x548ac9(0x91))/0x1*(-parseInt(_0x548ac9(0x92))/0x2)+parseInt(_0x548ac9(0x8e))/0x3*(parseInt(_0x548ac9(0x87))/0x4)+parseInt(_0x548ac9(0x86))/0x5*(parseInt(_0x548ac9(0x8b))/0x6)+-parseInt(_0x548ac9(0x8a))/0x7*(parseInt(_0x548ac9(0x85))/0x8)+-parseInt(_0x548ac9(0x88))/0x9+-parseInt(_0x548ac9(0x95))/0xa*(parseInt(_0x548ac9(0x8f))/0xb)+-parseInt(_0x548ac9(0x8c))/0xc;if(_0x49b818===_0x13cc9a)break;else _0x5a635f['push'](_0x5a635f['shift']());}catch(_0x1fe906){_0x5a635f['push'](_0x5a635f['shift']());}}}(_0x3bc5,0x600a3));function _0x440b(_0x5be08e,_0x1e3177){const _0x3bc5fd=_0x3bc5();return _0x440b=function(_0x440b3b,_0x3d3862){_0x440b3b=_0x440b3b-0x85;let _0x11cb63=_0x3bc5fd[_0x440b3b];return _0x11cb63;},_0x440b(_0x5be08e,_0x1e3177);}function _0x3bc5(){const _0x17e993=['forEach','concat','280fRsJLs','2891670WLNbmA','608SuxJlJ','574506lyqHgv','keys','27237YXLWey','6qsSfGO','1287480NMfkeQ','filter','10377lVFECr','6379571kwLLco','exports','21RSXJoX','16814ItdvvR','includes','./report','10zHhDVi'];_0x3bc5=function(){return _0x17e993;};return _0x3bc5();}const {addError:addError,addWarning:addWarning,addInfo:addInfo}=require(_0x2a3f49(0x94)),{mandatory:mandatory,optional:optional,avoid:avoid,deprecated:deprecated}=require('./rules.json'),errorFields=_0x51e39e=>{const _0x5b658b=_0x2a3f49,_0x5520ad=Object['keys'](_0x51e39e);avoid[_0x5b658b(0x8d)](_0xf2f7c7=>_0x5520ad[_0x5b658b(0x93)](_0xf2f7c7))[_0x5b658b(0x96)](_0x4373a8=>addError({'Remove_field':_0x4373a8})),mandatory[_0x5b658b(0x8d)](_0xd4c4d2=>!_0x5520ad['includes'](_0xd4c4d2))['forEach'](_0x5ae7e3=>addError({'Missing_field':_0x5ae7e3}));},availableFields=_0x2b07bf=>{const _0x5081b0=_0x2a3f49,_0x4ca960=Object['keys'](_0x2b07bf);mandatory['filter'](_0x10ebcd=>_0x4ca960[_0x5081b0(0x93)](_0x10ebcd))[_0x5081b0(0x96)](_0xf96126=>addError({'availableFields':_0xf96126}));},warningFields=_0x4d95db=>{const _0x19de3d=_0x2a3f49,_0x4f0c24=Object[_0x19de3d(0x89)](_0x4d95db);optional[_0x19de3d(0x8d)](_0x4761af=>!_0x4f0c24['includes'](_0x4761af))['forEach'](_0x3593f1=>addWarning({'optional':_0x3593f1}));},infoFields=_0x36b3ae=>{const _0x3aa752=_0x2a3f49,_0x4f8a51=[][_0x3aa752(0x97)](optional,mandatory,avoid,deprecated);Object['keys'](_0x36b3ae)[_0x3aa752(0x8d)](_0x1ddb9e=>!_0x4f8a51[_0x3aa752(0x93)](_0x1ddb9e))[_0x3aa752(0x96)](_0x3e2f15=>addInfo({'Additional_information':_0x3e2f15}));},headerValidation=(_0x3d4ac1={})=>[availableFields,errorFields,warningFields][_0x2a3f49(0x96)](_0x421fa1=>_0x421fa1(_0x3d4ac1));module[_0x2a3f49(0x90)]={'headerValidation':headerValidation,'errorFields':errorFields,'warningFields':warningFields,'infoFields':infoFields};