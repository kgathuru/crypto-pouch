'use strict';

var chachaHelper = require('./chacha');
var crypto = require('./crypto');

exports.transform = crypto.transform;
exports.crypto = crypto.crypto;
crypto.useChacha(chachaHelper);

if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(module.exports);
}
