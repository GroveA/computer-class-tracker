const express = require('express');

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const fs = require("fs-extra");

const app = express();

const fileUpload = require('express-fileupload');

const Computer = require('./models/computerInfo');

const Indicators = require('./models/computerIndicators');


const Group = require('./models/computerGroup');

const ScreenShotModel = require('./models/screenShot');


mongoose
  .connect(
    "mongodb://localhost:27017/computer-tracker?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    Indicators.countDocuments().then((c) => {
      if (c > 10000) Indicators.deleteMany({}).then(() => console.log("Clear data"))
    })
    ScreenShotModel.find({}).then((screens) => {
      screens.forEach(screen => {

        var path = './static/computers/' + screen.computer + '/' + screen.name + '.png';

        if (!screen.computer || !screen.date || !fs.existsSync(path)) {
          ScreenShotModel.deleteOne(screen).then(() => console.log("S"));
          fs.remove(path).then((s) => {}).catch(e=> console.log(e));
        }
      })
    })

    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Database connection failed!");
  });


mongoose.set('useFindAndModify', false);
app.use(express.static('static'));
app.use(
  fileUpload({
    createParentPath: true
  })
)

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

setInterval(() => {
  Computer.where('lastUpdate').lte(Date.now() - 1000).updateMany({$set: {online : false} })
  .then(() => {
    console.log("TASK: STATUS CHECK")
  })
  .catch(e => console.log(e));

}, 15000)

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

app.post('/api/computers/:id/screenshot', (req, res, next) => {
  
  if (req.files && req.files.screen) {

    var screenShot = req.files.screen;

    var jbody = JSON.parse(req.body['application/json']);

    var screenShotInst = new ScreenShotModel();

    screenShotInst.computer = new mongoose.Types.ObjectId(req.params.id);
    screenShotInst.date = Date.parse(jbody.date);
    screenShotInst.active = jbody.active;
    screenShotInst.proccess = jbody.proccess;
    screenShotInst.name = screenShot.name;

    fs.ensureDir('./static/computers/' + req.params.id).then(() => {

      screenShot.mv('./static/computers/' + req.params.id + '/' + screenShot.name + '.png', () => {});
      screenShotInst.save().then(save => {
        res.status(200).json({ message: 'Recieved screenshot succesfully for id - ' + req.params.id });
      })
    })

  } else {
    res.status(400).end("#$$@1312$%");
  }

})

app.get('/api/computers/:id/screenshot', (req, res, next) => {
  
  
  Computer.findById(req.params.id).then(computer => {
    ScreenShotModel.find({computer: new mongoose.Types.ObjectId(req.params.id)}).then(screens => {
      res.status(200).json(screens);
    }).catch(error => {
      res.status(400).end("Computer with your id not found :|");
    })

  }).catch(error => {
    res.status(400).end("Computer with your id not found :|");
  })

})
app.get('/api/computers/screenshot', (req, res, next) => {
  
  ScreenShotModel.find({}).then(screens => {
    res.status(200).json(screens);
  }).catch(error => {
    res.status(400).end("#@$!$");
  })


})

app.post('/api/computers/:id', (req, res, next) => {
  console.log("New indicators")
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

  const { FreeMemory: GMemFree, UsedMemory: GMemUsed } = req.body.update.GPU;
  indicators.GPU.Load = GMemUsed / (GMemFree + GMemUsed);

  indicators.RAM.UsedMemory = req.body.update.RAM.UsedMemory;
  indicators.RAM.AvaliableMemory = req.body.update.RAM.AvaliableMemory;

  indicators.HDD.Tempeture = req.body.update.HDD.Tempeture;
  indicators.HDD.UsedSpace = req.body.update.HDD.UsedSpace;

  indicators.save().then(savedIndi => {
      Computer.findById(req.params.id).then(computer => {
        computer.online = true;
        computer.lastUpdate = Date.parse(req.body.date);
        computer.tempeture = req.body.update.CPU.TempetureTotal;
        computer.cpuLoad = req.body.update.CPU.LoadTotal;
        computer.hddLoad = req.body.update.HDD.UsedSpace;


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
  Computer.findByIdAndUpdate(req.params.id, {$set: {group : req.body.groupId}})
  .then((doc) => {
    console.log(doc);
    res.status(200).json({message: "Succesfully updated group!"});
  })
  .catch((err)=> res.status(400).end(err));

});

app.post('/api/computers/:id/name', (req, res, next) => {
  Computer.findByIdAndUpdate(req.params.id, {$set: {name : req.body.name || "Computer"}})
  .then((doc) => {
    res.status(200).json({message: "Succesfully computer name!"});
  })
  .catch((err)=> res.status(400).end(err));
});

var max_indicators = 1000;

app.get('/api/computers/:id&:skip', (req, res, next) => {
  Indicators.find({computer: new mongoose.Types.ObjectId(req.params.id)}).sort({date: 1}).skip(req.params.skip)
  .then(allIndi => { res.status(200).json(allIndi)})
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

app.delete('/api/groups/:id', (req, res, next) => {
  console.log(req.params.id)
  Group.findByIdAndDelete(req.params.id).then( d => {
    res.status(200).json({ message: "Succesfully deleted group!", id: req.params.id})
  }).catch(error => res.status(400).end(error));
});

app.post('/api/groups', (req, res, next) => {
  const group = new Group();
  group.name = req.body.name;
  group.save()
  .then((gr)=> res.status(200).json({ message: "Added new group!", id: gr._id}))
  .catch(err=> res.status(400).end(err));
})


module.exports = app;
