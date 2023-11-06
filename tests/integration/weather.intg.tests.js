
const testServer = require('../../src/index');
const endpoint = 'http://localhost:3001/getweatherdata?lat=1&long=1&filter=%7B%22exclude%22%3A%20%22hourly%2Cdaily%2Cminutely%22%2C%20%22units%22%3A%20%22metric%22%20%7D';
const assert = require('assert');
const fetch = require('node-fetch');

describe('Integration Test', () => {
  let server;
  before(() => {
    // Starting test server for intg tests, in realtime need environment set to test..
    server = testServer.listen(3001, () => {
      console.log('started for testing');
    });
  });
  after(() => {
    server.close((err) => {
      console.log('server closed');
      process.exit(err ? 1 : 0);
    })
  });
  describe('Get weather data', () => {
    it('should get current weather info', (done) => {
      fetch(endpoint).then((thirdPartyRes) => thirdPartyRes.json()).then((jsonData) => {
        assert.deepStrictEqual(jsonData.success, true);
        assert.deepStrictEqual(jsonData.data.timeZone, 'Etc/GMT');
        done();
      });
    });
  });
});