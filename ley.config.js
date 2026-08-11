import { config } from 'dotenv-safe';
import postgres from 'postgres';
import { postgresConfig } from './app/util/config.js';

config();

export default postgresConfig;
