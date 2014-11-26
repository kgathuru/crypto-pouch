crypto pouch [![Build Status](https://travis-ci.org/calvinmetcalf/crypto-pouch.svg)](https://travis-ci.org/calvinmetcalf/crypto-pouch)
===

Plugin to encrypt a PouchDB/CouchDB database.

```js
var db = new PouchDB('my_db');

db.crypto(password).then(function (publicKey) {
  // all done, you got a public key
});

db.removeCrypto(); // will no longer encrypt decrypt your data
```

It currently encrypts with the Chacha20-Poly1305 algorithm, but this may be changed 
to AES256-GCM when Node 0.12.0 drops.

Usage
-------

This plugin is hosted on npm. To use in Node.js:

```bash
npm install crypto-pouch
```

If you want to use it in the browser, download [the browserified version from wzrd.in](http://wzrd.in/bundle/crypto-pouch) and then include it after `pouchdb`:

```html
<script src="pouchdb.js"></script>
<script src="pouchdb.crypto-pouch.js"></script>
```

API
--------


### db.crypto(password [, diffieHellman])

Set up encryption on the database. Returns a promise.

If the second argument is a string, it is taken to be a Diffie-Hellman ModP group 
and the password is interpreted as a Diffie-Hellman public key. If so, the public key 
for use with the database is returned; you can use that to calculate the shared secret 
which is needed for subsequently opening the data set.


### db.removeCrypto()

Disables encryption on the database.

Details
-----

If you replicate to another database, it will decrypt before sending it to 
the external one. So make sure that one also has a password set as well if you want 
it encrypted too.

If you change the name of a document, it will throw an error when you try 
to decrypt it. If you manually move a document from one database to another, 
it will not decrypt correctly.  If you need to decrypt it a file manually 
you will find a local doc named `_local/crypto` in the database. This doc has a field 
named `salt` which is a hex-encoded buffer. Run on your password with that as salt 
for 1000 iterations to generate a 32 byte (256 bit) key; that is the key 
for decoding documents.

Each document has 3 relevant fields: `data`, `nonce`, and `tag`. 
`nonce` is the initialization vector to give to chacha20 in addition to the key 
you generated. Pass the document `_id` as additional authenticated data and the tag 
as the auth tag and then decrypt the data.  If it throws an error, then you either 
screwed up or somebody modified the data.



