module.exports = `
  scalar Date

  enum _UserStatus {
    pending_approval
    profile_incomplete
    profile_complete
  }

  enum _CohortStatus {
    registration_open
    registration_closed
    users_accepted
    tiers_assigned
    teams_assigned
    ongoing
    ended
  }

  enum _CohortTeamUserRole {
    project_manager
    member
  }

  enum _CohortUserStatus {
    pending_approval
    rejected
    accepted
    tier_assigned
    team_assigned
  }

  type Country {
    id: ID!
    name: String!
    users: [User!]!
    cities: [City!]!
    group: Group
  }

  type City {
    id: ID!
    name: String!
    group: Group
    country: Country!
    users: [User!]!
  }

  type Cohort {
    id: ID!
    title: String!
    status: _CohortStatus
    start_date: Date
    end_date: Date
    members: [CohortUser!]!
    users: [User!]!
    teams: [CohortTeam!]!
    projects: [Project!]!
    countries: [Country!]!
    group: Group!
    tiers: [Tier!]!
  }

  type CohortTier {
    id: ID!
    cohort_id: ID!
    tier_id: ID!
  }

  type Tier {
    id: ID!
    level: Int!
    title: String!
  }
  
  type CohortUser {
    id: ID!
    user: User!
    cohort: Cohort!
    status: _CohortUserStatus!
    tier: Int!
  }

  type CohortTeam {
    id: ID!
    title: String!
    tier: Int!
    cohort: Cohort!
    project: Project!
    members: [CohortTeamUser!]!
  }

  type CohortTeamUser {
    id: ID!
    role: _CohortTeamUserRole
    user: User!
    cohort: Cohort!
  }

  type Group {
    id: ID!
    title: String!
    type: String!
    users: [User!]!
  }

  type Project {
    id: ID!
    title: String!
    description: String
    project_url: String
    github_url: String
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    username: String
    first_name: String!
    last_name: String!
    status: _UserStatus!
    bio: String
    github_url: String!
    linkedin_url: String
    portfolio_url: String
    website_url: String
    twitter_url: String
    blog_url: String
    country: Country
    city: City
    profile_image: String
    projects: [Project!]!
    cohorts: [Cohort!]!
    cohort_teams: [CohortTeam!]!
    groups: [Group!]!
  }

  type Token {
    user: User!
    jwt: String!
  }

  type Query {
    user(username: String, user_id: ID): User
    group(group_id: ID!): Group
    city(city_id: ID!): City
    country(country_id: ID!): Country
    cohort(cohort_id: ID!): Cohort
    cohorts(limit: Int = 10, offset: Int = 0): [Cohort!]!
    projects(limit: Int = 10, offset: Int = 0): [Project!]!
  }

  input UserInput {
    first_name: String
    last_name: String
    github_url: String
    bio: String
    linkedin_url: String
    portfolio_url: String
    website_url: String
    twitter_url: String
    blog_url: String
    country_id: ID
    city_id: ID
  }

  input CohortInput {
    title: String,
    status: _CohortStatus,
    start_date: Date,
    end_date: Date
  }

  input CohortUserInput {
    status: _CohortUserStatus,
    tier: Int
  }

  type Mutation {
    createCountry(name: String!): Country!
    createCity(country_id: ID!, name: String!): City!
    updateUserStatus(user_id: ID!, status: _UserStatus!): User!
    createTier(level: Int!, title: String!): Tier!
    createCohort(title: String!, cohort_data: CohortInput): Cohort!
    updateCohort(cohort_id: ID!, cohort_data: CohortInput!): Cohort!
    addTierToCohort(cohort_id: ID!, tier_id: ID!): CohortTier!
    updateCohortUser(cohort_user_id: ID!, cohort_user_data: CohortUserInput!): CohortUser!
    createCohortTeam(cohort_id: ID!, tier: Int!): CohortTeam!
    addUserToCohortTeam(cohort_team_id: ID!, user_id: ID!, role: _CohortTeamUserRole): CohortTeamUser!

    createUser(user_data: UserInput!, email: String!, password: String!): Token!
    signInUser(email: String!, password: String!): Token!
    updateUser(user_data: UserInput!): User!
    joinCohort(cohort_id: ID!): CohortUser!
  }
`;
