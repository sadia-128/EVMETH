var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const res = require('express/lib/response');

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'scd98'
});

connection.connect();
console.log("Connect");

app.get('/generateexist', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM ref_code where usr_add = '${req.query.usr_add}'`, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/generate', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let record = {
        usr_add : req.body.usr_add,
        code : req.body.rcode,
        link : req.body.url,
    };
    let sql = "INSERT INTO ref_code SET ?";
    connection.query(sql, record, (err) => {
        if (err) throw err;
        // console.log(err);
        res.end();
    });
    res.end();
})

app.get('/displaycode', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM ref_code where usr_add = '${req.query.usr_add}'`, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

//mining users
app.post('/recieve', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let record = {
        usr_add : req.body.usr_add,
    };
    // console.log(record.usr_add);
    let sql = "INSERT INTO rcvmining SET ?";
    connection.query(sql, record, (err) => {
        if (err) throw err;
        // console.log(err);
        res.end();
    });
    res.end();
})

//check if mining user exist
app.get('/isrecieved', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM rcvmining where usr_add = '${req.query.usr_add}'`, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

//exchange
app.post('/exchange', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let record = {
        usr_add : req.body.usr_add,
        price : req.body.price,
        date : req.body.date,
        reward : 0,
        totalEth : req.body.price,
    };
    // console.log(record.usr_add);
    let sql = "INSERT INTO exchange SET ?";
    connection.query(sql, record, (err) => {
        if (err) throw err;
        // console.log(err);
        res.end();
    });
    res.end();
})

//display Exchange amount
app.get('/excrecord', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM exchange where usr_add = '${req.query.usr_add}'`, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/minusers', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM exchange`, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get("/getadmin", async function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    connection.query("SELECT * FROM admin", function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/changepass", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let sql = `update admin SET pass="${req.body.pass}" where id="1"`;
    connection.query(sql, (err) => {
        if (err) throw err;
        res.end();
    });
    res.end();
});

app.get('/getusers', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM ref_code`, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post("/updateReward", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let sql = `update exchange SET reward="${req.body.reward}", rewardDays="${req.body.rewardDays}" where id="${req.body.id}"`;
    connection.query(sql, (err) => {
        if (err) throw err;
        res.end();
    });
    res.end();
});

app.post("/updatetotalEth", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let sql = `update exchange SET totalEth="${req.body.totalEth}" where usr_add="${req.body.usr_add}"`;
    connection.query(sql, (err) => {
        if (err) throw err;
        res.end();
    });
    res.end();
});

app.get('/getwdReq', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM withdraw`, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/getwdRec', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM withdraw where walet=${req.query.user}`, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post("/wdAllow", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let sql = `update withdraw SET status="1" where walet="${req.body.walet}"`;
    connection.query(sql, (err) => {
        if (err) throw err;
        res.end();
    });
    res.end();
});

app.post('/wdReq', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let record = {
        walet : req.body.walet,
        amount : req.body.amount,
        status : 0
    };
    let sql = "INSERT INTO withdraw SET ?";
    connection.query(sql, record, (err) => {
        if (err) throw err;
        res.end();
    });
    res.end();
})

app.get('/getdayMinRec', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM dayminrec where walet = '${req.query.usr_add}'`, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/addMinRec', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let record = {
        walet : req.body.walet,
        date : req.body.date,
        reward : req.body.rew,
    };
    let sql = "INSERT INTO dayminrec SET ?";
    connection.query(sql, record, (err) => {
        if (err) throw err;
        res.end();
    });
    res.end();
})

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});

//mining page show mining data
// app.get('/minusers', async function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     connection.query(`SELECT * FROM exchange'`, function(err, result) {
//         if (err) throw err;
//         res.send(result);
//         console.log(result);
//     });
// })