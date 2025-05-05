//TODO finnish this logic

//--------------------MAIN LOG-------------------

//Dump everything that is logged
function logDump(ip, agent, data, ...args){

}

//Meta log endpoint
app.get('/log/log', (req, res) => {
    res.json(loggedIps);
});

//-----------------------------------------------

//------------------IP LOGGING CODE------------------

//Log users ip adress that visits website
const express = require('express');
const app = express();

const loggedIps= [];

app.get('/get-ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    loggedIps.push({ip, time:new Date(Date.now()).toISOString()});
    res.json({ ip });
});

//Store ip adresses on an endpoint
app.get('/log/ip-adresses', (req, res) => {
    res.json(loggedIps);
});


//-----------------------------------------------

//------------------USER AGENT LOGGING-----------

const userAgent = require('express-useragent');


//-----------------------------------------------