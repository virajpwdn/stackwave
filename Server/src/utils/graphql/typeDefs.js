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
    createdAt: String
  }

  type Query {
    getUserStats: UserStats
  }
  
  `;

module.exports = { typeDefs };
