const express = require('express');

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

const Computer = require('./models/computerInfo');


mongoose
  .connect(
    "mongodb+srv://grove:a123u123a@cluster0-jj9ty.mongodb.net/computer-tracker?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Database connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.post('/api/computers', (req, res, next) => {
  Computer.updateOne({ macAddress: req.body.macAddress },
    {
        hostName: req.body.hostName,
        macAddress: req.body.macAddress,
        motherboard: req.body.motherboard,
        cpuName : req.body.cpuName,
        cpuCores: req.body.cpuCores,
        gpuName: req.body.gpuName,
        ram : Math.round(req.body.ram),
        online: true,
        lastUpdate: Date.now()
    }, { upsert: true }).then(result => {
        Computer.findOne({ macAddress: req.body.macAddress })
        .then(({ _id }) => {
          res.status(200).json({ message: 'Connection initialized succesfully', id: _id });
        });
    }).catch(err => {
      console.log(err);
      res.status(400).end("Error");
    })

});

app.post('/api/computers/:id', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ message: 'All good boro!' + req.params.id });
});

app.get('/api/computers', (req, res, next) => {
  console.log('GET COMP');
  res.status(200).end();
});


app.get('/api/computers/:id', (req, res, next) => {

});
module.exports = app;
