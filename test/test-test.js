import test from 'ava';
import app from '../app/server';
const jsdom = require('jsdom').jsdom;

var window;

test.serial.cb('PAGE REQUEST', t => {

  jsdom.env(
    "http://localhost:3000",
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
      console.log(window.test)
      console.log(window.$("h1").text());
      t.end();
    });

});

