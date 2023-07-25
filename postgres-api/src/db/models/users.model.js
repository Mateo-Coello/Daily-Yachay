const { Model, DataTypes, Sequelize } = require('sequelize');

const USERS_TABLE = 'users';

class Users extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: USERS_TABLE,
            modelName: 'Users',
            timestamps: true
        }
    }
} 

const UsersSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(20),
        field:'id'
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(20),
        field:'name'
    },
    lname: {
        allowNull: false,
        type: DataTypes.STRING(20),
        field:'lname'
    },
    type: {
        allowNull: false,
        type: DataTypes.ENUM('estudiante', 'profesor', 'administrativo'),
        field:'type'
    },
    description:{ 
        allowNull:false,
        type: DataTypes.STRING(1000),
        field: 'description'
    },
    email:{
      allowNull:false,
      type: DataTypes.STRING(50),
      field: 'email'
    },
    bday:{
        allowNull:true,
        type: DataTypes.DATEONLY,
        field: 'bday'
    },    
    user_profile_pic:{
        allowNull:true,
        type: DataTypes.STRING(400),
        field: 'user_profile_pic'
    }

}
  
module.exports = { Users, UsersSchema };

