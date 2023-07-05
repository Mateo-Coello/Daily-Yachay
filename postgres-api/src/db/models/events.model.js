const { Model, DataTypes, Sequelize } = require('sequelize');

const EVENTS_TABLE = 'events';

class Events extends Model {
    static associate(models) {
        Events.belongsTo(models.Users, {
            foreignKey: 'u_id',
            targetKey: 'id',
            as: 'user'
        });
    }

    static config(sequelize) {
        return {
        sequelize,
            tableName: EVENTS_TABLE,
            modelName: 'Events',
            timestamps: true
        }
    }
} 

const Events_Schema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(20),
        field:'id'
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
    title: {
        allowNull: false,
        type: DataTypes.STRING(100),
        field:'title'
    },
    organizer: {
        allowNull: false,
        type: DataTypes.STRING(100),
        field:'organizer'
    },
    exhibitors:{ 
        allowNull: false,
        type: DataTypes.STRING(100),
        field: 'exhibitors'
    },
    date:{
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'date'
    },
    start_hour:{
        allowNull: false,
        type: DataTypes.TIME,
        field: 'start_hour'
    },
    end_hour:{
        allowNull: false,
        type: DataTypes.TIME,
        field: 'end_hour'
    },
    location:{
        allowNull: false,
        type: DataTypes.STRING(200),
        field: 'location'
    },
    category: {
        allowNull: false,
        type: DataTypes.ENUM('Congreso', 'Reunion Club', 'Taller', 'Feria'),
        field:'category'
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING(200),
        field: 'description'
    },
    open_event: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'open_event'
    },
    avail_places: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'avail_places'
    },
    recur_event:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'recur_event'
    }
}
  
module.exports = { Events, Events_Schema };

