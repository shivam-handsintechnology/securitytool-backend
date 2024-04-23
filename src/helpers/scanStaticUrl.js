
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
module.exports = {npmAuditrail};