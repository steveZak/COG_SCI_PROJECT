const express = require('express');
var module = require('./api.js');
var cors = require('cors');

const app = express();
const router = express.Router();


router.post('/addResponse', async function (req, res) {
    return module.addResponse(req.query.sessionID, req.query.groupID, req.query.q1, req.query.q1Timestamp, req.query.q2, req.query.q2Timestamp)
    .then(() => {
        return res.status(200).send()
    }).catch(function (err) {
        return res.status(550).json(err);
    });
});

// app.use(cors({origin: 'http://localhost:3000'}));
app.use('/', router);
app.use(express.static('build'));

const port = 8081;
app.listen(port, () => {console.log("Listening on port 8081.")});