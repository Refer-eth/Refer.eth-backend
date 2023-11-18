const production = {
  username: 'root',
  password: '1234',
  database: 'refer_eth',
  host: 'localhost',
  dialect: 'mysql',
  port: 3316,
  dialectOptions: {
    bigNumberStrings: true,
  },
  migrationStorageTableName: 'SequelizeMeta',
};

export {
  production,
};
