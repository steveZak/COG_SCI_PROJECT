const express = require('express');
var module = require('./api.js');
var cors = require('cors');

const app = express();
const router = express.Router();

router.put('/create', async function (req, res) {
    return module.create()
    .then(() => {
        return res.status(200).send();
    }).catch(function (err) {
        return res.status(550).json(err);
    });
});
router.get('/read', async function (req, res) {
    return module.read()
    .then((data) => {
        return res.status(200).send(data);
    }).catch(function (err) {
        return res.status(550).json(err);
    });
});
router.post('/addResponse', async function (req, res) {
    return module.addResponse(req.query.sessionID, req.query.groupID, req.query.q1, req.query.q2)
    .then(() => {
        return res.status(200).send()
    }).catch(function (err) {
        return res.status(550).json(err);
    });
});
// router.get('/getScores', async function (req, res) {
//     return module.getScores()
//     .then((data) => {
//         return res.status(200).send(data)
//     }).catch(function (err) {
//         return res.status(550).json(err);
//     });
// });
app.use(cors({origin: 'http://localhost:3000'}));
app.use('/', router);

const port = 5000;
app.listen(port, () => {console.log("Listening on port 5000.")});