const axios = require('axios');
const cheerio = require('cheerio');
const {sensitivedata} = require('../sensitive/availableapikeys');
async function scanStaticUrl(url) {
   return new Promise((resolve, reject) => {
         axios.get(url).then((response) => {
              const html = response.data;
              const $ = cheerio.load(html);
              const frameworks = [];
              if ($('[data-reactroot]').length > 0 || $('[id="root"]').length > 0) {
                frameworks.push('React');
              }
              if ($('[data-v-]').length > 0) {
                frameworks.push('Vue');
              }
              if ($('[ng-app]').length > 0 || $('[ng-version]').length > 0) {
                frameworks.push('Angular');
              }
              if ($('meta[name="next-head-count"]').length > 0 || $('[data-next-root]').length > 0) {
                frameworks.push('Next.js');
              }
              if (frameworks.length === 0) {
                resolve('No frameworks detected.');
              }

              else {
                resolve(frameworks);
              }
         }).catch((err) => {
              reject(`Error accessing ${url}: ${err}`);
         });
    });
}
const npmAuditrail=async(auditarray)=>{
  return new Promise((resolve,reject)=>{
 try {
   let data=[]
   let auditReport = auditarray /* Your audit report JSON here */;

   let vulnerabilities = auditReport.vulnerabilities;
   
   // Iterate over each vulnerability
   for (let vulnerabilityKey in vulnerabilities) {
       let vulnerability = vulnerabilities[vulnerabilityKey];
   
       // Check if the vulnerability has a title
       if (vulnerability.via && Array.isArray(vulnerability.via)) {
           // Extract the vulnerability title
           let title = vulnerability.via[0].title ||null
   
           // Extract the dependency from which the vulnerability originates
           let dependency = vulnerability.name;
           data.push({title,dependency})
       }
   }
    let filterdata=data.filter((item)=>item.title!==null)
    resolve(filterdata)
 } catch (error) {
    reject(error)
 }
  })
}
module.exports = {scanStaticUrl,npmAuditrail};