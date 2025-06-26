import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Character = sequelize.define('Character',{
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name:{type: DataTypes.STRING, allowNull:false, unique},
    ki:{type: DataTypes.INTEGER, allowNull:false},
    race:{type: DataTypes.STRING, allowNull:false},
    gender:{type: DataTypes.ENUM('male','female'), allowNull:false},
    description:{type: DataTypes.STRING}

});

export default Character;