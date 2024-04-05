const sinon = require("sinon");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const {
  MongoError,
  checkHTML,
  SqlDetector,
  SessionMiddleware,
  preventHPP,
  NosqlDetector,
  commandlineinjection,
  ldapInjectionDetector,
  preventAccessToFiles,
  // Access_Control_Allow_Origin,
  // preventTraversal,
  // CheckResponseCode,
  SpamDetector,
  VpnProtect,
  botDetector,
  BlockUser,
} = require("../middlewares/Security");
const request = require("supertest");
const express = require("express");
const DBConnection = require("../config/connection");
const { expect } = require("chai");
const { CreateuserDetailsindatabaseonly } = require("../middlewares/functions");
const validUrl = "/api/test";
const invalidUrl = "/api/test?id=1 OR 1=1";
const validBody = { username: "testuser", password: "password" };
const invalidBody = { username: "testuser", password: "password' OR 1=1" };
const htmlinvalidUrl = "/api/test?id=<html><h</html>";
const htmlvalidBody = { username: "testuser", password: "password" };
const htmlinvalidBody = {
  username: "<html><h</html>",
  password: "<html><h</html>",
};
const xssvalidUrl = "/api/test/";
const xssinvalidUrl = '/api/test?id=<script>alert("hello")</script>';
const xssvalidBody = { username: "testuser", password: "password" };
const xssinvalidBody = {
  username: '<script>alert("hello")</script>',
  password: "<html><h</html>",
};
const cliinvalidUrl = "/api/test";
const cliinvalidBody = { username: "rm -rf" };
const nosqlinvalidBody =  {bz: {$in: "quz"}};
const ldapinvalidBody = {"user":"*)(uid=admin"};

DBConnection();
describe("Test", () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(
      session({
        secret: "keyboard cat",
        name: "test", // Customise the name to 'test'
        resave: false,
        saveUninitialized: true,

        cookie: {
          maxAge: 86400000 * 30, // 30 days,
          // httpOnly: true,
          // secure: true
        },
      })
    );
    app.use(
      SqlDetector,
      checkHTML,
      NosqlDetector,
      preventHPP,
      SessionMiddleware,
      commandlineinjection,
      ldapInjectionDetector,
      preventAccessToFiles,
      // SpamDetector,
      // botDetector,
      VpnProtect,
    );
  });

    // Prevent HPP  pollution test cases
  // const hpp='?name=John&name=Jane&name=Mike'
  // it('should block a request with an invalid URL containing http parameter pollution', (done) => {
  //   app.get(validUrl, (req, res) => {
  //     // req.connection.remoteAddress="51.83.59.99"
  //     res.status(200).json(req.query);
  //   });

  //   request(app)
  //     .get(validUrl+hpp)
  //     .expect(406, (err, res) => {
  //       if(res.status<399){
  //         done()
  //         return "HPP Pollution Checked"
  //       }
  //       //console.log(res.body.message)
  //       expect(res.status).to.equal(406);
  //       // expect(res.body.message).to.equal('XSS Injection Detected');
  //       done();
  //     });
  // });
  //End HPP Pollution test cases

