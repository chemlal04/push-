// staffLogic.js

import { getUserFromDb } from '../app/server/db';
import { getKeyFromDb } from '../app/server/db';

export async function getUser() {
  const res = await getUserFromDb();
  return res;
}

export async function getKey() {
  const res = await getKeyFromDb();
  return res;
}
export { getUserFromDb, getKeyFromDb };

