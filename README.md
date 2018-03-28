# repromise

Promise retry mechanism for JavaScript promises

```
// this module
var repromise = require('repromise');

...
repromise(function(){ //use defaults
  ...
})
...

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
.catch(function(err){
  //ran out of tries, last error raised
});
```
