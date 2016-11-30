/// <reference types="pouchdb-core" />

declare namespace PouchDB {
    interface Database<Content extends PouchDB.Core.Encodable> {
      crypto(password: string): any;
  }
}

declare module 'crypto-pouch/nativeOnly' {
    const plugin: PouchDB.Plugin;
    export = plugin;
}
