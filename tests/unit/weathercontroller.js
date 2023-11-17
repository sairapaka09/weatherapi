const sinon = require('sinon');
const assert = require('assert');
const mocha = require('mocha');
const lib = require('../../src/controllers/weatherController');
const req = require('express/lib/request');
const path = require('path');
const moduleName = path.basename(__filename);
const nock = require('nock');
const httpCodes = require('http-codes');
const mockResData = require('./data');

let sandbox;
const url = 'https://api.openweathermap.org';
const validFilter = '/data/3.0/onecall?lat=33.0866&lon=-97.2958&exclude=hourly,daily,minutely&appid=${appId}&units=metric';
const invalidFilter = '/data/3.0/onecall?lat=1&lon=1&exclude=hourly,daily,minutely&appid=${appId}&units=metric';

describe(moduleName, () => {
    beforeEach((done) => {
        sandbox = sinon.createSandbox();
        done();
    });

    afterEach((done) => {
        sandbox.restore();
        done();
    });

    describe('Get current weather data', () => {
        let mockedReq;
        let mockedRes = mockResData.expectedResponse;
        beforeEach(() => {
            mockedReq = {
                query: {}
            };
            nock(url).
                get(validFilter)
                .reply(httpCodes.OK, mockResData.apiResponse);
            nock(url).
                get(invalidFilter)
                .reply(httpCodes.INTERNAL_SERVER_ERROR, {});

        });
        it('should return 200 and response data if valid request', async () => {
            const req = mockedReq;
            req.query = { lat: "33.0866", long: "-97.2958", filter: '{"exclude": "hourly,daily,minutely", "units": "metric" }' };
            const response = await lib.getCurrentWeather(req.query);
            assert.deepStrictEqual(response, mockedRes);
        });
        it('should return 400 if invalid request', async () => {
            const req = mockedReq;
            req.query = { lat: "33.0866", long: 'dummy', filter: '{"exclude": "hourly,daily,minutely", "units": "metric" }' };
            const response = await lib.getCurrentWeather(req.query);
            assert.deepStrictEqual(response.errors[0].message, 'Invalid longitude value');
        });
        it('should return 500 if random error occurs', async () => {
            const req = mockedReq;
            const response = await lib.getCurrentWeather(req);
            assert.deepStrictEqual(response.statusCode, httpCodes.INTERNAL_SERVER_ERROR);
        });
    });
});
