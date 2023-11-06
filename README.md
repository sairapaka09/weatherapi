# weatherapi

![image](https://github.com/sairapaka09/weatherapi/assets/149530886/3149799b-ff50-43b5-9d9c-f9ab09ea7e1c)

![image](https://github.com/sairapaka09/weatherapi/assets/149530886/394ba943-8439-4ce9-98b2-91913a287ee1)

Test Data:
lat: 32.8998
long: -97.0403
filter: {"exclude": "hourly,daily,minutely", "units": "metric" }

npm start or launch from debugger -- http://localhost:3000/swagger

npm run test (Integration tests: /tests/integration/weather.intg.tests.js , unit tests: /tests/unit/weathercontroller.js)

Middleware validation : src/middleware/validation-middleware.js

Custom validation: src/validations/validator.js

Authentication: src/middleware/authentication.js (credential based jwt token to be sent in header as authorization, will be verified and allowed to call the api)
