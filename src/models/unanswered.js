'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Unanswereds extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Unanswereds.init({
        question: DataTypes.TEXT('long')
    }, {
        sequelize,
        modelName: 'Unanswereds',
    });
    return Unanswereds;
};