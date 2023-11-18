import { Sequelize, Dialect } from 'sequelize';
import { production } from '../configs/database.config';

const sequelize = new Sequelize(
    production.database,
    production.username,
    production.password,
    {
        logging: false,
        dialect: production.dialect as Dialect,
        host: production.host,
        port: production.port,
    },
);

export default sequelize;
