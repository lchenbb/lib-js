const should = chai.should();
const expect = chai.expect;


const testData = require('./test-data.js');

const conn = new Pryv.Connection(testData.pryvApiEndPoints[0]);

describe('Connection', () => {

  describe('.api()', () => {
    it('.api() events.get', async () => {
      const res = await conn.api(
        [
          {
            "method": "events.get",
            "params": {}
          }
        ]);
      res.length.should.equal(1);
    });

    it('.api() events.get split in chunks', async () => {
      conn.options.chunkSize = 2;
      const res = await conn.api(
        [
          { "method": "events.get", "params": {} },
          { "method": "events.get", "params": {} },
          { "method": "events.get", "params": {} }
        ]);
      res.length.should.equal(3);

    });

    it('.api() with callbacks', (done) => {
      conn.api(
        [
          { "method": "events.get", "params": {} }
        ]).then((res) => {
          res.length.should.equal(1);
          done();
        }, (err) => {
          should.not.exist(err);
          done();
        });

    });
  });

  describe('.get()', () => {
    it('/events', async () => {
      const res = await conn.get('events', { limit: 1 });
      res.events.length.should.equal(1);
    });

  });

  describe('time', () => {
    it('deltatime property', async () => {
      await conn.get('events', { limit: 1 });
      const deltaTime = conn.deltaTime;
      expect(Math.abs(deltaTime) < 2).to.be.true;
    });
  });

  describe('API', () => {
    it('endpoint property', async () => {
      const apiEndpoint = conn.apiEndpoint;
      expect(apiEndpoint.startsWith('https://' + conn.token + '@')).to.be.true;
    });
  });

  describe('Streamed event get', function () {
    this.timeout(5000);
    const now = (new Date()).getTime() / 1000;
    it('streaming ', async () => {
      const queryParams = { fromTime: 0, toTime: now, limit: 10000 };
      let eventsCount = 0;
      function forEachEvent(event) {
        eventsCount++; 
      }
      const res = await conn.streamedGetEvent(queryParams, forEachEvent);
      expect(eventsCount).to.equal(res.eventsCount);
    });

    it('no-events ', async () => {
      const queryParams = { fromTime: 0, toTime: now, tags: ['RANDOM-123'] };
      function forEachEvent(event) {}
      const res = await conn.streamedGetEvent(queryParams, forEachEvent);
      expect(0).to.equal(res.eventsCount);
    });
  })
});