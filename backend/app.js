const express = require('express');

const app = express();

app.use('/api/computers', (req, res, next) => {
  const computers = [
    {
      name: 'Computer #1',
      hostName:  'DESKTOP-NMEV3MP',
      online: true,
      macAddress: '01.AC.1B.5D',
      ipAddress: '192.168.0.1',
      motherboard: 'asus bh012',
      cpu: {
        name: 'intel core i5-4870HQ',
        loadTotal : 48.31,
        coresLoad: [13.03, 33.45],
        coresTempeture: [45, 66.4],
        tempeture: 54.3
      },
      ram: {
        memoryUsed: 6.4,
        memoryTotal: 7.9
      }
    },
    {
      name: 'Computer #2',
      hostName:  'Admin-PC',
      online: true,
      macAddress: '01.AC.1B.5D',
      ipAddress: '192.168.0.1',
      motherboard: 'msi bs123',
      cpu: {
        name: 'intel core i7-4700',
        loadTotal : 6.01,
        coresLoad: [13.03, 33.45],
        coresTempeture: [33, 66.4],
        tempeture: 33.02
      },
      ram: {
        memoryUsed: 6.4,
        memoryTotal: 7.9
      }
    }
  ];

  res.status(200).json(computers);
});

module.exports = app;