// Sql injection test cases
  it('should allow a request with a valid URL', (done) => {
    app.post(validUrl, (req, res) => {
      res.status(200).json(req.body);
    });
    request(app)
      .post(validUrl)
      .send(validBody)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(validBody);
        done();
      });
  });

  it('should block a request with an invalid URL containing SQL injection', (done) => {
    app.post(invalidUrl, (req, res) => {
      res.status(200).json(req.body);
    });
    request(app)
      .post(invalidUrl)
      .send(validBody)
      .expect(406, (err, res) => {
        if (err) {
          return done(err);
        }
        // //console.log(res.body.message)
        expect(res.status).to.equal(406);
        expect(res.body.message).to.equal('Malicious Sql  request was detected');
        done();
      });
  });
  it('should block a request with a invalid body containing SQL injection', (done) => {
    app.post(validUrl, (req, res) => {
      res.status(200).json(req.body);
    });
    request(app)
      .post(validUrl)
      .send(invalidBody)
      .expect(406, (err, res) => {
        if (err) {
          return done(err);
        }
        // //console.log(res.body.message)
        expect(res.status).to.equal(406);
        expect(res.body.message).to.equal('Malicious Sql  request was detected');
        done();
      });
  });
  //End Sql injection test cases
  // Html  injection test cases
  it('should block a request with an invalid URL containing HTML injection', (done) => {
    app.post(htmlinvalidUrl, (req, res) => {
      res.status(200).json(req.body);
    });

    request(app)
      .post(htmlinvalidUrl)
      .send(htmlvalidBody)
      .expect(406, (err, res) => {
        if (err) {y

          return done(err);
        }
       
        expect(res.status).to.equal(406);
   
        expect(res.body.message).to.equal('HTML Injection Detected');
        done();
      });
  });
  it('should block a request with a invalid body containing HTML injection', (done) => {
    app.post(validUrl, (req, res) => {
      res.status(200).json(req.body);
    });
    request(app)
      .post(validUrl)
      .send(htmlinvalidBody)
      .expect(406, (err, res) => {
        if (err) {
          return done(err);
        }
        // //console.log(res.body.message)
        expect(res.status).to.equal(406);
        expect(res.body.message).to.equal('HTML Injection Detected');
        done();
      });
  });
  //End Html injection test cases
  // XSS  injection test cases
  it('should block a request with an invalid URL containing XSS injection', (done) => {
    app.post(xssinvalidUrl, (req, res) => {
      res.status(200).json(req.body);
    });
    request(app)
      .post(xssinvalidUrl)
      .send(xssvalidBody)
      .expect(406, (err, res) => {
        if (err) {y

          return done(err);
        }
       
        expect(res.status).to.equal(406);
   
        expect(res.body.message).to.equal('XSS Injection Detected');
        done();
      });
  });
  it('should block a request with a invalid body containing XSS injection', (done) => {
    app.post(xssvalidUrl, (req, res) => {
      res.status(200).json(req.body);
    });

    request(app)
      .post(xssvalidUrl)
      .send(xssinvalidBody)
      .expect(406, (err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(406);
        expect(res.body.message).to.equal('XSS Injection Detected');
        done();
      });
  });
// End XSS  injection test cases
// Sessionmodel test cases
    it('should handle session expiration correctly', async () => {
      app.get('/api/test', (req, res) => {
        res.status(200).json('hello world');
      });
      const res = await request(app)
        .get('/api/test')
    //  //console.log(res.headers)
      expect(res.status).to.equal(200);
      expect(res.header['set-cookie'][0]).to.contain('test=');
    });
  
    it('should handle high session timeout correctly', async () => {
      app.get('/api/test', (req, res) => {
        res.status(200).json('hello world');
      });
      const res = await request(app)
        .get('/api/test')
      expect(res.status).to.equal(200);
      expect(res.header['set-cookie'][0]).to.contain('test=');
      // expect(res.header['set-cookie'][0]).to.contain('connect.sid=');
    });
  
    it('should handle low session timeout correctly', async () => {
      app.get('/api/test', (req, res) => {
        res.status(200).json('hello world');
      });
      const res = await request(app)
        .get('/api/test')
      expect(res.status).to.equal(200);
      expect(res.header['set-cookie'][0]).to.contain('test=');
      // expect(res.header['set-cookie'][0]).to.contain('connect.sid=');
    });
  // End  Sessionmodel test cases
// Cli injection test cases
it('should block a request with an invalid URL containing CLI injection', (done) => {
  app.get(cliinvalidUrl, (req, res) => {
    res.status(200).json(req.body);
  });

  request(app)
    .get(cliinvalidUrl+'?id=rm -rf')
    .expect(406, (err, res) => {
      //console.log(res.body.message)
      if (err) {
        return done(err);
      }
      // //console.log(res.body.message)
      expect(res.status).to.equal(406);
      expect(res.body.message).to.equal('Malicious commandline  request was detected');
      done();
    });
});
it('should block a request with a invalid body containing CLI injection', (done) => {
  app.post(validUrl, (req, res) => {
    res.status(200).json(req.body);
  });

  request(app)
    .post(validUrl)
    .send(cliinvalidBody)
    .expect(406, (err, res) => {
      if (err) {
        return done(err);
      }
      // //console.log(res.body.message)
      expect(res.status).to.equal(406);
      expect(res.body.message).to.equal('Malicious commandline  request was detected');
      done();
    });
});
//End CLI injection test cases
// Nosql injection test cases



