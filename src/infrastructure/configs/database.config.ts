const production = {
  username: 'root',
  password: '1234',
  database: 'refer_eth',
  host: '0.0.0.0',
  dialect: 'mysql',
  port: 3306,
  dialectOptions: {
    bigNumberStrings: true,
  },
  migrationStorageTableName: 'SequelizeMeta',
};

export {
  production,
};
