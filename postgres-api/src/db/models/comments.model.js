const { Model, DataTypes, Sequelize } = require('sequelize');

const COMMENTS_TABLE = 'comments';

class Comments extends Model {
    static associate(models) {
        Comments.belongsTo(models.Users, {
            foreignKey: 'u_id',
            targetKey: 'id',
            as: 'users'
        });
        Comments.belongsTo(models.Events, {
            foreignKey: 'e_id',
            targetKey: 'id',
            as: 'events'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: COMMENTS_TABLE,
            modelName: 'Comments',
            timestamps: true
        };
    }
} 

const Comments_Schema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(50),
        field:'id'
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
    p_id: {
        allowNull: true,
        type: DataTypes.STRING(10),
        field: 'parent_id',
        references: {
          model: 'comments',
          key: 'id'
        }
    },
    content: {
        allowNull: false,
        type: DataTypes.STRING(5000),
        field: 'content'
    }
}

module.exports = { Comments, Comments_Schema };