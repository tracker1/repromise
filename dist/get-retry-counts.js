"use strict";

module.exports = getRetryCounts;

function getRetryCounts(options) {
  options = options || {};
  var ret = {};
  var tries = ~ ~options.tries;
  var timer = ~ ~options.timer;
  var multiplier = parseFloat(options.multiplier) || 0;

  if (tries < 1) tries = 3;
  if (timer < 1) timer = 100;
  if (multiplier < 1) multiplier = 1.2;
  if (multiplier >= 10) multiplier = 1.2;

  //only one try
  if (tries === 1) {
    return [];
  }tries--;
  var ret = [timer]; //first retry timeout
  while (--tries) ret.push(~ ~(timer *= multiplier));
  return ret;
}