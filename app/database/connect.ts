import { config } from 'dotenv-safe';
import postgres, { type Sql } from 'postgres';
import { postgresConfig } from '../util/config';

config();

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
