import { Model, DataTypes } from 'sequelize';
import { UserAttributes } from './user.attributes';
import sequelize from '../infrastructure/database/connection';

export default class userDataAccess extends Model<UserAttributes> {
  public id!: number;

  public name!: string;

  public address!: string;

  public ensAddress!: string;

  public referLink!: string;

  public sign!: string;

  public referBy!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

userDataAccess.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
            unique: true,
        },
        ensAddress: {
            type: DataTypes.STRING,
        },
        referLink: {
            type: DataTypes.STRING,
        },
        sign: {
            type: DataTypes.STRING,
        },
        referBy: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
      sequelize,
      tableName: 'user',
      modelName: 'user',
    },
);