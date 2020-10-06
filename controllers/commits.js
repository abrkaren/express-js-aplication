const Commits = require('../models/Commits')

const errorHandler = require('../utils/errorHandler')

module.exports.postCommits = async (req, res) => {

    let data = await req.body;
    data.count = data.commits.length;

    const candidate = await Commits.findOne({count: data.count, gitHubRepository: data.gitHubRepository})

    if (candidate) {
        // no new commits (do not save)
        // res.status(409).json({
        //     message: 'no new commits'
        // })
    } else {
        const commits = await new Commits(data)

        try {
            await commits.save();
            res.status(201).json(commits);
        } catch (e) {
            errorHandler(res, e);
        }
    }
    
}

module.exports.getAllRepositoryCommits = async function (req, res) {
    try {
        const repo = await Commits.find()
        res.status(200).json(repo)
    } catch (e) {
        errorHandler(res, e)
    }
}
