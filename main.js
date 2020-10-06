const app = require('./app')
const port = process.env.PORT || 5000
//const port = process.env.PORT || 80

var server = require("http").Server(app)

server.listen(port, () => console.log(`Server has been started on ${port}`))
