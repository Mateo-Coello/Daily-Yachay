const { Model, DataTypes, Sequelize } = require('sequelize');

const COMMENTS_TABLE = 'comments';

class Comments extends Model {
    static associate(models) {
        Comments.belongsTo(models.Users, {
            foreignKey: 'u_id',
            targetKey: 'id',
            as: 'user'
        });
    }

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
            tableName: EVENTS_TABLE,
            modelName: 'Comments',
            timestamps: true
        }
    }
} 

const Comments_Schema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(10),
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
    parent_comment_id: {
        allowNull: true,
        type: DataTypes.STRING(30),
        field: 'parent_comment_id',
        references: {
          model: COMMENTS_TABLE,
          key: ['id']
        }
    },
    content: {
        allowNull: false,
        type: DataTypes.STRING(5000),
        field: 'content',
    }
}

module.exports = { Comments, Comments_Schema };