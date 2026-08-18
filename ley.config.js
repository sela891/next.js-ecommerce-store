import { setEnvironmentVariables } from 'dotenv-safe';
import { postgresConfig } from './app/util/config.js';

setEnvironmentVariables();

export default postgresConfig;
