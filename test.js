
const request = require("supertest");
require("dotenv").config();
const apiurl = process.env.NODE_ENV === "production" ? "https://securitytool.handsintechnology.in/api/" : "http://localhost:20000/api/";

describe("API Tests", () => {
  let token = '';
  let domain = ''
  expect.extend({
    toHaveTotalPagesLessThan(response, expected) {
      const totalPages = response.body.data.totalPages;
      const pass = totalPages < expected;
      if (pass) {
        return {
          pass: true,
          message: () => ''  // Return an empty string for successful cases
        };
      } else {
        return {
          pass: false,
          message: () => `Expected totalPages to be greater than ${expected}, but received ${totalPages}`
        };
      }
    },
  });
  // Test the login endpoint
  it("Login", async () => {
    const loginResponse = await request(apiurl).post("/auth/login")
      .set('Origin', 'https://securitytool-front.handsintechnology.in')
      .set('Content-Type', 'application/json')
      .send({
        email: process.env.TESTEMAIL,
        password: process.env.TESTPASSWORD
      });

    expect(loginResponse.body.statusCode).toBe(200);
    expect(typeof loginResponse.body).toBe("object");
    expect(loginResponse.body).toHaveProperty("message");
    expect(loginResponse.body.message).toBe("login successfully");
    expect(loginResponse.body).toHaveProperty("data");
    expect(typeof loginResponse.body.data).toBe("object");
    expect(loginResponse.body.data).toHaveProperty("token");
    if (loginResponse.body.data && loginResponse.body.data.token) {
      token = loginResponse.body.data.token;
    }
  });

  // Get All Domains
  it("Get All Domains", async () => {
    if (token) {
      const response = await request(apiurl)
        .get("security/domain?limit=1&page=1")
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', 'https://securitytool-front.handsintechnology.in')

      expect(response.body.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(typeof response.body.data).toBe("object");
      expect(response.body.data).toHaveProperty("data");
      expect(Array.isArray(response.body.data.data)).toBe(true);
      if (response.body.data.data.length > 0) {
        domain = response.body.data.data[0].domain;
      }
    } else {
      expect(token).toBe("Token is missing");
    }


  });
  // Broken Authentication and Session Management
  it("Broken Authentication and Session Management", async () => {
    if (token && domain) {
      const response = await request(apiurl)
        .get(`AuthSessionGuardian/session-vulnurability?domain=${domain}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', 'https://securitytool-front.handsintechnology.in')

      expect(response.body.statusCode).toBe(200);

      // Expected property names
      const expectedPropertyNames = [
        "Session Does Not Expire On Closing The Browser",
        "Session Time-Out Is High (Or) Not Implemented",
        "Session Token Being Passed In Other Areas Apart From Cookies",
        "An Adversary Can Hijack User Sessions By Session Fixation",
        "Application Is Vulnerable To Session Hijacking Attack"
      ];
      expect(response.body).toHaveProperty("data");
      // Extract property names from the response data
      const responsePropertyNames = response.body.data.map(item => Object.keys(item)[0]);
      // Check if the response property names match the expected property names
      expect(responsePropertyNames).toEqual(expect.arrayContaining(expectedPropertyNames));

    } else {
      expect(token).toBe("Token is missing");
      expect(domain).toBe("Domain is missing");
    }

  });
  // Command injection attack
  it("Command injection attack", async () => {
    if (token && domain) {
      const response = await request(apiurl)
        .get(`injections?limit=5&type=commandline&page=1`)
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', 'https://securitytool-front.handsintechnology.in')

      expect(response.body.statusCode).toBe(200);

      expect(response.body).toHaveProperty("data");
      // Extract property names from the response data
      expect(response.body.data).toHaveProperty("totalPages");
      expect(response.body.data.totalPages).toEqual(expect.any(Number))
      // check toatal pages length uis greater then zero

    } else {
      expect(token).toBe("Token is missing");
      expect(domain).toBe("Domain is missing");
    }

  });
  // html injection attack
  it("html injection attack", async () => {
    if (token && domain) {
      const response = await request(apiurl)
        .get(`injections?limit=5&type=html&page=1`)
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', 'https://securitytool-front.handsintechnology.in')

      expect(response.body.statusCode).toBe(200);

      expect(response.body).toHaveProperty("data");
      // Extract property names from the response data
      expect(response.body.data).toHaveProperty("totalPages");
      expect(response.body.data.totalPages).toEqual(expect.any(Number))

    } else {
      expect(token).toBe("Token is missing");
      expect(domain).toBe("Domain is missing");
    }

  });
  // iframe injection attack
  it("iframe injection attack", async () => {


    if (token && domain) {
      const response = await request(apiurl)
        .get(`injections?limit=5&type=iframe&page=1`)
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', 'https://securitytool-front.handsintechnology.in')

      expect(response.body.statusCode).toBe(200);

      expect(response.body).toHaveProperty("data");
      // Extract property names from the response data
      expect(response.body.data).toHaveProperty("totalPages");
      // check toatal pages length uis greater then zero
      expect(response.body.data.totalPages).toEqual(expect.any(Number))

    } else {
      expect(token).toBe("Token is missing");
      expect(domain).toBe("Domain is missing");
    }


  });


});
