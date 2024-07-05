const { makeRequest } = require('./helpers')
const { setHeaders, setStatus, getAll } = require('./report')
const { headerValidation } = require('./headerValidation')

const checkMyHeaders = async (url) => {

  const { headers, status } = await makeRequest(url)
  setHeaders(headers)
  setStatus(status)
  headerValidation(headers)
  return getAll()
}

module.exports = checkMyHeaders
