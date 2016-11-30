'use strict';

var crypto = require('./crypto');

exports.transform = crypto.transform;
exports.crypto = crypto.crypto;

if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(module.exports);
}
