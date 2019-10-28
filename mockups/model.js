let gameSchema = new mongoose.Schema({
    gameName: String,
    teams: [teamSchema],
    rounds: [roundQuestionSchema],
    quizMaster: String,
    password: String
});

let teamSchema = new mongoose.Schema({
    teamName: String,
    score: Number
})

let roundQuestionSchema = new mongoose.Schema({
    askedQuestion: [{
        _id: String, // Link naar questionSchema
        answers: [answerSchema],
        closed: Boolean
    }]
})

let answerSchema = new mongoose.Schema({
    answer: [{
        teamName: String,
        answer: String,
        correct: true
    }]
})

let questionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    category: String
})

let quizMasterSchema = new mongoose.Schema({
    name: String
})