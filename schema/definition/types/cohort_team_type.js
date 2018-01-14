let CohortTeamType;
let CohortChannelType;
let CohortType;
let ProjectType;
let TierType;
let CohortTeamCohortUserType;
let CohortUserType;
let CohortTeamStandupType;
let CohortTeamTierActType;

module.exports = () => [
  CohortTeamType,
  CohortChannelType,
  CohortType,
  ProjectType,
  TierType,
  CohortTeamCohortUserType,
  CohortUserType,
  CohortTeamStandupType,
  CohortTeamTierActType,
];

CohortType = require('./cohort_type');
CohortChannelType = require('./cohort_channel_type');
ProjectType = require('./project_type');
TierType = require('./tier_type');
CohortTeamCohortUserType = require('./cohort_team_cohort_user_type');
CohortUserType = require('./cohort_user_type');
CohortTeamStandupType = require('./cohort_team_standup_type');
CohortTeamTierActType = require('./cohort_team_tier_act_type');

CohortTeamType = `
  type CohortTeam {
    id: ID!
    title: String!
    cohort: Cohort!
    channel: CohortChannel!
    project: Project!
    tier: Tier!
    members: [CohortTeamCohortUser!]!
    cohort_users: [CohortUser!]!
    standups: [CohortTeamStandup!]!
    team_acts: [CohortTeamTierAct!]!
  }
`;
