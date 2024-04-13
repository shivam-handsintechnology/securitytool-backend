 const data=[
  {
    "Category": "Broken Authentication and Session Management",
    "UseCases": [
      {
        "label": "Session does not expire on closing the browser"
      },
    
      {
        "label": "Session time-out is high (or) not implemented."
      },
      {
        "label": "Session token being passed in other areas apart from cookie"
      },
      {
        "label": "An adversary can hijack user sessions by session fixation"
      },
      {
        "label": "Application is vulnerable to session hijacking attack"
      },
     
    ]
  },
  {
    "Category": "Injection",
    "UseCases": [
      {
        "label": "Application is vulnerable to Command injection attack"
      },
      {
        "label": "Application is vulnerable to HTML injection attack"
      },
      {
        "label": "Application is vulnerable to iframe injection attack"
      },
      {
        "label": "Application is vulnerable to SQL Injection"
      },
      {
        "label": "Application is vulnerable to XML injection"
      },
    ]
  },
  {
    "Category": "SSL",
    "UseCases": [
      {
        "label": "The application uses invalid SSL certificates that an adversary might exploit"
      },
      {
        "label": "The application uses self signed SSL certificate"
      },
      {
        "label": "Application uses expired SSL Certificate"
      },
      {
        "label": "Application uses SSL Cookie without secure flag set"
      },
      {
        "label": "Obsolete SSL/TLS protocol detection."
      }
    ]
  },
  // {
  //   "Category": "Business logic flaw",
  //   "UseCases": [
  //     {
  //       "label": "An adversary can access application as a high privileged user by using parameter manipulation"
  //     },
  //     {
  //       "label": "An adversary can carry out sensitive actions on behalf of another user"
  //     },
  //     {
  //       "label": "Maker- Checker functionality is not properly implemented"
  //     },
  //     {
  //       "label": "Transaction parameters could be changed using parameter manipulation and may lead to fraud"
  //     },
  //     {
  //       "label": "An adversary can perform sensitive action using parameter manipulation"
  //     },
  //     {
  //       "label": "On Parameter manipulation adversary exceeds transaction limit."
  //     },
  //     {
  //       "label": "Is process timing flaw present?"
  //     },
  //     {
  //       "label": "Test for limits put on the functions usage"
  //     },
  //     {
  //       "label": "Can session puzzling be used to bypass authentication or authorization?"
  //     }
  //   ]
  // },
  {
    "Category": "Error Message",
    "UseCases": [
      {
        "label": "Server returns HTTP 403 error message"
      },
      {
        "label": "Server returns HTTP error message"
      },
      {
        "label": "Helpful error message displayed at login page"
      }
    ]
  },
  {
    "Category": "Insecure Direct Object References",
    "UseCases": [
      {
        "label": "Directory listing is enabled on the server"
      },
      // {
      //   "label": "Directory traversal attack"
      // },
      {
        "label": "HTTP parameter pollution"
      },
      // {
      //   "label": "Non-HTML contents directly accessible without logging-in"
      // },
      // {
      //   "label": "Internal pages accessible without login"
      // },
      {
        "label": "The remote server contains a 'robots.txt' file"
      }
    ]
  },
  // {
  //   "Category": "Missing Function Level Access Control",
  //   "UseCases": [
  //     {
  //       "label": "An adversary can change the password of other users"
  //     },
  //     {
  //       "label": "Improper access control implementation"
  //     },
  //     {
  //       "label": "Management interface is not restricted for specific IPs"
  //     }
  //   ]
  // },
  {
    "Category": "Security Misconfiguration",
    "UseCases": [
      {
        "label": "Application accepts arbitrary methods"
      },
      {
        "label": "Application database stores password in plain text"
      },
      // {
      //   "label": "Application displays runtime error message"
      // },
      // {
      //   "label": "File upload functionality flaw"
      // },
      // {
      //   "label": "Application is allowing blank / invalid passwords"
      // },
      // {
      //   "label": "Application supports default usernames and passwords for logging in the application."
      // },
      {
        "label": "Application supports older server version"
      },
      {
        "label": "Dangerous HTTP methods are enabled on the server"
      },
      {
        "label": "OPTIONS method enabled"
      },
      {
        "label": "Password is encrypted/encoded using weak algorithm"
      },
      // {
      //   "label": "Application is vulnerable to Local or remote file inclusion"
      // }
    ]
  },
  {
    "Category": "Sensitive Data Exposure",
    "UseCases": [
      // {
      //   "label": "An adversary can fingerprint the mail server version"
      // },
      // {
      //   "label": "An adversary can fingerprint the web server from the HTTP responses"
      // },
      {
        "label": "An adversary can harvest email ids for spamming"
      },
      // {
      //   "label": "Application displays database server error message"
      // },
      {
        "label": "Application's server side source code disclosure"
      },
      // {
      //   "label": "ASP.NET version is revealed in X-AspNet-Version server response header"
      // },
      {
        "label": "Critical information in URL"
      },
      {
        "label": "Default web-page present in the server"
      },
      // {
      //   "label": "Physical server path disclosure"
      // },
      // {
      //   "label": "Private IP address disclosed"
      // },
      // {
      //   "label": "Sensitive application configuration architecture files available at users machine in clear text"
      // },
      {
        "label": "Sensitive data is accessible from cache"
      },
      {
        "label": "Sensitive information revealed in HTTP response"
      },
      // {
      //   "label": "Credentials are transmitted to server in plain text"
      // },
      // {
      //   "label": "Sensitive data is transmitted to server in plain text"
      // },
      {
        "label": "Cleartext Password returned in login response"
      }
    ]
  },
  {
    "Category": "Unvalidated Redirects and Forwards",
    "UseCases": [
      {
        "label": "The application is vulnerable to a URL redirection flaw"
      }
    ]
  },
  {
    "Category": "Cross-Site Scripting (XSS)",
    "UseCases": [
      {
        "label": "Application is vulnerable to cross frame scripting"
      },
      {
        "label": "Application is vulnerable to Cross Site Scripting attack"
      },
      {
        "label": "Application is vulnerable to stored Cross Site Scripting attack"
      },
      {
        "label": "Is XSS possible via CSS injection?"
      }
    ]
  },
  {
    "Category": "Miscellaneous Attacks",
    "UseCases": [
      {
        "label": "Application accepts special characters as user inputs"
      },
      {
        "label": "Auto-complete is enabled for sensitive fields"
      },
      {
        "label": "captcha can be bypassed"
      },
      {
        "label": "Captcha is not implemented for publicly available forms"
      },
      {
        "label": "click jacking"
      },
      {
        "label": "Default/Test files found on the web server"
      },
      {
        "label": "Developer comments revealed in page source"
      },
      {
        "label": "Email Flooding"
      },
      {
        "label": "Insecure administrator login name"
      },
      {
        "label": "Server Side input validations are not in place"
      },
      {
        "label": "Temporary account lockout feature is not implemented"
      },
      {
        "label": "Weak auditing and logging mechanisms"
      },
      {
        "label": "DOS using sql wildcards"
      },
      {
        "label": "OTPs and credentials communicated in clear text on emails"
      },
      {
        "label": "Can Registrations override another user's record or username or email address?"
      },
      {
        "label": "Can Profile updations override another user's record or username or email address, thereby taking over another user's identity?"
      },
      {
        "label": "Submit a valid username and invalid password and see if the application has already created a valid session even though login process generated an error response"
      },
      {
        "label": "Vulnerabilities in known components"
      }
    ]
  },
  {
    "Category": "Sensitive Data stored in local storage",
    "UseCases": [
      {
        "label": "Is sensitive data or session token stored in local data storage of browser?"
      }
    ]
  },
  {
    "Category": "Weak Cross domain policy",
    "UseCases": [
      {
        "label": "Is \"allow-access-from domain\" in cross-domain.xml policy file set to * or unauthorized domains?"
      },
      {
        "label": "Is \"Origin\" header in client request validated at the server?"
      },
      {
        "label": "Is \"Access-Control-Allow-Origin\" header in server response is set securely?"
      }
    ]
  },
  {
    "Category": "XML External Entity Attack",
    "UseCases": [
      {
        "label": "XML External Entity Attacks (XXE)"
      }
    ]
  }
]
export default data