export function up(queryInterface: any, Sequelize: any) {
    return queryInterface.createTable('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'user id',
        },
        name: {
            type: Sequelize.STRING,
            comment: 'user name',
        },
        address: {
            type: Sequelize.STRING,
            unique: true,
            comment: 'user wallet address',
        },
        ensAddress: {
            type: Sequelize.STRING,
            comment: 'user ens address',
            allowNull: true,
        },
        referLink: {
            type: Sequelize.STRING,
            unique: true,
            comment: 'user refer link',
        },
        sign: {
            type: Sequelize.STRING,
            comment: 'sign of user',
        },
        referBy: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id',
            },
            comment: 'the id of the user how refer this user',
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'timestamp of last updating record',
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'timestamp of last creating record',
        },
    });
}

export function down(queryInterface: any) {
    return queryInterface.dropTable('user');
}