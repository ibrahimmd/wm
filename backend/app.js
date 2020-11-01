const config = require('config');
const _ = require('lodash');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const db = require('./db');
const models = require('./models/models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {

    // website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // pass to next layer of middleware
    next();
});


app.get('/user/:user_id', async function (req, res) {
    var user_id = req.params.user_id;

    if(user_id == 1) {
        // we currently have 1 user with user_id = 1
        //var record = await models.user.findOne({ where: { user_id: user_id} })
        await models.user.findOne({ where: { user_id: user_id} })
        .then((record) => {
            console.log(record);
            res.status(200).json(record);
        })
        //console.log(record);
    }
    else {
        res.status(400).json({error: "unknown user_id"});
    }
});

app.post('/clock/in/:user_id', async function (req, res) {  
    var user_id = req.params.user_id;
    var clock_in = req.body.clock_in;

    if(user_id == 1) {
        // we currently have 1 user with user_id = 1

        var record = await models.attendance.findOne({ where: { user_id: user_id, clock_out: null } });
        if(record === null) {
            // no records with only clock_in found, so clock in user
            //var a = models.attendance.create({user_id: user_id, clock_in: clock_in});
            models.attendance.create({user_id: user_id, clock_in: clock_in})
            .then(async(a)=> {
                await sleep(2000);  // sleep for 2 seconds for frontend to show 'loading'
                console.log(a);
                res.status(200).json(a);            
            });
            // FIXME: we are not checking for error here - whether db create is successful
            // await sleep(2000);  // sleep for 2 seconds for frontend to show 'loading'
            // console.log(a);
            // res.status(200).json(a);            
        }
        else {
            // record found with null clock_out
            res.status(400).json({error: `user $user_id has clocked in but has not clocked out`});
        }        
    }
    else {
        res.status(400).json({error: "unknown user"});
    } 
});

app.post('/clock/out/:user_id', async function (req, res) {
    var user_id = req.params.user_id;
    var clock_out = req.body.clock_out;

    if(user_id==1) {
        // we currently have 1 user with user_id = 1

        var record = await models.attendance.findOne({ where: { user_id: user_id, clock_out: null }});
        //await models.attendance.findOne({ where: { user_id: user_id, clock_out: null } });
        console.log(record);
        if(record instanceof models.attendance) {
            // record found to clock out
            record.clock_out = clock_out;            
            record.save()
            .then (async(r)=> {
                // FIXME: we are not checking for error here - whether db save is successful           
                await sleep(2000);  // sleep for 2 seconds for frontend to show 'loading'
                res.status(200).json(r);
            });
        }
        else {
            // no record found for clock_out
            res.status(400).json({error: `user $user_id has no pending entry for clock out`});
        }

    }
    else {
        res.status(400).json({error: "unknown user"});
    }

});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}   



app.listen(8000);
