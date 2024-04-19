const invalidExtensions = [
    'jpeg',
    'jpg',
    'gif',
    'png',
    'php',
    'js',
    'sql',
    'html',
    'htm',
    'asp',
    'aspx',
    'cfm',
    'sh',
    'doc',
    'txt',
    'pdf',
    'swf',
    'xls',
    'xml'
  ];
  
  const extensionMinLength = 2;
  
  function uniqueDomains(domainArray) {
    const uniqueArray = [];
    for (let i = 0; i < domainArray.length; i++) {
      let foundDomain = false;
      for (let j = 0; j < uniqueArray.length; j++) {
        if (uniqueArray[j].toLowerCase() === domainArray[i].toLowerCase()) {
          foundDomain = true;
          break;
        }
      }
      if (!foundDomain) {
        uniqueArray.push(domainArray[i].toLowerCase());
      }
    }
    return uniqueArray;
  }
  
  function cleanDomains(domainArray) {
    const cleanArray = [];
    for (let i = 0; i < domainArray.length; i++) {
      let badExtension = false;
      const domainLower = domainArray[i].toLowerCase();
      if (invalidExtensions.indexOf(domainLower) !== -1) {
        badExtension = true;
        continue;
      }
      if (!badExtension) {
        cleanArray.push(domainLower);
      }
    }
    return cleanArray;
  }
  
  function importTextGetDomains(importData) {
    const regexDomainStart = '([a-zA-Z0-9][-a-zA-Z0-9]*[a-zA-Z0-9]|[a-zA-Z0-9])';
    const extensionMaxLength = 15;
    const regexDomainExtension = `(([a-zA-Z]{${extensionMinLength},${extensionMaxLength}}|[a-zA-Z]{${extensionMinLength},${extensionMaxLength}}.[a-zA-Z0-9]{${extensionMinLength},${extensionMaxLength}}))`;
    const regexDomainFinish = '(?![-0-9a-zA-Z])(?!\\.[a-zA-Z0-9])';
    const regexAllDomains = new RegExp(`${regexDomainStart}(\\.${regexDomainStart})*\\.${regexDomainExtension}${regexDomainFinish}`, 'gi');
  
    const importDataDomains = importData.match(regexAllDomains);
    if (importDataDomains) {
      const uniqueDomainsList = uniqueDomains(cleanDomains(importDataDomains)).sort();
      const subdomains = new Set();
      for (const domain of uniqueDomainsList) {
        const parts = domain.split('.');
        if (parts.length > 1 && parts[parts.length - 1].length > extensionMinLength) {
          for (let i = 1; i < parts.length; i++) {
            subdomains.add(parts.slice(i).join('.'));
          }
        }
      }
      return [...new Set([...uniqueDomainsList, ...subdomains])];
    } else {
      return null;
    }
  }
  
 async  function DomainExtractor(text) {
   return new Promise((resolve,reject)=>{
    const foundData = importTextGetDomains(text);
    if (foundData) {
      const uniqueDomains = foundData.filter((domain) => {
        const parts = domain.split('.');
        return parts.length>0 && parts.map((part) => part.length).reduce((a, b) => a + b) > 0;
     });
      resolve(uniqueDomains)
    } else {
        reject('No domains found');
    }
   })
  }
  