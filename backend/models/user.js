const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false        
    }
}, {
    tableName: "users",
    timestamps: false
});

module.exports = User;