const _0x23f4b4=_0x373c;(function(_0xd111d1,_0x4824e7){const _0x4ab919=_0x373c,_0x578854=_0xd111d1();while(!![]){try{const _0x4cedbd=-parseInt(_0x4ab919(0x191))/0x1*(-parseInt(_0x4ab919(0x160))/0x2)+parseInt(_0x4ab919(0x16a))/0x3*(-parseInt(_0x4ab919(0x16b))/0x4)+-parseInt(_0x4ab919(0x165))/0x5*(parseInt(_0x4ab919(0x17c))/0x6)+-parseInt(_0x4ab919(0x171))/0x7*(parseInt(_0x4ab919(0x184))/0x8)+-parseInt(_0x4ab919(0x18b))/0x9*(-parseInt(_0x4ab919(0x190))/0xa)+-parseInt(_0x4ab919(0x18f))/0xb+parseInt(_0x4ab919(0x180))/0xc*(parseInt(_0x4ab919(0x175))/0xd);if(_0x4cedbd===_0x4824e7)break;else _0x578854['push'](_0x578854['shift']());}catch(_0x33243b){_0x578854['push'](_0x578854['shift']());}}}(_0xe2f2,0x667af));const Joi=require(_0x23f4b4(0x18c)),moment=require(_0x23f4b4(0x177)),{sendResponse:sendResponse}=require(_0x23f4b4(0x176)),{errorHandler:errorHandler}=require(_0x23f4b4(0x16e)),{AllowedDomainsModel:AllowedDomainsModel,AllowedWebDomainsModel:AllowedWebDomainsModel}=require('../models/AllowedDomainsModel'),User=require(_0x23f4b4(0x199)),{checkDomainAvailability:checkDomainAvailability}=require(_0x23f4b4(0x17a)),{default:mongoose}=require(_0x23f4b4(0x182)),{extractRootDomain:extractRootDomain}=require('../utils'),ValidationMiddleware=_0x474b4c=>(_0x583568,_0xe22a19,_0x544025)=>{const _0x5e1de8=_0x23f4b4,_0xb0739b={'PNnnw':function(_0x4498e9,_0x22eecf,_0x2574f3,_0x3d4227){return _0x4498e9(_0x22eecf,_0x2574f3,_0x3d4227);}};let _0x224945=0x1f4;try{const _0x541208={..._0x583568[_0x5e1de8(0x161)],..._0x583568[_0x5e1de8(0x185)],..._0x583568[_0x5e1de8(0x163)]},{error:_0x2dcaca}=Joi[_0x5e1de8(0x172)](_0x474b4c)[_0x5e1de8(0x15f)](!0x0)[_0x5e1de8(0x173)](_0x541208);if(_0x2dcaca){const {details:_0x159389}=_0x2dcaca,_0xc605bf=_0x159389[_0x5e1de8(0x192)](_0x98b769=>_0x98b769[_0x5e1de8(0x198)][_0x5e1de8(0x188)](/"/g,''))[_0x5e1de8(0x168)](',');throw _0x224945=0x1a6,new Error(_0xc605bf);}_0x544025();}catch(_0x1341f6){return _0xb0739b[_0x5e1de8(0x179)](errorHandler,_0xe22a19,_0x224945,_0x1341f6[_0x5e1de8(0x198)]);}},ValidationMiddlewareQuery=_0x510f96=>async(_0x722216,_0x1d76ad,_0x4650a0)=>{const _0xce3c59=_0x23f4b4,_0x3932cc={'KGKIj':function(_0x2090e1){return _0x2090e1();},'jNGPZ':function(_0x501ad7,_0x2d5abd,_0x20ca4e,_0x395f3a){return _0x501ad7(_0x2d5abd,_0x20ca4e,_0x395f3a);}};let _0x58b58b=0x1f4;try{const _0x41c46f={..._0x722216[_0xce3c59(0x185)],..._0x722216['params']},{error:_0x409209}=Joi[_0xce3c59(0x172)](_0x510f96)[_0xce3c59(0x15f)](!0x0)[_0xce3c59(0x173)](_0x41c46f);if(_0x409209){const {details:_0x6d52a4}=_0x409209,_0x39abdb=_0x6d52a4[_0xce3c59(0x192)](_0x2b3630=>_0x2b3630[_0xce3c59(0x198)])[_0xce3c59(0x168)](',');throw _0x58b58b=0x1a6,new Error(_0x39abdb);}_0x3932cc[_0xce3c59(0x197)](_0x4650a0);}catch(_0x3a8d35){return _0x3932cc[_0xce3c59(0x174)](errorHandler,_0x1d76ad,_0x58b58b,_0x3a8d35[_0xce3c59(0x198)]);}},AuthDomainMiddleware=async(_0x5144fc,_0x37b54b,_0x4b8be4)=>{const _0x2879b5=_0x23f4b4,_0x1f8a1a={'GPnpe':_0x2879b5(0x19d),'ZQexT':function(_0x149428,_0x2445aa){return _0x149428(_0x2445aa);},'MCrIs':'Appid\x20is\x20required','haOzS':_0x2879b5(0x16d),'gVRMu':'You\x20Are\x20Not\x20Allowed','eGshC':function(_0x32fd5f){return _0x32fd5f();},'ekqpE':function(_0x1fac04,_0x560106,_0x2cfb88,_0x428e04){return _0x1fac04(_0x560106,_0x2cfb88,_0x428e04);}};let _0x2eaf2f=0x1f4;try{let _0x26171c=_0x5144fc[_0x2879b5(0x162)]?_0x5144fc[_0x2879b5(0x162)]:{};const _0x553673={..._0x5144fc[_0x2879b5(0x161)],..._0x5144fc[_0x2879b5(0x185)],..._0x5144fc[_0x2879b5(0x163)],..._0x26171c};let {domain:_0x2c1ad5,appid:_0x333117}=_0x553673;if(!_0x2c1ad5)throw new Error(_0x1f8a1a[_0x2879b5(0x167)]);let _0x2cb037='http://'+_0x2c1ad5;const _0x297b1a=new URL('http://'+_0x2c1ad5)[_0x2879b5(0x18a)];if(_0x2c1ad5=_0x1f8a1a[_0x2879b5(0x193)](extractRootDomain,_0x2cb037),console[_0x2879b5(0x15c)](_0x2c1ad5),!_0x333117)throw new Error(_0x1f8a1a[_0x2879b5(0x187)]);if(!await _0x1f8a1a[_0x2879b5(0x193)](checkDomainAvailability,_0x2c1ad5))throw _0x2eaf2f=0x1a6,new Error(_0x1f8a1a[_0x2879b5(0x18e)]);let _0x19f3b7=await User['findOne']({'domain':_0x2c1ad5,'appid':_0x333117});if(!_0x19f3b7)throw _0x2eaf2f=0x193,new Error(_0x1f8a1a['gVRMu']);_0x19f3b7[_0x2879b5(0x166)]=_0x297b1a,await _0x19f3b7[_0x2879b5(0x194)](),_0x1f8a1a[_0x2879b5(0x169)](_0x4b8be4);}catch(_0x3757a2){return console[_0x2879b5(0x15c)](_0x3757a2),_0x1f8a1a[_0x2879b5(0x16f)](errorHandler,_0x37b54b,_0x2eaf2f,_0x3757a2[_0x2879b5(0x198)]);}},AuthDomainMiddlewarePackage=async(_0x32615c,_0x232c19,_0x43a96e)=>{const _0x2bd530=_0x23f4b4,_0x177994={'mWipG':function(_0x187099,_0x20ab17,_0x3a7ce6,_0x125c05){return _0x187099(_0x20ab17,_0x3a7ce6,_0x125c05);},'CYguO':_0x2bd530(0x170),'BeKKq':function(_0x45f349,_0xb2e687){return _0x45f349(_0xb2e687);},'nzobN':_0x2bd530(0x17d),'hldFc':'Subscription','xDnFl':'Please\x20Subsribe\x20First','TpuoT':function(_0x171ec6,_0x22a0b1,_0x30951d){return _0x171ec6(_0x22a0b1,_0x30951d);},'GzxDY':'Subscription\x20is\x20Expired','ETTAX':function(_0x1b6c7a){return _0x1b6c7a();},'ZQajb':function(_0x540330,_0xca9601,_0x5469d0,_0x23de39){return _0x540330(_0xca9601,_0x5469d0,_0x23de39);}};let _0x210cb2=0x1f4;if(!_0x32615c[_0x2bd530(0x15e)][_0x2bd530(0x189)])return _0x177994[_0x2bd530(0x186)](errorHandler,_0x232c19,0x194,_0x177994[_0x2bd530(0x15d)]);const _0x529b58=new URL(_0x32615c['headers']['origin'])['hostname'];let _0x10c517=_0x177994[_0x2bd530(0x17b)](extractRootDomain,_0x32615c[_0x2bd530(0x15e)][_0x2bd530(0x189)]);_0x32615c[_0x2bd530(0x161)][_0x2bd530(0x19a)]=_0x10c517,_0x32615c[_0x2bd530(0x161)][_0x2bd530(0x18a)]=_0x10c517;let _0x1ea3fc=_0x32615c[_0x2bd530(0x162)]?_0x32615c[_0x2bd530(0x162)]:{};const _0x4fdd80={..._0x32615c[_0x2bd530(0x161)],..._0x32615c[_0x2bd530(0x185)],..._0x32615c[_0x2bd530(0x163)],..._0x1ea3fc};let {domain:_0x1d3ea4,appid:_0x1ef8ad}=_0x4fdd80;try{if(!_0x1d3ea4)throw _0x210cb2=0x190,new Error('Domain\x20is\x20required');if(console[_0x2bd530(0x15c)](_0x2bd530(0x19a),_0x1d3ea4),!_0x1ef8ad)throw _0x210cb2=0x190,new Error(_0x177994['nzobN']);let _0x176cd2=await User[_0x2bd530(0x164)]({'domain':_0x1d3ea4,'appid':_0x1ef8ad})[_0x2bd530(0x178)](_0x2bd530(0x16c));if(!_0x176cd2)throw _0x210cb2=0x193,new Error('You\x20Are\x20Not\x20Allowed');{let _0x5a0ced=_0x176cd2[_0x2bd530(0x16c)];if(console['log'](_0x177994[_0x2bd530(0x196)],_0x5a0ced),!_0x5a0ced)throw _0x210cb2=0x190,new Error(_0x177994[_0x2bd530(0x19c)]);if(!_0x5a0ced[_0x2bd530(0x18d)]&&!_0x5a0ced[_0x2bd530(0x17f)])throw _0x210cb2=0x190,new Error(_0x177994['xDnFl']);const _0x3eb19b=moment();if(_0x177994[_0x2bd530(0x195)](moment,_0x5a0ced[_0x2bd530(0x17f)],'MMM\x20DD\x20HH:mm:ss\x20YYYY\x20GMT')[_0x2bd530(0x183)](_0x3eb19b))throw _0x210cb2=0x190,new Error(_0x177994[_0x2bd530(0x181)]);_0x176cd2[_0x2bd530(0x166)]=_0x529b58,await _0x176cd2[_0x2bd530(0x194)](),_0x32615c[_0x2bd530(0x162)]=_0x176cd2,_0x177994[_0x2bd530(0x19b)](_0x43a96e);}}catch(_0x1f1ee2){return console[_0x2bd530(0x15c)](_0x1f1ee2),_0x177994[_0x2bd530(0x17e)](errorHandler,_0x232c19,_0x210cb2,_0x1f1ee2['message']);}};function _0x373c(_0x417d04,_0x5da84e){const _0xe2f243=_0xe2f2();return _0x373c=function(_0x373c52,_0x48416c){_0x373c52=_0x373c52-0x15c;let _0x5df0a0=_0xe2f243[_0x373c52];return _0x5df0a0;},_0x373c(_0x417d04,_0x5da84e);}function _0xe2f2(){const _0x1e8579=['PNnnw','../utilities/functions/functions','BeKKq','2220846raljvf','Appid\x20is\x20required','ZQajb','endDate','18108sMWViG','GzxDY','mongoose','isBefore','42488sYQodi','query','mWipG','MCrIs','replace','origin','hostname','83502vZKPoW','joi','startDate','haOzS','6178282TWaZdg','480QmdKxJ','1rJdHqn','map','ZQexT','save','TpuoT','hldFc','KGKIj','message','../models/User','domain','ETTAX','xDnFl','Domain\x20is\x20required','exports','log','CYguO','headers','unknown','1526524ewIxYX','body','user','params','findOne','5ASnUBq','subdomain','GPnpe','join','eGshC','6psWpmq','968008damjPO','subsription','Domain\x20Not\x20found','../utils/errorHandler','ekqpE','Origin\x20Not\x20found','7MbgGyy','object','validate','jNGPZ','5447ELGmZt','../utils/dataHandler','moment','populate'];_0xe2f2=function(){return _0x1e8579;};return _0xe2f2();}module[_0x23f4b4(0x19e)]={'ValidationMiddleware':ValidationMiddleware,'ValidationMiddlewareQuery':ValidationMiddlewareQuery,'AuthDomainMiddleware':AuthDomainMiddleware,'AuthDomainMiddlewarePackage':AuthDomainMiddlewarePackage};