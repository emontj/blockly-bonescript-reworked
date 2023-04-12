const express = require('express');
const app = express();
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

app.use("/blockly", express.static(path.join(__dirname, 'blockly')));
app.use(express.json());

app.get("/", (req, res) => {
    // res.sendFile(__dirname + '/blockly/static/tests/playground.html', function(err) {
    res.sendFile(__dirname + '/playground.html', function(err) {
        if (err) {
            console.error(err);
            res.status(err.status).end();
        }
    });
});

app.post('/run-code', (req, res) => {
    const code = req.body.code;
        fs.writeFile('code.js', code, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving code');
            return;
        }
        exec('node code.js', (err, stdout, stderr) => {
            if (err) {
            console.error(err);
            res.status(500).send('Error executing code');
            return;
            }
            console.log(stdout);
            res.send('Code executed successfully');
        });
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
