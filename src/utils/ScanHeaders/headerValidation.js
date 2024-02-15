const { addError, addWarning, addInfo } = require('./report')
const { mandatory, optional, avoid, deprecated } = require('./rules.json')

// Check for mandatory, avoid and deprecated ones.
const errorFields = (headers) => {
  const currentHeaders = Object.keys(headers)
  avoid.filter(field => currentHeaders.includes(field)).forEach(field => addError({Remove_field:field}))
  mandatory.filter(field => !currentHeaders.includes(field)).forEach(field => addError({Missing_field:field}))
}
const availableFields = (headers) => {
  const currentHeaders = Object.keys(headers)
  mandatory.filter(field => currentHeaders.includes(field)).forEach(field => addError({availableFields:field}))
}

// Check for optional
const warningFields = (headers) => {
  const currentHeaders = Object.keys(headers)
  optional.filter(field => !currentHeaders.includes(field)).forEach(field => addWarning({optional:field}))
}

// Check for extra headers
const infoFields = (headers) => {
  const allHeaders = [].concat(optional, mandatory, avoid, deprecated)
  const currentHeaders = Object.keys(headers)
  currentHeaders.filter(field => !allHeaders.includes(field)).forEach(field => addInfo({Additional_information:field}))
}

const headerValidation = (headers = {}) => [availableFields,errorFields, warningFields].forEach(item => item(headers))

module.exports = { headerValidation, errorFields, warningFields, infoFields }
