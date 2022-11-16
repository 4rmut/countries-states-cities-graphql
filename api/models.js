import { JsonDB, Config } from 'node-json-db';

export const CountriesDB = new JsonDB(new Config('../data/Countries', true, false, '/'));
export const StatesDB = new JsonDB(new Config('../data/States', true, false, '/'));
export const CitiesDB = new JsonDB(new Config('../data/Cities', true, false, '/'));
