'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Trafficlaws extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Trafficlaws.init({
        purpose: DataTypes.TEXT('long'),
        answer_01: DataTypes.TEXT('long'),
        answer_02: DataTypes.TEXT('long'),
        answer_03: DataTypes.TEXT('long'),
        image: DataTypes.STRING,
        frequency: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Trafficlaws',
    });
    return Trafficlaws;
};