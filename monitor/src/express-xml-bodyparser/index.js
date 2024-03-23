const { XMLTags, XMLAttributes, XMLComments, XMLCdata, XMLDoctype, XMLEntity, XMLNamespace, XMLSchema, XMLExternalEntity, XMLParameterEntity, XMLXPath, XMLXQuery, XMLXSLT, XMLXInclude, XMLXLink, XMLXPointer } = require("../helpers/RegularExpressions");
const { CreateuserDetails } = require("../helpers/functions");

// Define a function to extract XML content from the request
function extractXMLContentFromReq(req) {
    return new Promise((resolve, reject) => {
        let xmlData = '';

        req.on('data', chunk => {
            xmlData += chunk.toString(); // Concatenate the received data
        });

        req.on('end', () => {
            resolve(xmlData.trim()); // Resolve the promise with the trimmed XML data
        });

        req.on('error', error => {
            reject(error); // Reject the promise if an error occurs
        });
    });
}



// Define a function to check for XML injection
async function detectXMLInjection(req, res, next) {
    const contentType = req.headers['content-type'];

    // Check if the request content type is XML
    if (contentType && contentType.includes('application/xml')) {
        try {

            const xmlContent = await extractXMLContentFromReq(req);


            if (XMLCdata.test(xmlContent)) {
                return res.status(400).json({ error: 'XML Injection detected in Cdata' });
            }
            // else if (XMLAttributes.test(xmlContent)) {
            //     return res.status(400).json({ error: 'XML Injection detected in Attributes' });
            // }

            else if (XMLDoctype.test(xmlContent)) {
                return res.status(400).json({ error: 'XML Injection detected in Doctype' });
            }
            //else if (XMLTags.test(xmlContent)) {
            //     return res.status(400).json({ error: 'XML Injection detected in Tags' });
            // }

            // else if (XMLComments.test(xmlContent)) {
            //     return res.status(400).json({ error: 'XML Injection detected in Comments' });
            // }

            else if (XMLEntity.test(xmlContent)) {
                CreateuserDetails(req, res, "XML Injection detected in Entity", "XML-Injection");
                return res.status(400).json({ error: 'XML Injection detected in Entity' });
            }

            else if (XMLNamespace.test(xmlContent)) {
                CreateuserDetails(req, res, "XML Injection detected in Namespace", "XML-Injection");
                return res.status(400).json({ error: 'XML Injection detected in Namespace' });
            }

            else if (XMLSchema.test(xmlContent)) {
                CreateuserDetails(req, res, "XML Injection detected in Schema", "XML-Injection");
                return res.status(400).json({ error: 'XML Injection detected in Schema' });
            }

            else if (XMLExternalEntity.test(xmlContent)) {
                CreateuserDetails(req, res, "XML Injection detected in ExternalEntity", "XML-Injection");
                return res.status(400).json({ error: 'XML Injection detected in ExternalEntity' });
            }

            else if (XMLParameterEntity.test(xmlContent)) {
                CreateuserDetails(req, res, "XML Injection detected in ParameterEntity", "XML-Injection");
                return res.status(400).json({ error: 'XML Injection detected in ParameterEntity' });
            }

            // else if (XMLXPath.test(xmlContent)) {
            //     return res.status(400).json({ error: 'XML Injection detected in XPath' });
            // }

            else if (XMLXQuery.test(xmlContent)) {
                CreateuserDetails(req, res, "XML Injection detected in XQuery", "XML-Injection");
                return res.status(400).json({ error: 'XML Injection detected in XQuery' });
            }

            else if (XMLXSLT.test(xmlContent)) {
                return res.status(400).json({ error: 'XML Injection detected in XSLT' });
            }

            else if (XMLXInclude.test(xmlContent)) {
                CreateuserDetails(req, res, "XML Injection detected in XInclude", "XML-Injection");
                return res.status(400).json({ error: 'XML Injection detected in XInclude' });
            }

            else if (XMLXLink.test(xmlContent)) {
                CreateuserDetails(req, res, "XML Injection detected in XLink", "XML-Injection");
                return res.status(400).json({ error: 'XML Injection detected in XLink' });
            }

            else if (XMLXPointer.test(xmlContent)) {
                CreateuserDetails(req, res, "XML Injection detected in XPointer", "XML-Injection");
                return res.status(400).json({ error: 'XML Injection detected in XPointer' });
            }

        } catch (error) {
            // Error occurred during XML to JSON conversion
            console.error('Error converting XML to JSON:', error);
            return res.status(400).json({ error: 'Error converting XML data to JSON' });
        }
    }
    // If not XML or no issues found, proceed to the next middleware
    next();
}

module.exports = detectXMLInjection;
