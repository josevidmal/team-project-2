const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        type:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nick_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        mobile_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        tier: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        HUG_id:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [8],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
