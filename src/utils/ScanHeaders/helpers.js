const { default: axios } = require('axios')

const isUrlValid = (url = '') => {
  if (typeof (url) !== 'string') return false
  const regex = /(?:^|[ \t])((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/g
  return regex.test(url)
}

const makeRequest = async(uri) => {
  try {
    const response = await axios.get(uri);
    
    const headers = response.headers;
    const status = response.status;
      headers['connection']=undefined
    headers['HTTP/2']=status
    return { headers, status };
  } catch (error) {
    if (error.response) {
      const headers = error.response.headers;
      const status = error.response.status;
      headers['connection']=undefined
      //console.log({error:status});
      headers['HTTP/2']=status 
      return { headers, status };
    } else {
      console.error(error);
      return null;
    }
  }
}

module.exports = {
  isUrlValid, makeRequest
}
