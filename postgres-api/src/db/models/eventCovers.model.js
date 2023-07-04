const { Model, DataTypes, Sequelize } = require('sequelize');

const EVENT_COVERS_TABLE = 'event_covers';

class EventCovers extends Model {
    static associate(models) {
        Comments.belongsTo(models.Events, {
            foreignKey: 'e_id',
            targetKey: 'id',
            as: 'events'
        });
    }

    static config(sequelize) {
        return {
        sequelize,
            tableName: EVENT_COVERS_TABLE,
            modelName: 'EventCovers',
            timestamps: true
        }
    }
} 

const EventCovers_Schema = {
    cover_id:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(25),
        field: 'cover_id',
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
    cover_path: {
        allowNull: false,
        type: DataTypes.STRING(150),
        field: 'cover_path',
    },
}

module.exports = { EventCovers, EventCovers_Schema };