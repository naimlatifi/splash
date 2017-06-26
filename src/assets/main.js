let helloWorld = () => {
  const msg = 'Say Window is';
  console.log(`${msg } loaded and hello from main.js`);
}
window.onload = helloWorld();
// browserify module
const print = require('./foo.js');

console.log(print);
