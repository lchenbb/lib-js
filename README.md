# Light JavaScript library for Pryv.io

This JS library is meant to facilitate writing NodeJS and browser apps for a Pryv.io platform, it follows the [Pryv.io App Guidelines](https://api.pryv.com/guides/app-guidelines/).

## Dev

*Prerequisites*: Node 12+

- Install: `npm install`
- Build pryv.js library for browsers: `npm run build` result is published in `./dist`
- Build documentation: `npm run doc` result is published in `./dist/doc` 
- Node Tests: `npm run test`
- Coverage: `npm run cover`result is visible in `./coverage`
- Browser tests: **build**, then `npm run webserver` and open https://l.rec.la:4443/dist/browser-tests.html

## Usage

### Pryv.Connection

A connection is an authenticated link to a Pryv.io account.

### Initialization

1. Fetch [service information](https://api.pryv.com/reference/#service-info)
2. Initialize connection using credentials

```javascript
const pryv = require('pryv');

async () => {
  const pryvApiEndpoint = new pryv.ApiEndpoint('https://reg.pryv.me');
  await pryvApiEndpoint.loadServiceInfo();

  // do auth, obtain credentials

  const pryvAccount = pryvApiEndpoint.buildApiEndpoint({
    username: 'user-123',
    token: 'c1234'
  });

  const connection = new pryv.Connection(pryvAccount);
}()
```

### API call

```javascript
const apiCalls = [
  {
    "method": "events.create",
    "params": {
      "time": 1385046854.282,
      "streamId": "heart",
      "type": "frequency/bpm",
      "content": 90
    }
  },
  {
    "method": "events.create",
    "params": {
      "time": 1385046854.282,
      "streamId": "systolic",
      "type": "pressure/mmhg",
      "content": 120
    }
  }
]

try {
  const result = await conn.api(apiCalls)
} catch (e) {
  // handle error
}
```


### Auth

```javascript
Pryv.Auth.setup(settings);



```