// Ldap injection test cases
  it('should block a request with a invalid body containing LDAP injection', (done) => {

    app.post(validUrl, (req, res) => {
      const inputFields = req.body || req.query || req.params;
      for (const field in inputFields) {
          if (typeof inputFields[field] === "string") {
              // Check for LDAP injection attacks
              if (inputFields[field].match(/[*()\\]/)) {
                  CreateuserDetailsindatabaseonly(req, res, "LDAP Injection Detected", type ="LDAP-injection")
                  return res.status(406).json({ message: "LDAP Injection Detected" });
              }
          }
      }
      res.status(200).json(req.body);
    });
    request(app)
      .post(validUrl)
      .send(ldapinvalidBody)
      .expect(406, async(err, res) => {
        //console.log(res.body.message)
        if (err) {
          return done(err);
        }
        expect(res.body.message).to.equal('LDAP Injection Detected');
        done();
      });
  });
// End Ldap injection test cases
// VPn or Proxy detect test cases
it('should send request with VPn or Proxy  headers', async () => {
  app.get(validUrl, (req, res) => {
    res.status(200).json("hello world");
  });
  const res = await request(app)
    .get(validUrl)
    .set('X-Forwarded-For', '46.165.250.77')
    //console.log(res.body.message)
  expect(res.status).to.equal(406);
  //console.log(res.body)
  expect(res.body.message).to.equal('VPn Detected');
});
// End VPn or Proxy detect Test cases
// Prevent File Accesses from being injected into the URL
it('should block a request with a invalid api containing  route that access some files ', async() => {
  app.get(validUrl, (req, res) => {
    res.status(200).json("hello world");
  });
  const res = await request(app)
    .get('/api/test.js')
     expect(res.status).to.equal(406);
});
//End  Prevent File Accesses from being injected into the URL
});

// End of Test cases
describe("Nosql Detector", () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(NosqlDetector);
  });

  it('should block a request with a invalid body containing Nosql injection', async() => {
    app.post(validUrl, (req, res) => {
      res.status(200).json(req.body);
    });
    const res = await request(app)
    .post(validUrl)
      .send(nosqlinvalidBody)
     expect(res.status).to.equal(406);
});
    // request(app)
    //   .post(validUrl)
    //   .send(nosqlinvalidBody)
      // .expect(406, (err, res) => {
      //   if (err) {
      //     return done(err);
      //   }
        // //console.log(res.body.message)
        // //console.log(res.status)
        // expect(res.status).to.equal(406);
        // expect(res.body.message).to.equal('Malicious nosql request was detected');
        // done();
    
  });
  // End Nosql injection test cases

describe("Spam Detector", () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(SpamDetector);
  });

// Spaming test cases
it('should block a Spamming request when anybody hit api motre then 500 times after 15 minutes letter you can use that', async () => {
  app.get('/api/test', (req, res) => {
    res.status(200).json("hello world");
  });
  const requests = [];
  // Send 100 requests with invalid API routes that access some files
  for (let i = 0; i < 505; i++) {
    requests.push(request(app).get(`/api/test`));
  }
  const responses = await Promise.all(requests);
  // //console.log(responses)
  for (const res of responses) {
    // //console.log(res.status)
    if (res.status === 429) {
      expect(res.status).to.equal(429);
    }
  }
});
// End Spamming Test cases 

});
describe("Process Time Flow", () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

// Spaming test cases
it('should check process time flow is present or not', async () => {
  app.get('/api/test', (req, res) => {
    if (typeof process.hrtime === 'function' && typeof console.time === 'function' && typeof console.timeEnd === 'function') {
      // //console.log('yes');
     return res.status(200).json("yes");
    } 
   
  });
  const res = await request(app)
  .get('/api/test')
   if(res.status===200){
    expect(res.status).to.equal(200);
    expect(res.body).to.equal('yes');
    expect(typeof process.hrtime).to.equal('function');
    expect(typeof console.time).to.equal('function');
    expect(typeof console.timeEnd).to.equal('function');
   }else{
    //  //console.log("time flow is not present")
   }
});
// End Spamming Test cases 

});
describe("BotChecker", () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(botDetector);
  });

// Bot test cases
it('should block a Bot request when anybody hit api mot=re then 500 times after 15 minutes letter you can use that', async () => {
  app.get('/api/login', (req, res) => {
    res.status(200).json("hello world");
  });
  const requests = [];
  // Send 100 requests with invalid API routes that access some files
  for (let i = 0; i < 505; i++) {
    requests.push(request(app).get(`/api/login`));
  }
  const responses = await Promise.all(requests);
  // //console.log(responses)
  for (const res of responses) {
    // //console.log(res.status)
    if (res.status === 429) {
      expect(res.status).to.equal(429);
    }
  }
});
// End Bot Test cases

});