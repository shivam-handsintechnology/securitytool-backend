function _0x1921(_0x5a4116,_0x50072d){const _0x53de6a=_0x53de();return _0x1921=function(_0x1921c9,_0xe5ff09){_0x1921c9=_0x1921c9-0x174;let _0xa1b04e=_0x53de6a[_0x1921c9];return _0xa1b04e;},_0x1921(_0x5a4116,_0x50072d);}const _0x2092a1=_0x1921;(function(_0x2b89bb,_0x47e130){const _0x40ef05=_0x1921,_0x5bf791=_0x2b89bb();while(!![]){try{const _0x4cb5b5=parseInt(_0x40ef05(0x1af))/0x1+parseInt(_0x40ef05(0x19d))/0x2*(-parseInt(_0x40ef05(0x1a9))/0x3)+parseInt(_0x40ef05(0x179))/0x4*(parseInt(_0x40ef05(0x17e))/0x5)+parseInt(_0x40ef05(0x1b2))/0x6*(parseInt(_0x40ef05(0x19a))/0x7)+-parseInt(_0x40ef05(0x18f))/0x8+parseInt(_0x40ef05(0x177))/0x9+-parseInt(_0x40ef05(0x1b1))/0xa*(parseInt(_0x40ef05(0x189))/0xb);if(_0x4cb5b5===_0x47e130)break;else _0x5bf791['push'](_0x5bf791['shift']());}catch(_0x43d23b){_0x5bf791['push'](_0x5bf791['shift']());}}}(_0x53de,0xedf6b));const {sendResponse:sendResponse}=require('../utils/dataHandler'),{validateIPaddress:validateIPaddress}=require(_0x2092a1(0x1b4)),fs=require('fs'),path=require(_0x2092a1(0x18a));let whitelispath=path['join'](__dirname,_0x2092a1(0x197)),blacklistpath=path[_0x2092a1(0x190)](__dirname,_0x2092a1(0x180)),iswhitelistfilecreated=fs['existsSync'](whitelispath);iswhitelistfilecreated||fs['writeFileSync'](whitelispath,JSON[_0x2092a1(0x185)]([]));let blacklistfilecreated=fs[_0x2092a1(0x19e)](blacklistpath);blacklistfilecreated||fs['writeFileSync'](blacklistpath,JSON[_0x2092a1(0x185)]([]));const whitelistdata=require(_0x2092a1(0x197)),blacklistipdata=require(_0x2092a1(0x180)),{errorHandler:errorHandler}=require(_0x2092a1(0x18d));function _0x53de(){const _0x43ed66=['agMsr','11888541bBEqJk','slice','30328iKECJl','ceil','Deleted\x20IP\x20address','nvIjx','LDCDj','1145EsGoAn','SRwyO','../data/json/BlackListIp.json','giwXH','LbDzA','body','tqBqf','stringify','yFYyg','Entered\x20IP\x20is\x20already\x20exist','IP\x20address\x20not\x20found','23069563OZTKiV','path','DxuQk','filter','../utils/errorHandler','DThjl','5441952QpTChN','join','bhqGK','query','Added\x20successfully','mtUSH','dqIDA','OoILG','../data/json/WhiteListIp.json','vBJpv','PnDbL','11214QmSQsD','exports','ZKuGn','4rGjOSS','existsSync','mqALQ','EMqPV','arQkZ','DmRYC','writeFileSync','rOGox','error','TYpmm','rRzOn','length','365286jGMePw','push','KBoCL','qLzaI','Fetch\x20all\x20BlackList','message','1247874iCfQhR','XGSxh','20gQRwad','6696GvHEtI','find','../helpers/Validators','Please\x20enter\x20any\x20IP\x20address','Please\x20enter\x20a\x20valid\x20IP\x20address','nVUBU'];_0x53de=function(){return _0x43ed66;};return _0x53de();}module[_0x2092a1(0x19b)]={'addIP':async function(_0x311760,_0x3441fb){const _0x1cb92b=_0x2092a1,_0x4471dc={'kTNnG':function(_0x453312,_0x4e39eb){return _0x453312(_0x4e39eb);},'LDCDj':_0x1cb92b(0x174),'DThjl':function(_0x2e2b20,_0x46a7d2,_0x425c99,_0xd32711){return _0x2e2b20(_0x46a7d2,_0x425c99,_0xd32711);},'yqLnY':_0x1cb92b(0x1b5),'DxuQk':function(_0x5b3448,_0x65b70e){return _0x5b3448>_0x65b70e;},'fbtsS':_0x1cb92b(0x187),'rRzOn':function(_0x580c91,_0x3ce738,_0x5d03df,_0x280121){return _0x580c91(_0x3ce738,_0x5d03df,_0x280121);},'vBJpv':_0x1cb92b(0x193),'SRwyO':function(_0xb4ab08,_0x495f1f,_0x376a06,_0x3ac3a8){return _0xb4ab08(_0x495f1f,_0x376a06,_0x3ac3a8);}};try{const {ip:_0x448a75}=_0x311760[_0x1cb92b(0x183)];if(!await _0x4471dc['kTNnG'](validateIPaddress,_0x448a75))return errorHandler(_0x3441fb,0x196,_0x4471dc[_0x1cb92b(0x17d)]);if(!_0x448a75)return _0x4471dc['DThjl'](errorHandler,_0x3441fb,0x196,_0x4471dc['yqLnY']);if(_0x4471dc[_0x1cb92b(0x18b)](whitelistdata[_0x1cb92b(0x1a8)],0x0)){if(whitelistdata[_0x1cb92b(0x1b3)](_0x4580f8=>_0x4580f8['ip']==_0x448a75))return _0x4471dc[_0x1cb92b(0x18e)](errorHandler,_0x3441fb,0x191,_0x4471dc['fbtsS']);whitelistdata[_0x1cb92b(0x1aa)]({'ip':_0x448a75}),fs[_0x1cb92b(0x1a3)](whitelispath,JSON[_0x1cb92b(0x185)](whitelistdata));}else whitelistdata[_0x1cb92b(0x1aa)]({'ip':_0x448a75}),fs['writeFileSync'](whitelispath,JSON['stringify'](whitelistdata));return _0x4471dc[_0x1cb92b(0x1a7)](sendResponse,_0x3441fb,0xc8,_0x4471dc[_0x1cb92b(0x198)]);}catch(_0x1088ba){return console['error'](_0x1088ba),_0x4471dc[_0x1cb92b(0x17f)](errorHandler,_0x3441fb,0x1f4,_0x1088ba[_0x1cb92b(0x1ae)]);}},'getAllIPs':async function(_0x4acfc9,_0x8f2406){const _0x482867=_0x2092a1,_0x49c974={'DmRYC':function(_0x3923b9,_0x5a13f2){return _0x3923b9(_0x5a13f2);},'arQkZ':function(_0x16ca88,_0x5ea1de){return _0x16ca88*_0x5ea1de;},'OoILG':function(_0x5a5fa7,_0x1df109){return _0x5a5fa7-_0x1df109;},'qLzaI':function(_0x12cbac,_0x452b41){return _0x12cbac+_0x452b41;},'EMqPV':function(_0x4894c5,_0x5db18e,_0x521f80,_0x449882,_0x2a8d44){return _0x4894c5(_0x5db18e,_0x521f80,_0x449882,_0x2a8d44);},'ajdyK':function(_0x449644,_0x5c87fe){return _0x449644/_0x5c87fe;},'VohSn':function(_0x5e0060,_0xb4f671,_0x3ba318,_0x1c1400){return _0x5e0060(_0xb4f671,_0x3ba318,_0x1c1400);}};try{let {page:_0x532da5,limit:_0x7253f2}=_0x4acfc9[_0x482867(0x192)];_0x532da5=_0x49c974[_0x482867(0x1a2)](parseInt,_0x532da5)||0x1,_0x7253f2=_0x49c974['DmRYC'](parseInt,_0x7253f2)||0xa;const _0x4e9f98=_0x49c974[_0x482867(0x1a1)](_0x49c974[_0x482867(0x196)](_0x532da5,0x1),_0x7253f2);let _0x37c897=whitelistdata['length'];const _0x5758b3=whitelistdata[_0x482867(0x178)](_0x4e9f98,_0x49c974[_0x482867(0x1ac)](_0x4e9f98,_0x7253f2));return _0x49c974[_0x482867(0x1a0)](sendResponse,_0x8f2406,0xc8,'Fetch\x20all\x20IP\x20addresses',{'data':_0x5758b3,'totalPages':Math['ceil'](_0x49c974['ajdyK'](_0x37c897,_0x7253f2))});}catch(_0x4a28ab){return console[_0x482867(0x1a5)](_0x4a28ab),_0x49c974['VohSn'](sendResponse,_0x8f2406,0x1f4,_0x4a28ab[_0x482867(0x1ae)]);}},'deleteIP':async function(_0x1f0292,_0x5c1039){const _0x284825=_0x2092a1,_0x616b04={'KBoCL':function(_0x3d6ff0,_0x5cdc99,_0x49eba9,_0x40a2ca){return _0x3d6ff0(_0x5cdc99,_0x49eba9,_0x40a2ca);},'ZKuGn':_0x284825(0x1b5),'TYpmm':function(_0x491a12,_0x167845){return _0x491a12>_0x167845;},'XGSxh':function(_0x13a846,_0x8b07db){return _0x13a846&&_0x8b07db;},'rOGox':function(_0x36aa58,_0x10e8b8,_0x541484,_0x248891){return _0x36aa58(_0x10e8b8,_0x541484,_0x248891);},'Oucuq':_0x284825(0x188)};try{const {ip:_0x14e407}=_0x1f0292[_0x284825(0x192)];if(!_0x1f0292[_0x284825(0x192)]['ip'])return _0x616b04[_0x284825(0x1ab)](errorHandler,_0x5c1039,0x196,_0x616b04[_0x284825(0x19c)]);let _0x20690d=_0x616b04[_0x284825(0x1a6)](whitelistdata[_0x284825(0x1a8)],0x0)&&whitelistdata[_0x284825(0x1b3)](_0x4a28c4=>_0x4a28c4['ip']==_0x14e407);const _0x4f966a=whitelistdata[_0x284825(0x18c)](_0x2a4817=>_0x2a4817['ip']!==_0x14e407);return fs[_0x284825(0x1a3)](whitelispath,JSON[_0x284825(0x185)](_0x4f966a)),_0x616b04[_0x284825(0x1b0)](_0x20690d,_0x4f966a)?_0x616b04[_0x284825(0x1a4)](sendResponse,_0x5c1039,0xc8,_0x284825(0x17b)):errorHandler(_0x5c1039,0x194,_0x616b04['Oucuq']);}catch(_0x5a7df3){return console[_0x284825(0x1a5)](_0x5a7df3),errorHandler(_0x5c1039,0x1f4,_0x5a7df3[_0x284825(0x1ae)]);}},'AddBlackListIp':async(_0x277731,_0x3d492f)=>{const _0x5bf77f=_0x2092a1,_0x7a8c56={'giwXH':function(_0x362a33,_0x4ea997){return _0x362a33(_0x4ea997);},'LbDzA':function(_0x2e9f20,_0xb47c2e,_0x2fcb4e,_0x4794a3){return _0x2e9f20(_0xb47c2e,_0x2fcb4e,_0x4794a3);},'mqALQ':_0x5bf77f(0x174),'vlkwC':_0x5bf77f(0x1b5),'ObgZk':function(_0x182f6e,_0x29b762){return _0x182f6e>_0x29b762;},'PnDbL':'Added\x20successfully','mtUSH':function(_0x317d54,_0x2fd4c8){return _0x317d54==_0x2fd4c8;}};try{const {ip:_0x445cb7}=_0x277731[_0x5bf77f(0x183)];if(!await _0x7a8c56[_0x5bf77f(0x181)](validateIPaddress,_0x445cb7))return _0x7a8c56['LbDzA'](errorHandler,_0x3d492f,0x196,_0x7a8c56[_0x5bf77f(0x19f)]);if(!_0x445cb7)return errorHandler(_0x3d492f,0x196,_0x7a8c56['vlkwC']);if(_0x7a8c56['ObgZk'](blacklistipdata['length'],0x0))return blacklistipdata[_0x5bf77f(0x1b3)](_0x56db29=>_0x56db29['ip']==_0x445cb7)?_0x7a8c56[_0x5bf77f(0x182)](errorHandler,_0x3d492f,0x191,_0x5bf77f(0x187)):(blacklistipdata['push']({'ip':_0x445cb7}),fs[_0x5bf77f(0x1a3)](blacklistpath,JSON[_0x5bf77f(0x185)](blacklistipdata)),_0x7a8c56['LbDzA'](sendResponse,_0x3d492f,0xc8,_0x7a8c56[_0x5bf77f(0x199)]));if(_0x7a8c56[_0x5bf77f(0x194)](0x0,blacklistipdata[_0x5bf77f(0x1a8)]))return blacklistipdata[_0x5bf77f(0x1aa)]({'ip':_0x445cb7}),fs['writeFileSync'](blacklistpath,JSON[_0x5bf77f(0x185)](blacklistipdata)),sendResponse(_0x3d492f,0xc8,_0x7a8c56[_0x5bf77f(0x199)]);}catch(_0x4ad912){return console['error'](_0x4ad912),_0x7a8c56[_0x5bf77f(0x182)](errorHandler,_0x3d492f,0x1f4,_0x4ad912['message']);}},'BlackList':async(_0x31f707,_0x996b73)=>{const _0x217f73=_0x2092a1,_0x113668={'nVUBU':function(_0x3d3a83,_0x27b142){return _0x3d3a83(_0x27b142);},'edYyb':function(_0x549d1c,_0x1f5d4c){return _0x549d1c-_0x1f5d4c;},'tqBqf':function(_0x1aab58,_0x9c71c9){return _0x1aab58+_0x9c71c9;},'EdlwS':function(_0x4e33d3,_0x20d715){return _0x4e33d3/_0x20d715;},'agMsr':function(_0x4ba99d,_0x1d56b0,_0x4a7757,_0x4b89d4,_0x495bef){return _0x4ba99d(_0x1d56b0,_0x4a7757,_0x4b89d4,_0x495bef);},'nvIjx':function(_0x13858c,_0x43b0b6,_0x1c2781,_0x29a62e){return _0x13858c(_0x43b0b6,_0x1c2781,_0x29a62e);}};try{let {page:_0xbb6033,limit:_0x20c34f}=_0x31f707['query'];_0xbb6033=_0x113668['nVUBU'](parseInt,_0xbb6033)||0x1,_0x20c34f=_0x113668[_0x217f73(0x175)](parseInt,_0x20c34f)||0xa;let _0x1f431d=blacklistipdata['length'];const _0x2c9900=_0x113668['edYyb'](_0xbb6033,0x1)*_0x20c34f,_0x5a1c04=blacklistipdata[_0x217f73(0x178)](_0x2c9900,_0x113668[_0x217f73(0x184)](_0x2c9900,_0x20c34f)),_0x191a40=Math[_0x217f73(0x17a)](_0x113668['EdlwS'](_0x1f431d,_0x20c34f));return _0x113668[_0x217f73(0x176)](sendResponse,_0x996b73,0xc8,_0x217f73(0x1ad),{'data':_0x5a1c04,'totalPages':_0x191a40});}catch(_0x11e3b1){return console[_0x217f73(0x1a5)](_0x11e3b1),_0x113668[_0x217f73(0x17c)](errorHandler,_0x996b73,0x1f4,_0x11e3b1['message']);}},'DeleteBlackListip':async(_0xf1f006,_0x4fbba0)=>{const _0xe444be=_0x2092a1,_0x1f035a={'dqIDA':function(_0x493918,_0x2a7b03){return _0x493918>_0x2a7b03;},'yFYyg':function(_0x326a8a,_0x1f732d,_0x478ed2,_0x26df77){return _0x326a8a(_0x1f732d,_0x478ed2,_0x26df77);},'bhqGK':_0xe444be(0x188),'LreEz':function(_0x50a203,_0x22c350,_0x3957b3,_0x597f72,_0x12c139){return _0x50a203(_0x22c350,_0x3957b3,_0x597f72,_0x12c139);},'oouym':'Deleted\x20Ip\x20Address'};try{const {ip:_0x5c5eef}=_0xf1f006[_0xe444be(0x192)];if(!(_0x1f035a[_0xe444be(0x195)](blacklistipdata[_0xe444be(0x1a8)],0x0)&&blacklistipdata[_0xe444be(0x1b3)](_0xfb7186=>_0xfb7186['ip']==_0x5c5eef)))return _0x1f035a['yFYyg'](errorHandler,_0x4fbba0,0x194,_0x1f035a[_0xe444be(0x191)]);const _0x19b4ea=blacklistipdata['filter'](_0x335959=>_0x335959['ip']!==_0x5c5eef);return fs['writeFileSync'](blacklistpath,JSON[_0xe444be(0x185)](_0x19b4ea)),_0x1f035a['LreEz'](sendResponse,_0x4fbba0,0xc8,_0x1f035a['oouym'],{'ip':_0x5c5eef});}catch(_0x4b0596){return console[_0xe444be(0x1a5)](_0x4b0596),_0x1f035a[_0xe444be(0x186)](errorHandler,_0x4fbba0,0x1f4,_0x4b0596[_0xe444be(0x1ae)]);}}};