module.exports=[{
    "name": "SHA-256",
    "regex": /^\\[a-f0-9\\]{64}$/i,
    "example": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
   
  },
  {
    
    "name": "SHA-384",
    "regex": /^[a-f0-9]{96}$/i,
    "example": "768d6c9b2fd0f75e9ea5e481fb1c4c650c8387c04a4ecd697b04b91845f77e24ecb4f1e1c45ef5464a6f80fcdc04a5d9",
   
  },
  {
   
    "name": "SHA-1",
    "regex": /^\\[a-f0-9\\]{40}$/i,
    "example": "d033e22ae348aeb5660fc2140aec35850c4da997",
   
  },
  {
  
    "name": "SHA-512 Crypt",
    "regex": /^\\$6\\$.{57}$/i,
    "example": "$6$rounds=656000$lwnigw.yb1EdhuVWZg7Z$F4IGbKqHBN8gQG.qceSfR0wk4qdEnVWKTJVTRYH3.U6nTphvgA6/HmXa9l8ckuuhXHQvCUseUFxbdm1fv26ai0",
   
  },
  {
  
    "name": "MySQL",
    "regex": /^\\[a-f0-9\\]{16}$/i,
    "example": "*D861DD59D5812C36B8CAD97B6F7F73B66A9DDCB3",
   
  },
  {
 
    "name": "SHA-512",
    "regex": /^\\[a-f0-9\\]{128}$/i,
    "example": "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86",
  },
  {
    "name": "MD5",
    "regex": /^\\[a-f0-9\\]{32}$/i,
    "example": "e10adc3949ba59abbe56e057f20f883e",
   
  },
  {
   
    "name": "bcrypt",
    "regex": /^\\\\$2[ayb]\\\\$.{56}$/,
    "example": "$2a$10$C7ZfZWRjB9HqH3qNPASZyuPrdVYdFNvJcnLdnjC9mkEnxvxcpKudW",
   
  },
  {
  
    "name": "CRC32",
    "regex": /^[0-9a-fA-F]{8}$/,
    "example": "63cfeb0d",
   
  },
  {
  
    "name": "GOST (ГОСТ)",
    "regex": /^[0-9a-fA-F]{64}$/,
    "example": "20704d3b2e681e9429e492160068fb65f613715b1632ee6ca6b100839b147f9f",
   
  },
  {
   
    "name": "Whirlpool",
    "regex": /^\\[a-f0-9\\]{24}$/i,
    "example": "f51c3e20d65ca78a09a02ee07d8516831db731a60bbff0685f10f77e258ec12dd7d3dfe2c348f563eaf07aae45a4c12762d7892c1cef3c1dc9ecfc7717c786e1",
   
  },
  {
  
    "name": "Tiger192",
    "regex": /^[a-f0-9]{48}$/i,
    "example": "c60defad5f1276c850bb59bc9e27ad982f603bef56cbd1e8",
   
  },
  {
   
    "name": "Whirlpool, Tiger192, RipeMD160",
    "regex": /^[a-f0-9]{64}$/i,
    "example": "example not available",
   
  },
  {
  
    "name": "Tiger128",
    "regex": /^[a-f0-9]{96}$/i,
    "example": "example not availble"
  },
  {
    "_id": {
      "$oid": "660e877058e884636feedf76"
    },
    "name": "Tiger160, Tiger192, RipeMD256",
    "regex": /^[a-f0-9]{128}$/i,
    "example": "example not availble"
  },
  {
 
    "name": "Whirlpool, RipeMD512",
    "regex": /^[a-f0-9]{284}$/i,
    "example": "example not availble"
  },
  {
    "name": "Tiger192, RipeMD320",
    "regex": /^[a-f0-9]{192}$/i,
    "example": "example not availble"
  },
  {
   
    "name": "Tiger256",
    "regex": /^[a-f0-9]{256}$/i,
    "example": "example not availble"
  },
  {
  
    "name": "Argon2",
    "regex": /^\\$argon2[id]\\$v=d{1,4}\\$.{64}$/i,
    "example": "example not availble"
  },
  {
   
    "name": "RipeMD-160",
    "regex": /^[a-f0-9]{40}$/i,
    "example": "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc"
  },
  {
   
    "name": "Unix Crypt",
    "regex": /^$d$[./0-9A-Za-z]{13}$/,
    "example": "$1$h6UoFHD2$OGHxu89Xr3CkNSNXrZEkN1"
  },
  {
   
    "name": "AES",
    "regex": /^U2FsdGVkX1.*=$/,
    "example": "U2FsdGVkX1+oq3Kv2QBcZG1vcYnj/wUZK8Hpk5Lu0/0="
  },
    {
    "name": "SHA-224",
    "regex": /^[a-f0-9]{56}$/i,
    "example": "example not availble"
    },
    {
  }
]