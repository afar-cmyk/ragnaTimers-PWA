import Dexie from 'dexie';

export const db = new Dexie('localDB');
db.version(1).stores({
  userSelection: '++id, mvpName, mapName, selectedDate, timing',
});