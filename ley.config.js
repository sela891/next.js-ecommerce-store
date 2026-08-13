import { config } from 'dotenv-safe';
import { postgresConfig } from './app/util/config.js';

config();

export default postgresConfig;
