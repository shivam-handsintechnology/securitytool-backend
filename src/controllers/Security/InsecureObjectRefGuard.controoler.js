const { sendResponse } = require("../../utils/dataHandler");
const axios = require("axios");
const { errorHandler } = require("../../utils/errorHandler");
const { hashttpParametersPollutionavailable } = require("../../utilities/functions/functions");
const { AllowedWebDomainsModel } = require("../../models/AllowedDomainsModel");
const { directoryListingPatterns } = require("../../data/json/ApplicationTestingData.json")

module.exports = {
  DirectoryListingEnable: async (req, res) => {
    let StatusCode = 500
    try {
      let domain = req.query.domain
      let url = `http://${domain}/DirectoryListingEnable`;
      let response = await axios.get(url, {
        headers: {
          'origin': "https://securitytool.handsintechnology.in",
        }
      }).catch((e) => e.response)
      if (response.status === 200) {

        return sendResponse(res, 200, "success", response.data)
      } else {
        StatusCode = 403
        throw new Error("Access Denied")
      }

    } catch (error) {
      return errorHandler(res, StatusCode, error.message)
    }
  },
  robotsTxtPath: async (req, res) => {
    try {
      console.log("Request", req.user)
      let WebDomain = await AllowedWebDomainsModel.find({ appid: req.user.appid });
      let isRobotsTxt = false
      if (WebDomain.length > 0) {

        for (let i = 0; i < WebDomain.length; i++) {
          console.log(WebDomain[i].domain)
          await axios.get(`http://${WebDomain[i].domain}/robots.txt`).then((response) => {
            console.log(response.status)
            if (response.status === 200) {
              isRobotsTxt = true
            }
          }
          ).catch((error) => {
            console.log(error)
            isRobotsTxt = false
          })
        }
      }
      data = isRobotsTxt ? "Yes" : "No"

      return sendResponse(res, 200, "success", data)
    } catch (error) {
      console.log(error)
      return errorHandler(res, 500, error.message)
    }
  },
  httpparameterpollution: async (req, res) => {
    let StatusCode = 500
    try {
      let domain = req.query.domain
      let url = `http://${domain}/sitescanner?id=1&id=2&id=3`;
      let response = await axios.get(url, {
        headers: {
          'origin': "https://securitytool.handsintechnology.in",
        }
      })
      if (response.status === 200) {
        let isHttp = await hashttpParametersPollutionavailable(response.data)
        return sendResponse(res, 200, "success", isHttp)
      } else {
        StatusCode = 403
        throw new Error("Access Denied")
      }
    }
    catch (error) {
      return errorHandler(res, StatusCode, error.message)
    }


  },
  post: async (req, res) => {
    try {
      let paterns = [
        /require\s*\(\s*['"](.+?)['"]\s*\)/g,
        /import\s*\(\s*['"](.+?)['"]\s*\)/g,

      ]
      let url = req.body.url;
      let response = await axios.get(url).then((res) => res).catch((e) => e.response);

      if (response.status === 200) {
        let data = response.data.match(/require\s*\(\s*['"](.+?)['"]\s*\)/g) || response.data.match(/import\s+.+?\s+from\s+['"](.+?)['"]/g)
        if (data) {
          return sendResponse(res, 200, "success", "Yes", "No")
        }
        return sendResponse(res, 400, "success", "No", "No")
      } else {
        return sendResponse(res, 400, "No", "No")
      }
    } catch (error) {
      return errorHandler(res, 500, error.message)
    }
  }, fetch: async (req, res) => {
    try {
      let { url } = req.body;
      let response = await axios.get(url).then((res) => res).catch((e) => e.response);
      if (response.status === 200) {
        const isDirectoryListing = directoryListingPatterns.some(pattern => pageContent.includes(pattern));
        if (isDirectoryListing) {
          return sendResponse(res, 200, "success", "Yes", "Yes")
        } else {
          return sendResponse(res, 200, "success", "No", "No")
        }
      } else {
        return sendResponse(res, 400, "No", "No")
      }
    } catch (error) {
      return errorHandler(res, 500, error.message)
    }
  }
}