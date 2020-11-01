const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Attendance = db.define('Attendance', {
    attendance_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },    
    user_id: {
        type: DataTypes.INTEGER,        
        allowNull: false        
    },
    clock_in: {
        type: DataTypes.DATE,
        allowNull: false        
    },
    clock_out: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: "attendance",
    timestamps: false
});

module.exports = Attendance;