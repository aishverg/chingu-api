'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProfileImage = sequelize.define('ProfileImage', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },

    storage_bucket: {
      type: DataTypes.STRING,
      allowNull: true
    },

    path: {
      type: DataTypes.STRING,
      allowNull: true
    },

    is_processed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  ProfileImage.associate = models => {
    ProfileImage.belongsTo(models.User);
  };

  return ProfileImage;
};