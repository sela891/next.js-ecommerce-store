import postgres, { type Sql } from 'postgres';
import { postgresConfig, setEnvironmentVariables } from '../util/config';

setEnvironmentVariables();

declare namespace globalThis {
  let postgresSqlClient: Sql;
}
// export const sql = postgres({
//  transform: {
//    ...postgres.camel,
//    undefinded: null,
//  },
// });

// Connect only once to the database
function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres(postgresConfig);
  }
  return globalThis.postgresSqlClient;
}

export const sql = connectOneTimeToDatabase();
