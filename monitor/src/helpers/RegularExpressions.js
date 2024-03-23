// XML Injection Detection

// XML Tags Injection
const XMLTags = new RegExp(
    "<[^>]+>",
    "g"
);
// XML Attributes Injection
const XMLAttributes = new RegExp(
    "[a-zA-Z0-9]+=[^=]+",
    "g"
);
// XML Comments Injection
const XMLComments = new RegExp(
    "<!--.*-->",
    "g"
);
// XML CDATA Injection
const XMLCdata = new RegExp(
    "<!\\[CDATA\\[.*\\]\\]>",
    "g"
);
// XML Doctype Injection
const XMLDoctype = new RegExp(
    "<!DOCTYPE.*>",
    "g"
);
// XML Entity Injection
const XMLEntity = new RegExp(
    "&[a-zA-Z0-9]+;",
    "g"
);
// XML Namespace Injection
const XMLNamespace = new RegExp(
    "xmlns=[^=]+",
    "g"
);
// XML Schema Injection
const XMLSchema = new RegExp(
    "schemaLocation=[^=]+",
    "g"
);
// XML External Entity Injection
const XMLExternalEntity = new RegExp(
    "<!ENTITY.*>",
    "g"
);
// XML Parameter Entity Injection
const XMLParameterEntity = new RegExp(
    "%[a-zA-Z0-9]+;",
    "g"
);
// XML XPath Injection
const XMLXPath = new RegExp(
    "/.*",
    "g"
);
// XML XQuery Injection
const XMLXQuery = new RegExp(
    "xquery .*",
    "g"
);
// XML XSLT Injection
const XMLXSLT = new RegExp(
    "<xsl:.*",
    "g"
);
// XML XInclude Injection
const XMLXInclude = new RegExp(
    "<xi:.*",
    "g"
);
// XML XLink Injection
const XMLXLink = new RegExp(
    "<xlink:.*",
    "g"
);
// XML XPointer Injection
const XMLXPointer = new RegExp(
    "<xpointer .*",
    "g"
);
module.exports = {
    XMLTags,
    XMLAttributes,
    XMLComments,
    XMLCdata,
    XMLDoctype,
    XMLEntity,
    XMLNamespace,
    XMLSchema,
    XMLExternalEntity,
    XMLParameterEntity,
    XMLXPath,
    XMLXQuery,
    XMLXSLT,
    XMLXInclude,
    XMLXLink,
    XMLXPointer
};

