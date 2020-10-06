const Commits = require('../models/Commits')

const errorHandler = require('../utils/errorHandler')

module.exports.postCommits = async (req, res) => {

    let data = await req.body;
    data.count = data.commits.length;

    const candidate = await Commits.findOne({count: data.count, gitHubRepository: data.gitHubRepository})

    if (candidate) {
        console.log('(do not save....)')
    } else {

        const candidateNoSuch = await Commits.findOne({gitHubRepository: data.gitHubRepository})
        const commits = await new Commits(data)

        console.log(candidateNoSuch)

        if(!candidateNoSuch){
            console.log('there is no such thing, create....')
            try {
                await commits.save();
                res.status(201).json(commits);
            } catch (e) {
                errorHandler(res, e);
            }
        }else{
            console.log('there is such, update....')
            Commits.findOneAndUpdate({gitHubRepository: data.gitHubRepository}, data, {new: true}, function (err, user) {
                if (err)
                    res.send(err);
                res.json(data);
            });
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
