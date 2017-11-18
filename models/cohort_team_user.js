'use strict';
module.exports = (sequelize, DataTypes) => {
  var CohortTeamUser = sequelize.define('CohortTeamUser', {
    cohort_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_teams',
        key: 'id'
      }
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },

    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['project_manager', 'member']
    }
  });

  CohortTeamUser.associate = models => {
    CohortTeamUser.belongsTo(models.CohortTeam);
    CohortTeamUser.belongsTo(models.User);
  };

  return CohortTeamUser;
};