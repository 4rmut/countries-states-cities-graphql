import { JsonDB, Config } from 'node-json-db';
import path from 'path';
const dataDirectory = path.join(process.cwd(), 'data');

export const CountriesDB = new JsonDB(new Config(`${dataDirectory}/Countries`, true, false, '/'));
export const StatesDB = new JsonDB(new Config(`${dataDirectory}/States`, true, false, '/'));
export const CitiesDB = new JsonDB(new Config(`${dataDirectory}/Cities`, true, false, '/'));
