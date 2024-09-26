'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('trafficlaws', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            purpose: {
                type: Sequelize.TEXT('long')
            },
            answer_01: {
                type: Sequelize.TEXT('long')
            },
            answer_02: {
                type: Sequelize.TEXT('long')
            },
            answer_03: {
                type: Sequelize.TEXT('long')
            },
            image: {
                type: Sequelize.STRING
            },
            frequency: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('trafficlaws');
    }
};