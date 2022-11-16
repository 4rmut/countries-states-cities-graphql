import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar JSON
  scalar JSONObject

  type Country {
    id: ID!
    name: String
    iso3: String
    iso2: String
    numeric_code: String
    phone_code: String
    capital: String
    currency: String
    currency_name: String
    currency_symbol: String
    tld: String
    native: String
    region: String
    subregion: String
    latitude: String
    longitude: String
    translations: JSONObject
  }
  type State {
    id: ID!
    name: String
    country: Country!
    country_id: ID!
    country_code: String
    state_code: String
    latitude: String
    longitude: String
  }
  type City {
    id: ID!
    name: String
    state: State!
    state_id: ID!
    state_code: String
    state_name: String
    country_code: String
    country_name: String
    latitude: String
    longitude: String
    wikiDataId: String
  }

  type Query {
    Country(id: ID!): Country
    State(id: ID!): State
    City(id: ID!): City

    Countries: [Country]
    States: [State]
    Cities: [City]

    StatesGetByCountryID(id: ID!): [State]
    CitiesGetByStateID(id: ID!): [City]
  }

  input inputCountry {
    name: String
    iso3: String
    iso2: String
    numeric_code: String
    phone_code: String
    capital: String
    currency: String
    currency_name: String
    currency_symbol: String
    tld: String
    native: String
    region: String
    subregion: String
    latitude: String
    longitude: String
    translations: JSONObject
  }
  input inputState {
    name: String
    country_id: ID!
    country_code: String
    state_code: String
    latitude: String
    longitude: String
  }
  input inputCity {
    name: String
    state_id: ID!
    state_code: String
    state_name: String
    country_code: String
    country_name: String
    latitude: String
    longitude: String
    wikiDataId: String
  }

  type Mutation {
    InsertCountry(data: inputCountry!): Country!
    InsertState(data: inputState!): State!
    InsertCity(data: inputCity!): City!

    UpdateCountry(data: inputCountry!, id: ID!): Country!
    UpdateState(data: inputState!, id: ID!): State!
    UpdateCity(data: inputCity!, id: ID!): City!

    DeleteCountry(id: ID!): Country!
    DeleteState(id: ID!): State!
    DeleteCity(id: ID!): City!
  }
`;
