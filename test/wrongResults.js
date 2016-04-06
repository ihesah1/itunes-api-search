'use strict';
(function(){
let chai = require('chai');
let should = chai.should();
let sinon = require('sinon');
let mockery = require('mockery');

let sandbox = sinon.sandbox.create();
let itunesApiSearch;

let requestWrongData = function(url, callback){
  callback(
    null,
    {statusCode: 200},
    '<html><head><title>Error</title></head><body>Your request produced an error.  <BR>[newNullResponse]</body></html>');
}

describe('itunesApiSearch - with wrongResult', function() {

  before(function (){
    mockery.enable({
      warnOnReplace: false,
      useCleanCache: true
    });
  });

  beforeEach(function(){
    mockery.registerMock('request', requestWrongData);
    mockery.registerAllowable('../index.js');
    mockery.registerAllowable('string');
    itunesApiSearch = require('../index.js');
  });

  afterEach(function(){
    sandbox.verifyAndRestore();
    mockery.deregisterAll();
  });

  after(function(){
    mockery.disable();
  });

  it('should callback be called if the search is not empty', function(done) {

    itunesApiSearch.search('test', null, function(err, res) {
      should.not.exist(res);
      should.exist(err);
      should.exist(err.text);
      err.text.should.equal('Your request produced an error. [newNullResponse]');
      done();
    });
  });
});
})();
