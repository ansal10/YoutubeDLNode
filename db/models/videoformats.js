'use strict';
module.exports = (sequelize, Sequelize) => {
  var VideoFormat = sequelize.define('VideoFormat', {
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

  }, {});
  VideoFormat.associate = function(models) {
    // associations can be defined here
  };
  return VideoFormat;
};