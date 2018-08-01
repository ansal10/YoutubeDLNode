'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('VideoFormats', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			videoId: {
				type: Sequelize.STRING
			},
			formats:{
				type: Sequelize.TEXT
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		}).then(async () =>{
			await queryInterface.addIndex('VideoFormats', ['videoId'], {name: 'VideoFormats_videoId'});
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('VideoFormats').then(async () =>{
			await queryInterface.removeIndex('VideoFormats', 'VideoFormats_videoId');
		});
	}
};