'use strict';

var Promise = require('i-promise');
var getRetryCounts = require('./get-retry-counts');

module.exports = repromise;

function repromise(options, fn) {
  var _arguments = arguments;

  return new Promise(function (resolve, reject) {
    if (_arguments.length < 1) throw new Error('No arguments specified');
    if (_arguments.length == 1) {
      fn = options;
      options = {};
    }
    if (typeof fn !== 'function') throw new Error('Function is required');

    fn = wrap(fn);

    var retries = getRetryCounts(options); //array of setTimeout values for retries
    return fn()['catch'](function (err) {
      return retry(resolve, reject, retries, fn)(err);
    });
  });
}

function retry(resolve, reject, retries, fn) {
  return onError;
  function onError(err) {
    if (!retries.length) {
      return reject(err);
    }setTimeout(function () {
      return fn().then(resolve, onError);
    }, retries.shift());
  }
}

function wrap(fn) {
  return function () {
    try {
      return Promise.resolve(fn());
    } catch (err) {
      return Promise.reject(err);
    }
  };
}