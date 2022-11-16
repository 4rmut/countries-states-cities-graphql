import { CountriesDB, StatesDB, CitiesDB } from './models.js';
import * as uuid from 'uuid';

const Countries = () => {
  return CountriesDB.getObject('/');
};
const States = () => {
  return StatesDB.getObject('/');
};
const Cities = () => {
  return CitiesDB.getObject('/');
};

const Country = (p, args) => {
  return CountriesDB.find('/', ({ id }) => id === args.id);
};
const State = (p, args) => {
  return StatesDB.find('/', ({ id }) => id === args.id);
};
const City = (p, args) => {
  return CitiesDB.find('/', ({ id }) => id === args.id);
};

const StatesGetByCountryID = (p, args) => {
  return StatesDB.filter('/', ({ country_id }) => country_id === args.id);
};
const CitiesGetByStateID = (p, args) => {
  return CitiesDB.filter('/', ({ state_id }) => state_id === args.id);
};
const Query = {
  Countries,
  States,
  Cities,
  Country,
  State,
  City,
  StatesGetByCountryID,
  CitiesGetByStateID
};

const InsertCountry = (p, args) => {
  const country = { ...args.data, id: args.id || uuid.v4() };
  CountriesDB.push('@', [country], false);
  return Country(null, { id: country.id });
};
const InsertState = (p, args) => {
  const state = { ...args.data, id: args.id || uuid.v4() };
  StatesDB.push('@', [state], false);
  return State(null, { id: state.id });
};
const InsertCity = (p, args) => {
  const city = { ...args.data, id: args.id || uuid.v4() };
  CitiesDB.push('@', [city], false);
  return City(null, { id: city.id });
};

const DeleteCountry = (p, args) => {
  return CountriesDB.getIndex('/', args.id).then((r) => {
    const cloneData = CountriesDB.find('/', ({ id }) => id === args.id);
    CountriesDB.delete(`/array[${r}]`);
    return cloneData;
  });
};
const DeleteState = (p, args) => {
  return StatesDB.getIndex('/', args.id).then((i) => {
    const cloneData = StatesDB.find('/', ({ id }) => id === args.id);
    StatesDB.delete(`/array[${i}]`);
    return cloneData;
  });
};
const DeleteCity = (p, args) => {
  return CitiesDB.getIndex('/', args.id).then((i) => {
    const cloneData = CitiesDB.find('/', ({ id }) => id === args.id);
    CitiesDB.delete(`/array[${i}]`);
    return cloneData;
  });
};

const UpdateCountry = (p, args) => {
  DeleteCountry(null, { id: args.id });
  InsertCountry(null, args);
  return { ...args.data, id: args.id };
};
const UpdateState = (p, args) => {
  DeleteState(null, { id: args.id });
  InsertState(null, args);
  return { ...args.data, id: args.id };
};
const UpdateCity = (p, args) => {
  DeleteCity(null, { id: args.id });
  InsertCity(null, args);
  return { ...args.data, id: args.id };
};

const Mutation = {
  DeleteCountry,
  DeleteState,
  DeleteCity,
  InsertCountry,
  InsertState,
  InsertCity,
  UpdateCountry,
  UpdateState,
  UpdateCity
};

const CountryResolvers = {
  id: (p) => p.id,
  name: (p) => p.name,
  iso3: (p) => p.iso3,
  iso2: (p) => p.iso2,
  numeric_code: (p) => p.numeric_code,
  phone_code: (p) => p.phone_code,
  capital: (p) => p.capital,
  currency: (p) => p.currency,
  currency_name: (p) => p.currency_name,
  currency_symbol: (p) => p.currency_symbol,
  tld: (p) => p.tld,
  native: (p) => p.native,
  region: (p) => p.region,
  subregion: (p) => p.subregion,
  latitude: (p) => p.latitude,
  longitude: (p) => p.longitude,
  translations: (p) => p.translations
};
const CitiesResolvers = {
  id: (p) => p.id,
  name: (p) => p.name,
  state_id: (p) => p.state_id,
  state_code: (p) => p.state_code,
  state_name: (p) => p.state_name,
  country_code: (p) => p.country_code,
  country_name: (p) => p.country_name,
  latitude: (p) => p.latitude,
  longitude: (p) => p.longitude,
  wikiDataId: (p) => p.wikiDataId,
  state: (p) => {
    return StatesDB.find('/', ({ id }) => id === p.state_id);
  }
};
const StatesResolvers = {
  id: (p) => p.id,
  name: (p) => p.name,
  country_id: (p) => p.country_id,
  country_code: (p) => p.country_code,
  state_code: (p) => p.state_code,
  latitude: (p) => p.latitude,
  longitude: (p) => p.longitude,
  country: (p) => {
    return CountriesDB.find('/', ({ id }) => id === p.country_id);
  }
};

const Resolvers = {
  Country: CountryResolvers,
  City: CitiesResolvers,
  State: StatesResolvers
};

export default { Query, Mutation, ...Resolvers };
