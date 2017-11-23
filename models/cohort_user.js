module.exports = (sequelize, DataTypes) => {
  const CohortUser = sequelize.define('CohortUser', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    cohort_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id',
      },
    },

    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: [
        'pending_approval',
        'rejected',
        'accepted',
        'tier_assigned',
        'team_assigned',
      ],
      defaultValue: 'pending_approval',
    },
    tier: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  CohortUser.prototype.isAccepted = () => {
    if (this.status === 'pending_approval' || this.status === 'rejected') {
      return false;
    }
    return true;
  };

  CohortUser.associate = (models) => {
    CohortUser.belongsTo(models.User);
    CohortUser.belongsTo(models.Cohort);
  };

  return CohortUser;
};
