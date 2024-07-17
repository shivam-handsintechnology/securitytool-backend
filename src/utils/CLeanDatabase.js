const { AllowedDomainsModel, AllowedWebDomainsModel } = require("../models/AllowedDomainsModel")
const Audit = require("../models/Audit.model")
const { PasswordValidateModel } = require("../models/PasswordVaildateModel")
const { Project_Security_Logs } = require("../models/Project_Security_Logs")
const { ServerDataInPlaintextModel } = require("../models/Security/SecurityMisconfiguration.model")
const { CrticalInformationInurl } = require("../models/sensitivekeywordsModel")

module.exports = async function () {

    await Audit.deleteMany({})
    console.log("Audit Data Deleted")
    await AllowedDomainsModel.deleteMany({})
    console.log("Allowed Domains Data Deleted")
    await AllowedWebDomainsModel.deleteMany({})
    await PasswordValidateModel.deleteMany({})
    console.log("Password Validate Data Deleted")
    await ServerDataInPlaintextModel.deleteMany({})
    console.log("Server Data In Plaintext Model Deleted")
    await Project_Security_Logs.deleteMany({})
    console.log("Project Security Logs Deleted")
    await CrticalInformationInurl.deleteMany({})



}