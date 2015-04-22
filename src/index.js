var Promise = require('i-promise');
var getRetryCounts = require('./get-retry-counts');

module.exports = repromise;

function repromise(options, fn) {
  try {
    if (arguments.length < 1) return Promise.reject(new Error('No arguments specified'));
    if (arguments.length == 1) {
      fn = options;
      options = {};
    }
    if (typeof fn !== 'function') return Promise.reject(new Error('Function is required'));

    fn = wrap(fn);

    var retries = getRetryCounts(options); //array of setTimeout values for retries
    return fn().catch((err)=>new Promise((resolve,reject)=>retry(resolve,reject,retries,fn)(err)));
  } catch(err) {
    return Promise.reject(err);
  }
}


function retry(resolve, reject, retries, fn) {
  //return handle to wrapped function
  return onError;

  //wrapped function for error/retry handler
  function onError(err) {
    if (!retries.length) return reject(err);
    setTimeout(()=>fn().then(resolve, onError), retries.shift());
  }
}


function wrap(fn) {
  return function(){
    try {
      return Promise.resolve(fn());
    } catch(err) {
      return Promise.reject(err);
    }
  };
}