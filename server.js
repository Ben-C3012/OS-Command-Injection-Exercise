const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;
const fs = require('fs');

// middleware to parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/createfolder', (req, res) => {
    // take folder name from query string
    const cmd = `mkdir ${req.query.foldername}`;
     
    console.log(`Executing command: ${cmd}`)
  
    if (!cmd) {
      return res.status(400).send('No command provided');
    }
  
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return res.status(500).send('Error executing command');
      }
  
      console.log(`Command output: ${stdout}`);
      res.send(stdout);
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
