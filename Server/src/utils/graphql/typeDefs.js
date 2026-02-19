const typeDefs = `
  type UserStats {
    questionCount: Int
    questions: [Question]
    answersCount: Int
    upvotesCount: Int
    downvotesCount: Int
    roomsCount: Int
  }

  type Question {
    id: ID!
    title: String
  }

  type Query {
    getUserStats(userId: ID!): UserStats
  }
  
  `;

module.exports = { typeDefs };
