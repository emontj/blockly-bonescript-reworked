const express = require('express');
const app = express();
const fs = require('fs');
const exec = require('child_process').exec;
const path = require('path');

app.use("/blockly", express.static(path.join(__dirname, 'blockly')));
app.use(express.json());

app.get("/", function(req, res) {
    // res.sendFile(__dirname + '/blockly/static/tests/playground.html', function(err) {
    res.sendFile(__dirname + '/playground.html', function(err) {
        if (err) {
            console.error(err);
            res.status(err.status).end();
        }
    });
});

app.post('/run-code', function(req, res) {
    try {
        const code = req.body.code;
        fs.writeFile('code.js', code, function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving code');
            return;
        }
        exec('node code.js', function(err, stdout, stderr) {
            if (err) {
            console.error(err);
            res.status(500).send('Error executing code');
            return;
            }
            console.log(stdout);
            res.send('Code executed successfully');
        });
    });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Error handler
app.on('error', function(err) {
    console.error('Server error:', err);
});

app.listen(9000, function() {
    console.log('Server started on port 9000.');
});
