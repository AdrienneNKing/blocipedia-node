const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:300/wikis/";

describe("routes : wikis", () => {

  describe("GET /wikis", () => {

    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      })
    })
  })
})
