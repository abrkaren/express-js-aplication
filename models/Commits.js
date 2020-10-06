const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commitsSchema = new Schema({
    gitHubRepository: {
        type: String
    },
    commits: {
        type: [
            {
                sha: String,
                node_id: String,
                commit: [
                    {
                        author: {
                            date: String,
                            email: String,
                            name: String
                        },
                        message: String
                    }
                ],
                url: String,
                html_url: String,
                comments_url: String
            }
        ]
    },
    count: {
        type: Number
    },
    created: {
        type: Date,
        default: new Date()
    },
    updated: {
        type: Date,
        default: new Date()
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('commits', commitsSchema)
