const { Model, DataTypes, Sequelize } = require('sequelize');

const ENROLLEES_TABLE = 'enrollees';

class Enrollees extends Model {
    static associate(models) {
        Enrollees.belongsTo(models.Users, {
            foreignKey: 'u_id',
            targetKey: 'id',
            as: 'users'
        });
        Enrollees.belongsTo(models.Events, {
            foreignKey: 'e_id',
            targetKey: 'id',
            as: 'events'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ENROLLEES_TABLE,
            modelName: 'Enrollees',
            timestamps: true
        };
    }
} 

const Enrollees_Schema = {
    id : {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        field: 'id',
    },
    e_id: {
        allowNull: false,
        type: DataTypes.STRING(20),
        field: 'event_id',
        references: {
            model: 'events',
            key: 'id'
        }
    },
    u_id: {
        allowNull: false,
        type: DataTypes.STRING(20),
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
        }
    },
};

module.exports = { Enrollees, Enrollees_Schema };
