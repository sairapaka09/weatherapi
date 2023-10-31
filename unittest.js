const sinon = require('sinon');
const assert = require('assert');
const mocha = require('mocha');
const lib = require('./weatherapi');
const req = require('express/lib/request');
const path = require('path');
const moduleName = path.basename(__filename);
const nock = require('nock');
const httpCodes = require('http-codes');
const mockResData = require('./data');

let sandbox;

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
        let mockedRes = mockResData;
        beforeEach(() => {
            mockedReq = {
                query: {}
            };
            nock('https://api.openweathermap.org').
                get('/data/3.0/onecall?lat=33.0866&lon=-97.2958&exclude=hourly,daily,minutely&appid=61782f5a135cbb22a767f4eec8442e9b&units=metric')
                .reply(httpCodes.OK, mockResData.response);
            nock('https://api.openweathermap.org').
                get('/data/3.0/onecall?lat=1&lon=1&exclude=hourly,daily,minutely&appid=61782f5a135cbb22a767f4eec8442e9b&units=metric')
                .reply(httpCodes.INTERNAL_SERVER_ERROR, {});

        });
        it('should return 200 and response data if valid request', async () => {
            const req = mockedReq;
            req.query = { lat: "33.0866", long: "-97.2958" };
            const res = {
                send: sinon.stub().returns(mockResData.response)
            };
            const response = await lib.getCurrentWeather(req, res);
            assert.deepStrictEqual(response, mockResData.response);
        });
        it('should return 400 if invalid request', async () => {
            const req = mockedReq;
            req.query = { lat: "33.0866", long: 'dummy' };
            const res = {
                send: sinon.stub().returns(httpCodes.BAD_REQUEST)
            };
            const response = await lib.getCurrentWeather(req, res);
            assert.deepStrictEqual(response, httpCodes.BAD_REQUEST);
        });
        it('should return 500 if random error occurs', async () => {
            const req = mockedReq;
            const res = {
                send: sinon.stub().returns(httpCodes.INTERNAL_SERVER_ERROR)
            };
            const response = await lib.getCurrentWeather(req, res);
            assert.deepStrictEqual(response, httpCodes.INTERNAL_SERVER_ERROR);
        });
    });
});