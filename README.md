# repromise

Promise retry mechanism for JavaScript promises


```
// this module
var repromise = require('repromise');

// options, default values shown
var options = {
  tries: 3    // attempts to run
  ,timer: 100 // milliseconds before second run
  ,multiplier: 1.2  // factor to multiply timer by for each subsequent run
};

repromise(options, function(){
   return doSomething(); //return a promise
})
.then(function(value){
   //promise's resolved value
})
.catch(function(error){
  //ran out of tries, last error raised
});
```



## Requirements

Requires [i-promise](https://www.npmjs.com/package/i-promise) as a peerDependency, which requires native Promises, or a detected Promise library.

If you wish to force a promise library, you can do so before requiring this module.

```
require('i-promise/config').use(require('bluebird'));
```
