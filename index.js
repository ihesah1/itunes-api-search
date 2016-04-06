'use strict';
let querystring = require('querystring')
let request = require('request');
let S = require('string');

exports.search = search;

const baseUrl = "http://itunes.apple.com/search?";

function search(term, options, callback) {
  if (!term) {
    callback({ text: 'search term is required'})
    return;
  }

  options = options ? options : {};

  options.term = term;

  let url = baseUrl + querystring.stringify(options);

  request(url, function(err, header, res) {
    if (err) {
      callback(err);
      return;
    }

    try {
      var data = JSON.parse(res)
      callback(null, data);
    } catch (e) {
      callback({ text: S(S(res).stripTags().s).replaceAll('  ', ' ').s.substring(5) });
      return;
    }
  })
}
