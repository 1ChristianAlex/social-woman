import { config } from 'dotenv';
const Mode = process.env.NODE_ENV || 'developer';

if (Mode === 'developer') {
  config({ path: 'src/config/.env' }); // Here we need to pass the .env relative path folder
}
if (Mode === 'production') {
  config({ path: 'src/config/.env-production' }); // Here we need to pass the .env relative path folder
}
const envolvriment = {
  DB_PORT: process.env.DB_PORT,
  FRONTPORT: process.env.FRONT_PORT,
  BACK_END_PORT: process.env.PORT || process.env.BACK_END_PORT,
  HOSTNAME: process.env.HOSTPROJECT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PW: process.env.DB_PW,
  DB_NAME: process.env.DB_NAME,
  SECRET: process.env.SECRET_TOKEN
};
export default envolvriment;
