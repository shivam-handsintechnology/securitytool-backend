const passwordhashlist = require("./src/data/json/passwordhashlist");

let handsintechnology=(password) => {
    for (let i of passwordhashlist) {
        console.log("ecncrypted password is: ", i.regex)
      
        if (i.regex && i.regex.test(password)) {
          console.log("ecncrypted password is: ", i.regex)
          break
        }else{
            console.log("password is not encrypted")
        }
    }
}
handsintechnology("25d55ad283aa400af464c76d713c07ad")