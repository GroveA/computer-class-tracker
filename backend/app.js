const express = require('express');

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

const Computer = require('./models/computerInfo');

const Indicators = require('./models/computerIndicators');


const Group = require('./models/computerGroup');


mongoose
  .connect(
    "mongodb://localhost:27017/computer-tracker?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Database connection failed!");
  });


mongoose.set('useFindAndModify', false);

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
  var indicators = new Indicators();
  indicators.date = Date.parse(req.body.date);
  indicators.computer = new mongoose.Types.ObjectId(req.params.id);
  indicators.CPU.LoadTotal = req.body.update.CPU.LoadTotal;
  indicators.CPU.TempetureTotal = req.body.update.CPU.TempetureTotal;
  indicators.CPU.Load = req.body.update.CPU.Load;
  indicators.CPU.Tempeture = req.body.update.CPU.Tempeture;
  indicators.CPU.Cores = req.body.update.CPU.Cores;
  indicators.CPU.Cores = req.body.update.CPU.Cores;
  indicators.GPU.Tempeture = req.body.update.GPU.Tempeture;
  indicators.RAM.UsedMemory = req.body.update.RAM.UsedMemory;
  indicators.RAM.AvaliableMemory = req.body.update.RAM.AvaliableMemory;

  indicators.save().then(savedIndi => {
      Computer.findById(req.params.id).then(computer => {
        computer.lastUpdate = Date.parse(req.body.date);
        computer.tempeture = req.body.update.CPU.TempetureTotal;
        computer.cpuLoad = req.body.update.CPU.LoadTotal;
        computer.save().then(save => res.status(200).json({ message: 'Recieved update succesfully for id - ' + req.params.id }));
      }).catch(error => {
        res.status(400).end("Computer with your id not found :|");
      })
    }).catch( error => res.status(400).end("Computer with your id not found :|"));
  });








app.post('/api/computers/:id/offline', (req, res, next) => {

  Computer.findById(req.params.id).then(computer => {
    computer.online = false;
    computer.save().then(save => res.status(200).json({ message: 'Bye!'}));
  }).catch(error => {
    res.status(400).end("Computer with your id not found :|");
  })
});

app.post('/api/computers/:id/group', (req, res, next) => {
  console.log(req.body.groupId);
  Computer.findByIdAndUpdate(req.params.id, {$set: {group : req.body.groupId}})
  .then((doc) => {
    console.log(doc);
    res.status(200).json({message: "Succesfully updated group!"});
  })
  .catch((err)=> res.status(400).end(err));

});

app.get('/api/computers/:id', (req, res, next) => {
  Indicators.find({computer: new mongoose.Types.ObjectId(req.params.id)})
  .then(allIndi => res.status(200).json(allIndi))
  .catch(err => res.status(400).end(err));
});


app.get('/api/computers', (req, res, next) => {
  Computer.find({}).sort({lastUpdate: 1,  online: 1}).then(computers => {
    res.status(200).json(computers);
  }).catch(error => res.status(400).end("Error%@!##!!:("));

});

app.get('/api/groups', (req, res, next) => {
  Group.find({}).then(groups => {
    res.status(200).json({message: "All groups", groups: groups});
  }).catch(error => res.status(400).end(error));
});

app.post('/api/groups', (req, res, next) => {
  const group = new Group();
  group.name = req.body.name;
  group.save()
  .then((gr)=> res.status(200).json({ message: "Added new group!", id: gr._id}))
  .catch(err=> res.status(400).end(err));
})

app.listen(3000, () => {
  console.log("Server is lintening on port 3000")
})

module.exports = app;
