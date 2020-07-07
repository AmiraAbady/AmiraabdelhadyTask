/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest'); 
const app = require('../app');
const conn = require('../db/index');


// describe('First test', () => {
//   it('Should assert true to be true', () => {
//     expect(true).to.be.true;
//   });
// });

 
///////////user signup

describe('POST /user/userSignup', () => {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('OK, creating a new user works', (done) => {
     request(app).post('/user/userSignup')
      .send({ email: 'amira@test.com', password: "AAA" })
      .then( () => { 
        expect(201) 
         done()
      }).catch((err) => done(err));
       
  });

  it('Fail,  requires valid email', (done) => {
    request(app).post('/user/userSignups')
      .send({ email: 'amira@test.com', password: "BBB" })
      .then( () => { 
        expect(500) 
        done();
      })
      .catch((err) => done(err));
  });
})

 

//////////user login

describe('Login API', function() {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })
  it('Should success if credential is valid', function(done) {
      request(app)
         .post('/user/userLogin')
         .set('Accept', 'application/json')
         .set('Content-Type', 'application/json')
         .send({ email: 'amira@test.com', password: 'AAA' })
         .expect(200)
         .expect('Content-Type', /json/)
         .expect(function(response) {
            expect(response.body).not.to.be.empty;
            expect(response.body).to.be.an('object');
         })
         .end(done);
  }); 
});


////////// get User Devices

describe('GET /device/getUserDevices', function() {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  })
  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('responds with not found', function(done) {
    request(app)
      .get('/user/getUserDevices')
      .set('Accept', 'application/json') 
      .expect(404, done);
  });
});

/////get by id

describe('GET /device/:id', function() {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  })
  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('responds with not found', function(done) {
    request(app)
      .get('/user/getUserDevices')
      .set('Accept', 'application/json') 
      .expect(404, done);
  });
});